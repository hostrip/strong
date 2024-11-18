import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getTrainingPlans, saveTrainingPlan } from '../firebase/db';
import { EXERCISE_CATEGORIES, exercises } from '../data/exercises';

const ViewPlan = () => {
  const { planId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Name, 2: Exercises
  const [plan, setPlan] = useState({
    name: '',
    exercises: []
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [setsCount, setSetsCount] = useState(3);
  const [repsCount, setRepsCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (planId && planId !== 'new') {
      // Load existing plan
      const loadPlan = async () => {
        try {
          const existingPlan = await getTrainingPlans(user.uid, planId);
          if (existingPlan) {
            setPlan(existingPlan);
          }
        } catch (error) {
          console.error('Error loading plan:', error);
        }
      };
      loadPlan();
    }
  }, [planId, user]);

  const handleAddExercise = (exercise) => {
    setPlan(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          name: exercise.name,
          sets: Array(setsCount).fill({ reps: repsCount, weight: exercise.defaultWeight || 0 })
        }
      ]
    }));
    setSelectedExercise(null);
  };

  const handleRemoveExercise = (index) => {
    setPlan(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleSavePlan = async () => {
    if (!user || !plan.name || plan.exercises.length === 0) return;
    
    try {
      await saveTrainingPlan(user.uid, {
        ...plan,
        createdAt: new Date(),
      });
      navigate('/plans');
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  // Filter exercises based on search and category
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-app-accent' : 'bg-app-gray'}`} />
          <div className={`flex-1 h-2 rounded-full ml-2 ${step >= 2 ? 'bg-app-accent' : 'bg-app-gray'}`} />
        </div>

        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-blue-500/20"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <h2 className="text-3xl font-bold mb-8 text-white">
              {planId === 'new' ? 'Create New Plan' : 'Edit Plan'}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => setPlan(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Full Body Workout"
                  className="w-full bg-gray-800 text-gray-100 p-4 rounded-xl border border-gray-700
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all
                    placeholder:text-gray-600"
                />
              </div>

              <div className="pt-4">
                <motion.button
                  onClick={() => setStep(2)}
                  disabled={!plan.name.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all
                    ${plan.name.trim() 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 shadow-lg shadow-blue-500/20' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                >
                  Continue to Exercises
                </motion.button>

                <button
                  onClick={() => navigate('/plans')}
                  className="w-full mt-4 py-4 px-6 rounded-xl font-semibold 
                    text-gray-300 hover:text-white
                    bg-gray-800 hover:bg-gray-700
                    transition-all border border-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header with Plan Name */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">{plan.name}</h1>
                <p className="text-gray-400 text-sm mt-1">
                  {plan.exercises.length} exercises selected
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Edit Name
              </button>
            </div>

            {/* Selected Exercises */}
            {plan.exercises.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20">
                <h2 className="text-xl font-semibold text-white mb-4">Selected Exercises</h2>
                <div className="space-y-3">
                  {plan.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-4 rounded-xl flex items-center justify-between group hover:bg-gray-800/80 transition-colors"
                    >
                      <div>
                        <h3 className="text-white font-medium">{exercise.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {exercise.sets.length} sets × {exercise.sets[0].reps} reps
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveExercise(index)}
                        className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exercise Library */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Add Exercises</h2>
                <div className="flex gap-4">
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="All">All Categories</option>
                    {Object.keys(EXERCISE_CATEGORIES).map(category => (
                      <option key={category} value={category}>
                        {EXERCISE_CATEGORIES[category].name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 
                      focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {filteredExercises.map((exercise) => (
                  <div
                    key={exercise.name}
                    onClick={() => setSelectedExercise(exercise)}
                    className={`
                      p-4 rounded-xl cursor-pointer transition-all duration-300
                      ${selectedExercise?.name === exercise.name 
                        ? 'bg-blue-600/30 border-blue-500/50' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50'
                      }
                      border backdrop-blur-sm
                    `}
                  >
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{exercise.name}</span>
                      <span className="text-gray-400 text-sm">{exercise.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercise Configuration Modal */}
            {selectedExercise && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-900 p-6 rounded-2xl max-w-md w-full mx-4 border border-blue-500/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{selectedExercise.name}</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-gray-400 mb-2">Number of Sets</label>
                      <input
                        type="number"
                        value={setsCount}
                        onChange={(e) => setSetsCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg w-full border border-gray-700"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Reps per Set</label>
                      <input
                        type="number"
                        value={repsCount}
                        onChange={(e) => setRepsCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg w-full border border-gray-700"
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        handleAddExercise({
                          ...selectedExercise,
                          sets: Array(setsCount).fill({ reps: repsCount, weight: 0 })
                        });
                        setSelectedExercise(null);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Add Exercise
                    </button>
                    <button
                      onClick={() => setSelectedExercise(null)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSavePlan}
                disabled={plan.exercises.length === 0}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all
                  ${plan.exercises.length > 0 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              >
                Save Plan
              </button>
              <button
                onClick={() => navigate('/plans')}
                className="flex-1 py-4 px-6 rounded-xl font-semibold 
                  text-gray-300 hover:text-white
                  bg-gray-800 hover:bg-gray-700
                  transition-all border border-gray-700"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViewPlan;
