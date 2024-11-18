import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getActiveWorkout, saveActiveWorkout, saveWorkoutHistory } from '../firebase/db';
import { db } from '../firebase/config';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const { user } = useAuth();
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  // Load initial workout data
  useEffect(() => {
    async function loadWorkout() {
      if (!user) {
        setActiveWorkout(null);
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const workout = await getActiveWorkout(user.uid);
        console.log('Loaded workout:', workout);
        setActiveWorkout(workout);
      } catch (error) {
        console.error('Error loading workout:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [user]);

  // Timer effect
  useEffect(() => {
    if (!activeWorkout || !activeWorkout.startTime) {
      setElapsedTime(0);
      return;
    }

    const startTime = activeWorkout.startTime.toMillis ? 
      activeWorkout.startTime.toMillis() : 
      new Date(activeWorkout.startTime).getTime();
      
    setElapsedTime(Math.floor((Date.now() - startTime) / 1000));

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeWorkout]);

  // Music control
  useEffect(() => {
    const stopMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };

    if (activeWorkout && !audioRef.current) {
      audioRef.current = new Audio('/workout-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log('Music autoplay prevented:', e));
    }

    // Cleanup function to stop music when component unmounts or workout changes
    return () => {
      stopMusic();
    };
  }, [activeWorkout]);

  const startWorkout = async (plan) => {
    try {
      const workout = {
        planId: plan.id || 'quick-workout',
        planName: plan.name || 'Quick Workout',
        exercises: plan.exercises.map(exercise => ({
          ...exercise,
          sets: Array.isArray(exercise.sets) ? exercise.sets : Array(exercise.sets || 3).fill({ reps: exercise.reps || 10 })
        })),
        startTime: new Date().toISOString(),
        currentExerciseIndex: 0,
        completedSets: {},
        temporary: plan.temporary || false
      };

      console.log('Starting workout:', workout);
      setActiveWorkout(workout);
      
      // Only save active workout to Firebase if it's not temporary
      if (!plan.temporary && user) {
        await saveActiveWorkout(user.uid, workout);
      }

      return workout;
    } catch (error) {
      console.error('Error starting workout:', error);
      setError(error.message);
      throw error;
    }
  };

  const updateWorkout = async (data) => {
    if (!activeWorkout) return;

    try {
      setError(null);
      const updatedWorkout = {
        ...activeWorkout,
        ...data
      };
      
      // Only save to Firebase if it's not a temporary workout
      if (!activeWorkout.temporary && user) {
        await saveActiveWorkout(user.uid, updatedWorkout);
      }
      
      setActiveWorkout(updatedWorkout);
    } catch (error) {
      console.error('Error updating workout:', error);
      setError(error.message);
    }
  };

  const completeWorkout = async () => {
    if (!activeWorkout) return;

    try {
      const endTime = new Date().toISOString();
      const startTimeMs = new Date(activeWorkout.startTime).getTime();
      const endTimeMs = new Date(endTime).getTime();
      const durationSeconds = Math.floor((endTimeMs - startTimeMs) / 1000);
      
      // Save all completed workouts to history
      if (user) {
        const completedWorkout = {
          ...activeWorkout,
          endTime,
          duration: durationSeconds, // Duration in seconds
          completed: true,
          timestamp: new Date().toISOString()
        };

        // Save to history and clear active workout
        await Promise.all([
          saveWorkoutHistory(user.uid, completedWorkout),
          saveActiveWorkout(user.uid, null)  // This will delete the active workout document
        ]);
        
        console.log('Workout saved to history and active workout cleared');
      }

      // Stop the music
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      setActiveWorkout(null);
    } catch (error) {
      console.error('Error completing workout:', error);
      setError(error.message);
      throw error;
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <WorkoutContext.Provider
      value={{
        activeWorkout,
        elapsedTime,
        loading,
        error,
        startWorkout,
        updateWorkout,
        completeWorkout,
        formatTime
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
