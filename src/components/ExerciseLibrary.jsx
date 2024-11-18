import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exercises, categories, difficulties } from '../data/exercises';

// Decorative SVG component
const DecorativeSVG = () => (
  <svg
    className="absolute right-0 top-0 h-24 w-24 text-app-accent opacity-5 transform rotate-12"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM9 15H7v-2h2v2zm8.71-6.71l-5.42 5.42a1 1 0 0 1-1.41 0l-2.83-2.83a1 1 0 0 1 1.41-1.41l2.12 2.12 4.71-4.71a1 1 0 0 1 1.42 1.41z" />
  </svg>
);

export default function ExerciseLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || exercise.difficulty === selectedDifficulty;
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 grid-background min-h-screen">
      {/* Header */}
      <div className="mb-12 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Exercise Library
          </h1>
          <p className="text-app-text-secondary text-lg max-w-2xl mx-auto">
            Discover and learn new exercises for your workout routine. Each exercise comes with detailed instructions and animations.
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-app-accent opacity-5 blur-3xl rounded-full"></div>
      </div>

      {/* Filters */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search exercises..."
              className="input-field w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-app-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select
            className="input-field max-w-xs"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="input-field max-w-xs"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card group cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedExercise(exercise)}
            >
              <DecorativeSVG />
              <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-app-gray to-transparent opacity-50 z-10"></div>
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-app-accent transition-colors">
                {exercise.name}
              </h3>
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-app-accent bg-opacity-10 text-app-accent rounded-full text-sm font-medium">
                  {exercise.category}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-5 text-app-text-secondary rounded-full text-sm font-medium">
                  {exercise.difficulty}
                </span>
              </div>
              <p className="text-app-text-secondary text-sm">Equipment: {exercise.equipment}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Exercise Detail Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedExercise(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <DecorativeSVG />
              <div className="aspect-w-16 aspect-h-9 mb-6 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-app-gray to-transparent opacity-50 z-10"></div>
                <img
                  src={selectedExercise.gifUrl}
                  alt={selectedExercise.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gradient">{selectedExercise.name}</h2>
              <div className="flex gap-3 mb-6">
                <span className="px-3 py-1 bg-app-accent bg-opacity-10 text-app-accent rounded-full text-sm font-medium">
                  {selectedExercise.category}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-5 text-app-text-secondary rounded-full text-sm font-medium">
                  {selectedExercise.difficulty}
                </span>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gradient">Equipment</h3>
                  <p className="text-app-text-secondary">{selectedExercise.equipment}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gradient">Instructions</h3>
                  <ul className="text-app-text-secondary space-y-3">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 p-3 rounded-lg bg-white bg-opacity-5"
                      >
                        <span className="text-app-accent font-medium">{index + 1}.</span>
                        <span>{instruction}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-10 text-app-text-secondary hover:text-app-text hover:bg-opacity-20 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
