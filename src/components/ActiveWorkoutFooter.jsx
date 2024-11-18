import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkout } from '../context/WorkoutContext';
import WorkoutMusic from './WorkoutMusic';

export default function ActiveWorkoutFooter() {
  const { activeWorkout, elapsedTime, formatTime, completeWorkout } = useWorkout();
  const navigate = useNavigate();

  if (!activeWorkout) return null;

  const handleCompleteWorkout = () => {
    completeWorkout();
    navigate('/history');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-app-dark via-app-gray to-transparent backdrop-blur-lg border-t border-app-light/20 shadow-lg z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/workout"
              className="flex items-center gap-4 hover:bg-app-dark/50 transition-colors rounded-lg px-4 py-2"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-app-accent to-app-accent/20 flex items-center justify-center shadow-lg shadow-app-accent/20">
                <span className="text-app-text text-xl">▶</span>
              </div>
              <div>
                <h3 className="font-semibold text-app-text bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {activeWorkout.planName}
                </h3>
                <p className="text-sm text-app-text-secondary">
                  Exercise {activeWorkout.currentExerciseIndex + 1} of {activeWorkout.exercises.length}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <WorkoutMusic />
              
              <div className="flex items-center gap-2 px-4 py-2 bg-app-dark/50 rounded-xl border border-app-accent/20">
                <svg className="w-5 h-5 text-app-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div className="text-xl font-mono font-bold text-white">
                  {formatTime(elapsedTime)}
                </div>
              </div>
              
              <button
                onClick={handleCompleteWorkout}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/20 font-semibold flex items-center gap-2"
              >
                <span>✓</span>
                Complete
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
