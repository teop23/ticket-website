import { useCallback, useEffect, useState } from 'react';
import { Winner } from '../api/types';
import { hero } from '../config/content';

// Launch timestamp (Unix timestamp in seconds)
const LAUNCH_TIMESTAMP = 1749488400;

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

  const calculateTimeLeft = useCallback(async () => {
    if (winners.length === 0) {
      // If no winners yet, calculate time remaining to one hour after launch
      const currentTime = new Date();
      const currentTimestamp = Math.floor(currentTime.getTime() / 1000); // Convert to Unix timestamp in seconds
      
      const firstDrawingTimestamp = await getFirstDrawingTimestamp();
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
      }
      return;
    }

    // Get the most recent distribution
    const lastDistribution = winners[0]; // Winners are already sorted by date_added desc
    
    // Convert UTC-2 time to local time for comparison
    const lastDistroTimeUTC = new Date(lastDistribution.date_added);
    // Add 2 hours to convert from UTC-2 to UTC, then to local time
    const lastDistroTime = new Date(lastDistroTimeUTC.getTime() + (2 * 60 * 60 * 1000));
    
    const currentTime = new Date();

    // Check if the last distribution should have triggered a new drawing by now
    const timeSinceLastDistro = currentTime.getTime() - lastDistroTime.getTime();
    // If more than 60 minutes have passed since the last distribution, we're processing
    const isProcessing = timeSinceLastDistro > (60 * 60 * 1000); // 60 minutes in milliseconds

    // Extract minutes from both times
    const lastDistroMinutes = lastDistroTime.getMinutes();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    // Calculate minutes remaining until next hour mark
    let minutesLeft = lastDistroMinutes - currentMinutes;
    if (minutesLeft <= 0) {
      minutesLeft = 60 + minutesLeft; // Add 60 to handle negative values
    }

    // Calculate seconds remaining
    let secondsLeft = 60 - currentSeconds;
    if (secondsLeft === 60) {
      secondsLeft = 0;
    } else {
      // If we have seconds left, we need to subtract 1 from minutes
      minutesLeft = minutesLeft - 1;
      if (minutesLeft < 0) {
        minutesLeft = 59;
      }
    }

    // Check if countdown has reached zero
    const isComplete = minutesLeft === 0 && secondsLeft === 0;
    
    // If countdown just completed, trigger the callback after 15 seconds
    if (isComplete && onCountdownComplete) {
      setTimeout(() => {
        onCountdownComplete();
      }, 15000); // 15 seconds delay
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
  }, [winners, onCountdownComplete]);

  useEffect(() => {
    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return timeLeft;
};