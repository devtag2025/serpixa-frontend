import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for managing AI content generation progress
 * Simulates progress from 0-90% while waiting for API response
 * @param {Object} options - Configuration options
 * @param {number} options.estimatedDuration - Estimated generation time in ms (default: 5500)
 * @param {number} options.updateInterval - Progress update interval in ms (default: 100)
 * @param {number} options.maxProgress - Maximum progress before completion (default: 90)
 * @param {Array<string>} options.statusMessages - Array of status messages to rotate through
 * @returns {Object} Progress state and control functions
 */
export function useContentGenerationProgress({
  estimatedDuration = 9000,
  updateInterval = 150,
  maxProgress = 90,
  statusMessages = [
    "Analyzing keyword...",
    "Generating SEO content...",
    "Optimizing meta tags...",
    "Structuring content...",
    "Finalizing...",
  ],
} = {}) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const progressIntervalRef = useRef(null);
  const stepIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentStep = statusMessages[currentStepIndex] || statusMessages[0];

  /**
   * Start progress simulation
   */
  const startProgress = () => {
    if (isActive) return; // Already running
    
    setIsActive(true);
    setProgress(0);
    setCurrentStepIndex(0);
    startTimeRef.current = Date.now();

    // Progress simulation: gradually increase to maxProgress
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const calculatedProgress = Math.min(
        maxProgress,
        (elapsed / estimatedDuration) * maxProgress
      );
      setProgress(Math.floor(calculatedProgress));
    }, updateInterval);

    // Rotate status messages every 3 seconds
    stepIntervalRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3000);
  };

  /**
   * Stop progress simulation and jump to 100%
   */
  const completeProgress = () => {
    setProgress(100);
    setCurrentStepIndex(statusMessages.length - 1); // Show "Finalizing..."
    
    // Clear intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    
    setIsActive(false);
  };

  /**
   * Stop progress simulation (without completing)
   */
  const stopProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    setIsActive(false);
  };

  /**
   * Reset progress to initial state
   */
  const resetProgress = () => {
    stopProgress();
    setProgress(0);
    setCurrentStepIndex(0);
    startTimeRef.current = null;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (stepIntervalRef.current) {
        clearInterval(stepIntervalRef.current);
      }
    };
  }, []);

  return {
    progress,
    currentStep,
    isActive,
    startProgress,
    stopProgress,
    completeProgress,
    resetProgress,
  };
}
