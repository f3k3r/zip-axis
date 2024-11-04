import React, { useState, useEffect } from 'react';
import styles from "./safar.module.css";


const TimerComponent = ({ time }) => {
    // Initialize timer state with the time passed via props (in seconds)
    const [currentTime, setCurrentTime] = useState(time);

    useEffect(() => {
        // Set up the interval to decrement the timer every second
        const intervalId = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(intervalId); // Stop the timer at 00:00
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Convert time in seconds to MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>{formatTime(currentTime)}</>
    );
};

export default TimerComponent;
