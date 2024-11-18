import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { exercises } from '../data/exercises';
import { useWorkout } from '../context/WorkoutContext';
import { useAuth } from '../context/AuthContext';
import { getTrainingPlans, saveTrainingPlan } from '../firebase/db';
import Logo from './Logo';
import './TrainingPlans.css';

// Decorative SVG component
const DecorativeSVG = () => (
  <svg
    className="absolute right-0 top-0 h-24 w-24 text-app-accent opacity-5 transform rotate-12"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const EXERCISE_DATABASE = {
  chest: [
    { name: 'Bench Press', defaultWeight: 135 },
    { name: 'Push-Ups', defaultWeight: 0 },
    { name: 'Incline Bench Press', defaultWeight: 115 },
    { name: 'Dumbbell Flyes', defaultWeight: 30 },
    { name: 'Cable Crossovers', defaultWeight: 40 }
  ],
  back: [
    { name: 'Pull-Ups', defaultWeight: 0 },
    { name: 'Bent Over Rows', defaultWeight: 95 },
    { name: 'Deadlifts', defaultWeight: 185 },
    { name: 'Lat Pulldowns', defaultWeight: 120 },
    { name: 'T-Bar Rows', defaultWeight: 90 }
  ],
  legs: [
    { name: 'Squats', defaultWeight: 185 },
    { name: 'Leg Press', defaultWeight: 225 },
    { name: 'Romanian Deadlifts', defaultWeight: 135 },
    { name: 'Lunges', defaultWeight: 60 },
    { name: 'Calf Raises', defaultWeight: 150 }
  ],
  shoulders: [
    { name: 'Overhead Press', defaultWeight: 95 },
    { name: 'Lateral Raises', defaultWeight: 15 },
    { name: 'Front Raises', defaultWeight: 15 },
    { name: 'Face Pulls', defaultWeight: 40 },
    { name: 'Shrugs', defaultWeight: 135 }
  ],
  arms: [
    { name: 'Bicep Curls', defaultWeight: 60 },
    { name: 'Tricep Extensions', defaultWeight: 50 },
    { name: 'Hammer Curls', defaultWeight: 30 },
    { name: 'Skull Crushers', defaultWeight: 65 },
    { name: 'Preacher Curls', defaultWeight: 55 }
  ],
  core: [
    { name: 'Planks', defaultWeight: 0 },
    { name: 'Russian Twists', defaultWeight: 20 },
    { name: 'Crunches', defaultWeight: 0 },
    { name: 'Leg Raises', defaultWeight: 0 },
    { name: 'Wood Chops', defaultWeight: 30 }
  ]
};

const SAMPLE_PLANS = [
  {
    id: 1,
    name: "Full Body Workout",
    description: "A complete full body workout targeting all major muscle groups",
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { reps: 10, weight: 135 },
          { reps: 10, weight: 135 },
          { reps: 10, weight: 135 }
        ]
      },
      {
        name: "Squats",
        sets: [
          { reps: 10, weight: 185 },
          { reps: 10, weight: 185 },
          { reps: 10, weight: 185 }
        ]
      },
      {
        name: "Deadlifts",
        sets: [
          { reps: 8, weight: 225 },
          { reps: 8, weight: 225 },
          { reps: 8, weight: 225 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Upper Body Focus",
    description: "Intensive upper body training session",
    exercises: [
      {
        name: "Pull-ups",
        sets: [
          { reps: 8, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 8, weight: 0 }
        ]
      },
      {
        name: "Shoulder Press",
        sets: [
          { reps: 10, weight: 95 },
          { reps: 10, weight: 95 },
          { reps: 10, weight: 95 }
        ]
      }
    ]
  }
];

function generateWorkoutFromPrompt(prompt) {
  const promptLower = prompt.toLowerCase();
  let targetMuscles = [];
  let exerciseCount = 4; // Default number of exercises
  let intensity = 'moderate'; // Default intensity

  // Determine target muscles
  if (promptLower.includes('full body')) {
    targetMuscles = ['chest', 'back', 'legs', 'shoulders'];
  } else {
    if (promptLower.includes('chest')) targetMuscles.push('chest');
    if (promptLower.includes('back')) targetMuscles.push('back');
    if (promptLower.includes('leg')) targetMuscles.push('legs');
    if (promptLower.includes('shoulder')) targetMuscles.push('shoulders');
    if (promptLower.includes('arm')) targetMuscles.push('arms');
    if (promptLower.includes('core') || promptLower.includes('ab')) targetMuscles.push('core');
  }

  // If no specific muscles mentioned, make it a full body workout
  if (targetMuscles.length === 0) {
    targetMuscles = ['chest', 'back', 'legs', 'shoulders'];
  }

  // Determine workout intensity
  if (promptLower.includes('intense') || promptLower.includes('hard')) {
    intensity = 'high';
    exerciseCount = 6;
  } else if (promptLower.includes('light') || promptLower.includes('easy')) {
    intensity = 'low';
    exerciseCount = 3;
  }

  // Generate exercises
  let exercises = [];
  while (exercises.length < exerciseCount) {
    const muscleGroup = targetMuscles[Math.floor(Math.random() * targetMuscles.length)];
    const exercisePool = EXERCISE_DATABASE[muscleGroup];
    const exercise = exercisePool[Math.floor(Math.random() * exercisePool.length)];
    
    // Avoid duplicates
    if (!exercises.find(e => e.name === exercise.name)) {
      const sets = [];
      const numSets = intensity === 'high' ? 4 : intensity === 'low' ? 2 : 3;
      const reps = intensity === 'high' ? 8 : intensity === 'low' ? 12 : 10;
      
      for (let i = 0; i < numSets; i++) {
        sets.push({
          reps: reps,
          weight: exercise.defaultWeight
        });
      }
      
      exercises.push({
        name: exercise.name,
        sets: sets
      });
    }
  }

  return {
    id: Date.now(),
    name: `Quick ${targetMuscles.join('/')} Workout`,
    description: `Generated workout focusing on ${targetMuscles.join(', ')}`,
    exercises: exercises
  };
}

const ExerciseHistoryCard = ({ exercise }) => {
  const { workoutHistory = [] } = useWorkout();
  
  // Find last 3 workouts where this exercise was performed
  const exerciseHistory = (workoutHistory || [])
    .filter(workout => 
      workout?.exercises?.some(e => e?.name === exercise?.name)
    )
    .sort((a, b) => {
      const dateA = a?.timestamp?.toDate?.() || new Date(a?.timestamp || a?.date || 0);
      const dateB = b?.timestamp?.toDate?.() || new Date(b?.timestamp || b?.date || 0);
      return dateB - dateA;
    })
    .slice(0, 3)
    .map(workout => ({
      date: workout?.timestamp?.toDate?.()?.toLocaleDateString() || 
            new Date(workout?.timestamp || workout?.date || 0).toLocaleDateString(),
      sets: workout?.exercises?.find(e => e?.name === exercise?.name)?.sets || []
    }));

  if (!exerciseHistory?.length) return null;

  return (
    <div className="mt-3 p-3 bg-app-dark/50 rounded-lg border border-app-light/10">
      <h4 className="text-sm font-medium text-app-text-secondary mb-2">Last {exerciseHistory.length} workouts:</h4>
      <div className="space-y-2">
        {exerciseHistory.map((history, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{history.date}</span>
            <div className="flex gap-3">
              {history.sets.map((set, setIdx) => (
                <span key={setIdx} className="text-app-text">
                  {set?.weight || 0}kg × {set?.reps || 0}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TrainingPlans() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { startWorkout } = useWorkout();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickWorkoutInput, setQuickWorkoutInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const processNaturalLanguage = (input) => {
    // Common keywords for different types of workouts
    const workoutTypes = {
      'chest': ['chest', 'push', 'bench', 'pec'],
      'back': ['back', 'pull', 'lat', 'row'],
      'legs': ['leg', 'squat', 'quad', 'hamstring', 'glute', 'calf'],
      'shoulders': ['shoulder', 'delt', 'press', 'military', 'trap'],
      'arms': ['arm', 'bicep', 'tricep', 'curl', 'extension'],
      'core': ['core', 'ab', 'abs', 'plank', 'crunch'],
      'full body': ['full body', 'full', 'complete', 'total'],
      'upper body': ['upper body', 'upper'],
      'lower body': ['lower body', 'lower']
    };

    // Intensity keywords
    const intensityKeywords = {
      high: ['intense', 'hard', 'heavy', 'challenging', 'advanced', 'strong'],
      moderate: ['moderate', 'medium', 'regular', 'normal'],
      low: ['light', 'easy', 'beginner', 'gentle', 'quick']
    };

    // Exercise preferences
    const exercisePreferences = {
      compound: ['compound', 'multi-joint', 'complex'],
      isolation: ['isolation', 'single-joint', 'focused'],
      bodyweight: ['bodyweight', 'no equipment', 'home', 'basic'],
      machine: ['machine', 'equipment', 'gym']
    };

    const input_lower = input.toLowerCase();
    let targetMuscles = [];
    let intensity = 'moderate';
    let preferences = [];

    // Detect workout types from input
    Object.entries(workoutTypes).forEach(([type, keywords]) => {
      if (keywords.some(keyword => input_lower.includes(keyword))) {
        targetMuscles.push(type);
      }
    });

    // Detect intensity
    Object.entries(intensityKeywords).forEach(([level, keywords]) => {
      if (keywords.some(keyword => input_lower.includes(keyword))) {
        intensity = level;
      }
    });

    // Detect preferences
    Object.entries(exercisePreferences).forEach(([pref, keywords]) => {
      if (keywords.some(keyword => input_lower.includes(keyword))) {
        preferences.push(pref);
      }
    });

    // If no specific type is detected, assume full body
    if (targetMuscles.length === 0) {
      targetMuscles = ['full body'];
    }

    // Set number of exercises based on intensity and workout type
    let exerciseCount = intensity === 'high' ? 6 : intensity === 'low' ? 3 : 4;
    if (targetMuscles.includes('full body')) {
      exerciseCount = Math.max(exerciseCount, 5); // Ensure full body has enough exercises
    }

    // Filter exercises based on preferences and difficulty
    let availableExercises = exercises.filter(e => {
      // Match difficulty with intensity
      const difficultyMatch = 
        (intensity === 'high' && e.difficulty === 'Advanced') ||
        (intensity === 'moderate' && e.difficulty === 'Intermediate') ||
        (intensity === 'low' && e.difficulty === 'Beginner') ||
        !e.difficulty; // Include exercises without difficulty specified

      // Match exercise type preferences
      const preferenceMatch = preferences.length === 0 || preferences.some(pref => {
        if (pref === 'bodyweight') return !e.equipment || e.equipment === 'None';
        if (pref === 'machine') return e.equipment && e.equipment.includes('Machine');
        return true; // No specific preference match needed
      });

      return difficultyMatch && preferenceMatch;
    });

    // Generate workout based on detected types
    let selectedExercises = [];
    
    if (targetMuscles.includes('full body')) {
      // Create a balanced full body workout
      const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Core'];
      muscleGroups.forEach(group => {
        const groupExercises = availableExercises.filter(e => e.category === group);
        if (groupExercises.length > 0) {
          selectedExercises.push(groupExercises[Math.floor(Math.random() * groupExercises.length)]);
        }
      });
    } else if (targetMuscles.includes('upper body')) {
      // Create an upper body focused workout
      const upperGroups = ['Chest', 'Back', 'Shoulders', 'Arms'];
      upperGroups.forEach(group => {
        const groupExercises = availableExercises.filter(e => e.category === group);
        if (groupExercises.length > 0) {
          selectedExercises.push(groupExercises[Math.floor(Math.random() * groupExercises.length)]);
        }
      });
    } else if (targetMuscles.includes('lower body')) {
      // Create a lower body focused workout
      const lowerGroups = ['Legs', 'Core'];
      lowerGroups.forEach(group => {
        const groupExercises = availableExercises.filter(e => e.category === group);
        if (groupExercises.length > 0) {
          selectedExercises.push(...groupExercises.slice(0, 2));
        }
      });
    } else {
      // Create a workout based on detected muscle groups
      targetMuscles.forEach(muscle => {
        const categoryExercises = availableExercises.filter(e => 
          e.category.toLowerCase() === muscle.toLowerCase()
        );
        if (categoryExercises.length > 0) {
          // Add exercises based on intensity
          const numExercises = Math.ceil(exerciseCount / targetMuscles.length);
          const shuffled = categoryExercises.sort(() => 0.5 - Math.random());
          selectedExercises.push(...shuffled.slice(0, numExercises));
        }
      });
    }

    // Filter out any undefined exercises and ensure uniqueness
    selectedExercises = [...new Set(selectedExercises.filter(Boolean))];

    // Adjust sets and reps based on intensity
    const setsAndReps = {
      high: { sets: 4, reps: 8 },
      moderate: { sets: 3, reps: 12 },
      low: { sets: 2, reps: 15 }
    }[intensity];

    // Create the workout with appropriate sets and reps
    return selectedExercises.map(exercise => ({
      name: exercise.name,
      category: exercise.category,
      sets: setsAndReps.sets,
      reps: setsAndReps.reps
    }));
  };

  const handleQuickWorkout = async (e) => {
    if (e.key === 'Enter' && quickWorkoutInput.trim()) {
      setIsProcessing(true);
      try {
        // Process the natural language input
        const workoutExercises = processNaturalLanguage(quickWorkoutInput);

        if (workoutExercises.length > 0) {
          // Create a temporary workout
          const quickWorkout = {
            name: 'Quick Workout',
            exercises: workoutExercises,
            temporary: true
          };

          // Start the workout
          await startWorkout(quickWorkout);
          navigate('/workout');
        }
      } catch (error) {
        console.error('Error creating quick workout:', error);
      } finally {
        setIsProcessing(false);
        setQuickWorkoutInput('');
      }
    }
  };

  const handleStartWorkout = async (plan) => {
    try {
      setIsProcessing(true);
      console.log('Starting workout with plan:', plan);
      await startWorkout({
        ...plan,
        exercises: plan.exercises.map(exercise => ({
          ...exercise,
          sets: Array.isArray(exercise.sets) ? exercise.sets : Array(exercise.sets || 3).fill({ reps: exercise.reps || 10 })
        }))
      });
      navigate('/workout');
    } catch (error) {
      console.error('Error starting workout:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Load plans from Firestore
  useEffect(() => {
    async function loadPlans() {
      if (!user) return;
      
      try {
        setLoading(true);
        const userPlans = await getTrainingPlans(user.uid);
        setPlans(userPlans);
      } catch (error) {
        console.error('Error loading training plans:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Quick Workout Section */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Quick Workout</h2>
              <p className="text-gray-400">Tell me what kind of workout you want</p>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              value={quickWorkoutInput}
              onChange={(e) => setQuickWorkoutInput(e.target.value)}
              onKeyDown={handleQuickWorkout}
              placeholder="e.g. 'I want a chest and back workout' or 'Create a full body workout'"
              className="w-full bg-gray-900/50 text-gray-100 placeholder-gray-500 px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isProcessing}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
              ) : (
                'Press Enter ↵'
              )}
            </div>
          </div>
        </div>

        {/* Training Plans Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Training Plans</h1>
              <p className="text-gray-400">Select a plan to start your workout</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/plan/new')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
            >
              Create Plan
            </motion.button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-app-accent mx-auto"></div>
              <p className="text-app-text-secondary mt-4">Loading your plans...</p>
            </div>
          ) : plans.length === 0 ? (
            // Empty State
            <div className="text-center py-12 bg-app-gray rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-app-text-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h2 className="text-xl font-semibold text-white mb-2">No Training Plans Yet</h2>
              <p className="text-app-text-secondary mb-6">Create your first training plan to get started!</p>
              <button
                onClick={() => navigate('/plan/new')}
                className="btn-primary px-6 py-2 flex items-center gap-2 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Create New Plan
              </button>
            </div>
          ) : (
            // Plans Grid
            <div className="grid gap-6 md:grid-cols-2">
              {plans.map(plan => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-600/80 to-blue-900/80 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-400/20"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                    </svg>
                  </div>

                  {/* Card Content */}
                  <div className="relative p-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                      <div className="flex flex-wrap gap-2">
                        {plan.exercises?.slice(0, 3).map((exercise, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 rounded-full bg-white/10 text-white/80 text-sm"
                          >
                            {exercise.name}
                          </span>
                        ))}
                        {plan.exercises?.length > 3 && (
                          <span className="px-2 py-1 rounded-full bg-white/10 text-white/80 text-sm">
                            +{plan.exercises.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleStartWorkout(plan)}
                        disabled={isProcessing}
                        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all
                          bg-gradient-to-r from-app-accent to-blue-600 text-white
                          hover:from-app-accent/90 hover:to-blue-700
                          shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                          border border-white/10
                          flex items-center justify-center gap-2
                          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isProcessing ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        ) : (
                          <>
                            <span>Start Workout</span>
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                      
                      {/* Edit Button - Hidden by default, shown on hover */}
                      <button
                        onClick={() => navigate(`/plan/${plan.id}`)}
                        className="px-4 py-3 rounded-xl font-medium transition-all
                          bg-white/10 text-white/80 hover:bg-white/20
                          opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0
                          absolute right-6 border border-white/10"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full transform -translate-x-16 translate-y-16" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
