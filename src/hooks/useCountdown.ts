import { useEffect, useState, useRef } from 'react';
import { Winner } from '../api/types';
import { hero } from '../config/content';

// Launch timestamp (Unix timestamp in seconds)
const LAUNCH_TIMESTAMP = 1749488560;

interface CountdownTime {
  hours: string;
  minutes: string;
  seconds: string;
  isComplete: boolean;
  isProcessing: boolean;
}

async function getPoolCreationTimestamp() {
  const ca = hero.contractAddress;
  if (ca === "TO BE ANNOUNCED") {
    return null; // Not launched yet
  }
  try {
    const response = await fetch(`https://api.geckoterminal.com/api/v2/search/pools?query=${ca}&page=1`);
    const data = await response.json();
    //the pool creation time is at data.data[0].attributes.pool_created_at
    //time format "2025-06-03T14:40:01Z"
    if (data.data.length < 1) {
      return null; // No pools found
    }

    const pool_created_at = data.data[0].attributes.pool_created_at;
    if (!pool_created_at) {
      return null; // No creation time available
    }

    //convert to Unix timestamp in seconds
    const creationDate = new Date(pool_created_at);
    return Math.floor(creationDate.getTime() / 1000); // Convert to seconds
  } catch (error) {
    console.error('Error fetching pool creation time:', error);
  }
}

async function getFirstDrawingTimestamp() {
  const poolCreationTime = await getPoolCreationTimestamp();
  if (!poolCreationTime) {
    return LAUNCH_TIMESTAMP + 3600; // Default to launch time + 1 hour if no pool found
  }

  return poolCreationTime + 3600; // First drawing is 1 hour after pool creation
}

export const useCountdown = (winners: Winner[], onCountdownComplete?: () => void) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    hours: "00",
    minutes: "00",
    seconds: "00",
    isComplete: false,
    isProcessing: false
  });

  const onCountdownCompleteRef = useRef(onCountdownComplete);
  const firstDrawingTimestampRef = useRef<number | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredCallbackRef = useRef(false);

  // Update the ref when the callback changes
  useEffect(() => {
    onCountdownCompleteRef.current = onCountdownComplete;
  }, [onCountdownComplete]);

  // Get first drawing timestamp once
  useEffect(() => {
    if (winners.length === 0 && firstDrawingTimestampRef.current === null) {
      getFirstDrawingTimestamp().then(timestamp => {
        firstDrawingTimestampRef.current = timestamp;
      });
    }
  }, [winners.length]);

  // Cleanup polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (winners.length === 0) {
        // If no winners yet, calculate time remaining to one hour after launch
        const currentTime = new Date();
        const currentTimestamp = Math.floor(currentTime.getTime() / 1000); // Convert to Unix timestamp in seconds
        
        const firstDrawingTimestamp = firstDrawingTimestampRef.current;
        if (!firstDrawingTimestamp) {
          // Still loading first drawing timestamp
          setTimeLeft({
            hours: "00",
            minutes: "00",
            seconds: "00",
            isComplete: false,
            isProcessing: false
          });
          hasTriggeredCallbackRef.current = false;
          return;
        }
        
        const timeRemainingSeconds = firstDrawingTimestamp - currentTimestamp;
        
        if (timeRemainingSeconds <= 0) {
          // First drawing time has passed, show processing
          setTimeLeft({
            hours: "00",
            minutes: "00",
            seconds: "00",
            isComplete: true,
            isProcessing: true
          });
          
          // Start continuous polling if not already started
          if (!hasTriggeredCallbackRef.current && onCountdownCompleteRef.current) {
            hasTriggeredCallbackRef.current = true;
            
            // Clear any existing interval
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
            }
            
            // Start immediate callback and then every 15 seconds
            onCountdownCompleteRef.current();
            pollingIntervalRef.current = setInterval(() => {
              onCountdownCompleteRef.current?.();
            }, 15000);
          }
        } else {
          // Calculate hours, minutes, and seconds remaining
          const hoursLeft = Math.floor(timeRemainingSeconds / 3600);
          const minutesLeft = Math.floor((timeRemainingSeconds % 3600) / 60);
          const secondsLeft = timeRemainingSeconds % 60;
          
          const formatTime = (time: number) => time.toString().padStart(2, '0');
          
          setTimeLeft({
            hours: formatTime(hoursLeft),
            minutes: formatTime(minutesLeft),
            seconds: formatTime(secondsLeft),
            isComplete: false,
            isProcessing: false
          });
          hasTriggeredCallbackRef.current = false;
          
          // Clear polling interval if countdown is not complete
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        }
        return;
      }

      // Get the most recent distribution
      const lastDistribution = winners[0]; // Winners are already sorted by date_added desc
      
      const date_added = lastDistribution.date_added.replace(" ", "T") + "Z";
      const offsetLastDistroTime = new Date(date_added);
      const lastDistroTime = new Date(offsetLastDistroTime.getTime() + (3 * 60 * 60 * 1000));
      
      const currentTime = new Date();
      // Check if the last distribution should have triggered a new drawing by now
      const timeSinceLastDistro = currentTime.getTime() - lastDistroTime.getTime();
      // console.log("offset last distro time: ", offsetLastDistroTime.toISOString());
      // console.log("last distro utc: ", lastDistroTime.toISOString());
      // console.log("current time utc: ", currentTime.toISOString());
      // console.log("time since last distro (ms): ", timeSinceLastDistro);
      // If more than 60 minutes have passed since the last distribution, we're processing
      const isProcessing = timeSinceLastDistro > (60 * 60 * 1000); // 60 minutes in milliseconds
      const timeUntilNextDrawing = new Date(3600 * 1000 - timeSinceLastDistro);

      const minutesLeft = timeUntilNextDrawing.getMinutes();
      const secondsLeft = timeUntilNextDrawing.getSeconds();
      // console.log("time remaining:", minutesLeft, "m", secondsLeft, "s");
      // Check if countdown has reached zero
      const isComplete = minutesLeft === 0 && secondsLeft === 0;
      
      // If countdown just completed, start continuous polling
      if (isComplete && !hasTriggeredCallbackRef.current && onCountdownCompleteRef.current) {
        hasTriggeredCallbackRef.current = true;
        
        // Clear any existing interval
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
        
        // Start immediate callback and then every 15 seconds
        setTimeout(() => {
          onCountdownCompleteRef.current?.();
          pollingIntervalRef.current = setInterval(() => {
            onCountdownCompleteRef.current?.();
          }, 15000);
        }, 15000); // Initial 15 second delay, then continuous polling
      }
      
      // Reset callback trigger when countdown is not complete
      if (!isComplete && !isProcessing) {
        hasTriggeredCallbackRef.current = false;
        
        // Clear polling interval if countdown is not complete and not processing
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
      }

      // Format the time
      const formatTime = (time: number) => time.toString().padStart(2, '0');

      setTimeLeft({
        hours: "00", // Always 00 since we're counting down within the hour
        minutes: formatTime(minutesLeft),
        seconds: formatTime(secondsLeft),
        isComplete,
        isProcessing
      });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [winners]); // Only depend on winners array

  return timeLeft;
};