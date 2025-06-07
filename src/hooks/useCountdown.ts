import { useState, useEffect } from 'react';
import { Winner } from '../api/types';

interface CountdownTime {
  hours: string;
  minutes: string;
  seconds: string;
  isComplete: boolean;
}

export const useCountdown = (winners: Winner[], onCountdownComplete?: () => void) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    hours: "00",
    minutes: "00",
    seconds: "00",
    isComplete: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (winners.length === 0) {
        // If no winners yet, show a default countdown
        setTimeLeft({
          hours: "00",
          minutes: "59",
          seconds: "59",
          isComplete: false
        });
        return;
      }

      // Get the most recent distribution
      const lastDistribution = winners[0]; // Winners are already sorted by date_added desc
      const lastDistroTime = new Date(lastDistribution.date_added);
      const currentTime = new Date();

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
        isComplete
      });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [winners, onCountdownComplete]);

  return timeLeft;
};