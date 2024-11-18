import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import ExerciseLibrary from './components/ExerciseLibrary';
import TrainingPlans from './components/TrainingPlans';
import ViewPlan from './components/ViewPlan';
import WorkoutSession from './components/WorkoutSession';
import WorkoutHistory from './components/WorkoutHistory';
import { WorkoutProvider } from './context/WorkoutContext';
import ActiveWorkoutFooter from './components/ActiveWorkoutFooter';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { useMigration } from './hooks/useMigration';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-app-accent text-white'
          : 'text-app-text hover:bg-app-accent/10'
      }`}
    >
      {children}
    </Link>
  );
}

function Navigation() {
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-app-gray border-t border-app-light px-4 py-2 md:relative md:border-t-0 md:border-b">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <NavLink to="/plans">Training Plans</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/exercises">Library</NavLink>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md text-sm font-medium text-app-text hover:bg-app-accent/10"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <Router>
          <AppContent />
        </Router>
      </WorkoutProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const { migrationComplete, migrationError, migrationStatus } = useMigration();
  const location = useLocation();

  if (!user) {
    return <Login />;
  }

  if (!migrationComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-app-dark">
        <div className="text-app-text p-4 text-center">
          <div className="mb-4">
            {migrationError ? 
              'Error migrating data: ' + migrationError.message : 
              'Migrating your workout data...'}
          </div>
          <div className="text-sm text-app-text-secondary">
            {migrationStatus}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-dark">
      <Navigation />
      <main className="container mx-auto px-4 py-6 pb-24 md:py-8 md:pb-8">
        <Routes>
          <Route path="/" element={<Navigate to="/plans" />} />
          <Route path="/plans" element={<TrainingPlans />} />
          <Route path="/plan/new" element={<ViewPlan />} />
          <Route path="/plan/:id" element={<ViewPlan />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/history" element={<WorkoutHistory />} />
          <Route path="/workout" element={<WorkoutSession />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>
      <ActiveWorkoutFooter />
    </div>
  );
}

export default App;
