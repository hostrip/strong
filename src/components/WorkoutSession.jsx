import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkout } from '../context/WorkoutContext';
import { motion, AnimatePresence } from 'framer-motion';
import { exercises } from '../data/exercises';

// Default exercise images by muscle group
const DEFAULT_IMAGES = {
  'Chest': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  'Back': 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80',
  'Legs': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80',
  'Shoulders': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
  'Arms': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
  'Core': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80'
};

export default function WorkoutSession() {
  const { planId } = useParams();
  const { 
    activeWorkout, 
    elapsedTime, 
    updateWorkout, 
    completeWorkout, 
    formatTime,
    loading,
    error 
  } = useWorkout();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-dark">
        <div className="text-app-text">Loading workout...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-dark">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!activeWorkout) {
    navigate('/plans');
    return null;
  }

  const currentExercise = activeWorkout.exercises[activeWorkout.currentExerciseIndex];
  const nextExercise = activeWorkout.exercises[activeWorkout.currentExerciseIndex + 1];
  
  const exerciseDetails = exercises.find(e => e.name === currentExercise.name) || {};
  
  // Get the appropriate image for the current exercise
  const exerciseImage = useMemo(() => {
    return exerciseDetails.gifUrl || DEFAULT_IMAGES[currentExercise.category] || DEFAULT_IMAGES.default;
  }, [exerciseDetails.gifUrl, currentExercise.category]);

  const handleSetComplete = async (setIndex, completed) => {
    const newCompletedSets = {
      ...activeWorkout.completedSets,
      [activeWorkout.currentExerciseIndex]: {
        ...(activeWorkout.completedSets[activeWorkout.currentExerciseIndex] || {}),
        [setIndex]: completed
      }
    };

    await updateWorkout({ completedSets: newCompletedSets });
  };

  const handleNextExercise = async () => {
    if (activeWorkout.currentExerciseIndex < activeWorkout.exercises.length - 1) {
      await updateWorkout({ currentExerciseIndex: activeWorkout.currentExerciseIndex + 1 });
    }
  };

  const handlePreviousExercise = async () => {
    if (activeWorkout.currentExerciseIndex > 0) {
      await updateWorkout({ currentExerciseIndex: activeWorkout.currentExerciseIndex - 1 });
    }
  };

  const handleCompleteWorkout = async () => {
    await completeWorkout();
    navigate('/plans');
  };

  const isSetCompleted = (setIndex) => {
    return activeWorkout.completedSets[activeWorkout.currentExerciseIndex]?.[setIndex] || false;
  };

  const areAllSetsCompleted = () => {
    const exerciseSets = activeWorkout.completedSets[activeWorkout.currentExerciseIndex] || {};
    return currentExercise.sets.every((_, index) => exerciseSets[index]);
  };

  return (
    <div className="min-h-screen bg-app-dark">
      {/* Timer Header */}
      <div className="bg-gradient-to-b from-app-gray to-transparent">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {activeWorkout.planName}
              </h1>
              <div className="text-app-text-secondary">
                Workout in progress
              </div>
            </div>
            <div className="text-3xl font-mono font-bold bg-gradient-to-r from-app-accent to-blue-500 bg-clip-text text-transparent">
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Exercise Card */}
            <div className="bg-gradient-to-br from-app-gray/80 to-app-gray/40 rounded-2xl overflow-hidden shadow-xl border border-app-light/10">
              {/* Exercise Image */}
              <div className="h-48 w-full bg-app-accent/10 relative overflow-hidden">
                <img 
                  src={exerciseImage}
                  alt={currentExercise.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = DEFAULT_IMAGES.default;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {currentExercise.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-app-accent/20 text-app-accent text-sm">
                      {currentExercise.category}
                    </span>
                    <span className="text-app-text-secondary">
                      Exercise {activeWorkout.currentExerciseIndex + 1} of {activeWorkout.exercises.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sets */}
              <div className="p-6 space-y-4">
                {currentExercise.sets.map((set, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative overflow-hidden rounded-xl transition-all ${
                      isSetCompleted(index)
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-app-accent/5 border border-app-accent/20 hover:bg-app-accent/10'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="relative p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSetCompleted(index)
                            ? 'bg-green-500 text-white'
                            : 'bg-app-accent text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {set.reps} reps
                          </div>
                          <div className="text-app-text-secondary text-sm">
                            {set.weight}kg
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSetComplete(index, !isSetCompleted(index))}
                        className={`
                          relative px-6 py-3 rounded-lg font-medium transition-all shadow-lg
                          overflow-hidden border
                          ${
                            isSetCompleted(index)
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 border-green-400/30'
                              : 'bg-gradient-to-r from-app-accent to-blue-600 text-white hover:from-app-accent/90 hover:to-blue-700 border-blue-400/30'
                          }
                          before:absolute before:inset-0 before:bg-white/20 before:translate-x-full before:hover:translate-x-0 
                          before:transition-transform before:duration-300
                          hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                          flex items-center gap-2
                        `}
                      >
                        {isSetCompleted(index) ? (
                          <>
                            <span>Completed</span>
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>Complete Set</span>
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Exercise Preview */}
            {nextExercise && (
              <div className="bg-gradient-to-br from-app-gray/40 to-transparent rounded-xl p-6 backdrop-blur-sm border border-app-light/10">
                <h3 className="text-app-text-secondary mb-2 uppercase text-sm tracking-wider">
                  Up Next:
                </h3>
                <div className="text-white text-lg font-semibold">
                  {nextExercise.name}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 gap-4">
          <button
            onClick={handlePreviousExercise}
            disabled={activeWorkout.currentExerciseIndex === 0}
            className="flex-1 px-6 py-4 rounded-xl bg-app-gray/50 text-app-text font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-app-gray/70 transition-all disabled:hover:bg-app-gray/50"
          >
            Previous Exercise
          </button>
          
          {areAllSetsCompleted() && (
            <button
              onClick={activeWorkout.currentExerciseIndex === activeWorkout.exercises.length - 1 
                ? handleCompleteWorkout 
                : handleNextExercise}
              className="flex-1 px-6 py-4 rounded-xl font-medium transition-all bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
            >
              {activeWorkout.currentExerciseIndex === activeWorkout.exercises.length - 1 
                ? 'Complete Workout'
                : 'Next Exercise'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
