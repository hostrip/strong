import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getWorkoutHistory } from '../firebase/db';

// Decorative SVG component
const DecorativeSVG = () => (
  <svg
    className="absolute right-0 top-0 h-24 w-24 text-app-accent opacity-5 transform rotate-12"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  </svg>
);

export default function WorkoutHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!user) {
        setHistory([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const workoutHistory = await getWorkoutHistory(user.uid);
        // Sort by date, most recent first
        workoutHistory.sort((a, b) => {
          const dateA = a.timestamp?.toDate?.() || new Date(a.timestamp);
          const dateB = b.timestamp?.toDate?.() || new Date(b.timestamp);
          return dateB - dateA;
        });
        setHistory(workoutHistory);
      } catch (error) {
        console.error('Error loading workout history:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [user]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateStats = (workout) => {
    let totalSets = 0;
    let completedSets = 0;

    workout.exercises.forEach(exercise => {
      if (exercise.sets) {
        exercise.sets.forEach((_, setIndex) => {
          totalSets++;
          if (workout.completedSets?.[workout.exercises.indexOf(exercise)]?.[setIndex]) {
            completedSets++;
          }
        });
      }
    });

    return {
      totalSets,
      completedSets,
      completionRate: totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-app-text">Loading workout history...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen grid-background">
      {/* Header */}
      <div className="mb-12 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Workout History
          </h1>
          <p className="text-app-text-secondary text-lg max-w-2xl mx-auto">
            Track your progress and review past workouts to improve your training.
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-app-accent opacity-5 blur-3xl rounded-full"></div>
      </div>

      {/* History List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {history.map((workout, index) => {
            const stats = calculateStats(workout);
            return (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card group cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedWorkout(workout)}
              >
                <DecorativeSVG />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-app-accent transition-colors">
                    {workout.name || 'Workout Session'}
                  </h3>
                  <p className="text-app-text-secondary mb-4">
                    {formatDate(workout.timestamp)}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-app-gray bg-opacity-50 p-3 rounded-lg">
                      <p className="text-sm text-app-text-secondary">Duration</p>
                      <p className="text-lg font-semibold">{formatTime(workout.duration)}</p>
                    </div>
                    <div className="bg-app-gray bg-opacity-50 p-3 rounded-lg">
                      <p className="text-sm text-app-text-secondary">Completion</p>
                      <p className="text-lg font-semibold">{stats.completionRate}%</p>
                    </div>
                  </div>
                  <div className="text-sm text-app-text-secondary">
                    {workout.exercises.length} exercises • {stats.totalSets} sets
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Workout Detail Modal */}
      <AnimatePresence>
        {selectedWorkout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedWorkout(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-app-gray p-6 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">
                {selectedWorkout.name || 'Workout Session'}
              </h2>
              <p className="text-app-text-secondary mb-6">
                {formatDate(selectedWorkout.timestamp)}
              </p>
              <div className="space-y-6">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="bg-app-dark p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {exercise.sets.map((set, setIndex) => (
                        <div
                          key={setIndex}
                          className={`p-2 rounded ${
                            set.completed
                              ? 'bg-app-accent bg-opacity-20 text-app-accent'
                              : 'bg-app-gray bg-opacity-50'
                          }`}
                        >
                          Set {setIndex + 1}: {set.reps} × {set.weight}kg
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 w-full btn-primary"
                onClick={() => setSelectedWorkout(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
