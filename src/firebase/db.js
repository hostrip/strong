import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Training Plans
export async function saveTrainingPlan(userId, plan) {
  try {
    const plansRef = collection(db, 'users', userId, 'trainingPlans');
    const planData = {
      ...plan,
      userId,
      updatedAt: serverTimestamp()
    };
    
    if (plan.id) {
      const planDoc = doc(plansRef, plan.id);
      await setDoc(planDoc, planData, { merge: true });
      return plan.id;
    } else {
      const docRef = await addDoc(plansRef, {
        ...planData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error saving training plan:', error);
    throw error;
  }
}

export async function getTrainingPlans(userId) {
  try {
    const plansRef = collection(db, 'users', userId, 'trainingPlans');
    const snapshot = await getDocs(plansRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting training plans:', error);
    throw error;
  }
}

// Workout History
export async function saveWorkoutHistory(userId, workout) {
  try {
    const historyRef = collection(db, 'users', userId, 'workoutHistory');
    const workoutData = {
      ...workout,
      userId,
      timestamp: serverTimestamp(),
      createdAt: serverTimestamp()
    };
    const docRef = await addDoc(historyRef, workoutData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving workout history:', error);
    throw error;
  }
}

export async function getWorkoutHistory(userId) {
  try {
    const historyRef = collection(db, 'users', userId, 'workoutHistory');
    const snapshot = await getDocs(historyRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting workout history:', error);
    throw error;
  }
}

// Active Workout
export async function saveActiveWorkout(userId, workout) {
  console.log('saveActiveWorkout called with userId:', userId);
  console.log('workout data:', workout);

  if (!userId) {
    console.error('No userId provided to saveActiveWorkout');
    return null;
  }

  try {
    const workoutDoc = doc(db, 'users', userId, 'activeWorkout', 'current');
    
    if (!workout) {
      await deleteDoc(workoutDoc);
      console.log('Deleted active workout');
      return null;
    }

    const workoutData = {
      ...workout,
      userId,
      updatedAt: serverTimestamp()
    };

    console.log('Saving workout data:', workoutData);
    await setDoc(workoutDoc, workoutData);
    console.log('Successfully saved workout');
    
    const savedDoc = await getDoc(workoutDoc);
    return savedDoc.exists() ? { id: savedDoc.id, ...savedDoc.data() } : null;

  } catch (error) {
    console.error('Error saving active workout:', error);
    throw error;
  }
}

export async function getActiveWorkout(userId) {
  try {
    const docRef = doc(db, 'users', userId, 'activeWorkout', 'current');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      startTime: data.startTime?.toDate?.() || new Date(data.startTime) || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date()
    };
  } catch (error) {
    console.error('Error getting active workout:', error);
    throw error;
  }
}

// User Profile
export async function saveUserProfile(userId, profile) {
  try {
    const profileRef = doc(db, 'users', userId, 'profile', 'current');
    const profileData = {
      ...profile,
      userId,
      updatedAt: serverTimestamp()
    };
    await setDoc(profileRef, profileData, { merge: true });
    return profileRef.id;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}

export async function getUserProfile(userId) {
  try {
    const docRef = doc(db, 'users', userId, 'profile', 'current');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

// Data Migration
export async function migrateLocalStorageToFirestore(userId) {
  try {
    // Migrate training plans
    const localPlans = JSON.parse(localStorage.getItem('trainingPlans') || '[]');
    for (const plan of localPlans) {
      await saveTrainingPlan(userId, plan);
    }

    // Migrate workout history
    const localHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    for (const workout of localHistory) {
      await saveWorkoutHistory(userId, workout);
    }

    // Migrate active workout
    const localActiveWorkout = JSON.parse(localStorage.getItem('activeWorkout') || 'null');
    if (localActiveWorkout) {
      await saveActiveWorkout(userId, localActiveWorkout);
    }

    // Clear local storage after successful migration
    localStorage.removeItem('trainingPlans');
    localStorage.removeItem('workoutHistory');
    localStorage.removeItem('activeWorkout');

    return true;
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
}
