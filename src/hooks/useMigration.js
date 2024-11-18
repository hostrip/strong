import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { migrateLocalStorageToFirestore } from '../firebase/db';

export function useMigration() {
  const { user } = useAuth();
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationError, setMigrationError] = useState(null);
  const [migrationStatus, setMigrationStatus] = useState('');

  useEffect(() => {
    async function handleMigration() {
      if (!user) {
        setMigrationComplete(true);
        return;
      }

      try {
        // Check if migration has already been done
        const migrationKey = `migration_complete_${user.uid}`;
        const isMigrated = localStorage.getItem(migrationKey);
        
        if (isMigrated === 'true') {
          setMigrationComplete(true);
          return;
        }

        // Validate localStorage data
        let hasData = false;
        try {
          const trainingPlansStr = localStorage.getItem('trainingPlans');
          const workoutHistoryStr = localStorage.getItem('workoutHistory');
          const activeWorkoutStr = localStorage.getItem('activeWorkout');

          // Check if any valid data exists
          if (trainingPlansStr) {
            const plans = JSON.parse(trainingPlansStr);
            hasData = hasData || (Array.isArray(plans) && plans.length > 0);
          }
          
          if (workoutHistoryStr) {
            const history = JSON.parse(workoutHistoryStr);
            hasData = hasData || (Array.isArray(history) && history.length > 0);
          }
          
          if (activeWorkoutStr) {
            const workout = JSON.parse(activeWorkoutStr);
            hasData = hasData || (workout !== null && typeof workout === 'object');
          }
        } catch (e) {
          console.error('Error validating localStorage data:', e);
          // Continue with migration even if validation fails
          hasData = true;
        }

        if (!hasData) {
          // No valid data to migrate
          localStorage.setItem(migrationKey, 'true');
          setMigrationComplete(true);
          setMigrationStatus('No data to migrate');
          return;
        }

        setMigrationStatus('Starting data migration...');
        await migrateLocalStorageToFirestore(user.uid);
        
        // Mark migration as complete
        localStorage.setItem(migrationKey, 'true');
        setMigrationComplete(true);
        setMigrationStatus('Migration complete');

        // Clear localStorage data after successful migration
        localStorage.removeItem('trainingPlans');
        localStorage.removeItem('workoutHistory');
        localStorage.removeItem('activeWorkout');
      } catch (error) {
        console.error('Migration error:', error);
        setMigrationError(error);
        setMigrationStatus('Migration failed: ' + (error.message || 'Unknown error'));
      }
    }

    handleMigration();
  }, [user]);

  return { migrationComplete, migrationError, migrationStatus };
}
