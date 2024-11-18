import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, saveUserProfile } from '../firebase/db';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    weight: '',
    height: '',
    fitnessGoal: ''
  });

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const userProfile = await getUserProfile(user.uid);
      if (userProfile) {
        setProfile(userProfile);
        setEditForm({
          displayName: userProfile.displayName || user.displayName || '',
          weight: userProfile.weight || '',
          height: userProfile.height || '',
          fitnessGoal: userProfile.fitnessGoal || ''
        });
      } else {
        // Initialize with Google profile data
        setProfile({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
        setEditForm({
          displayName: user.displayName || '',
          weight: '',
          height: '',
          fitnessGoal: ''
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveUserProfile(user.uid, {
        ...profile,
        ...editForm
      });
      setProfile(prev => ({ ...prev, ...editForm }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img 
          src={profile.photoURL} 
          alt={profile.displayName} 
          className={styles.profileImage}
        />
        <h2>{profile.displayName}</h2>
        <p>{profile.email}</p>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label>Display Name</label>
            <input
              type="text"
              value={editForm.displayName}
              onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Weight (kg)</label>
            <input
              type="number"
              value={editForm.weight}
              onChange={(e) => setEditForm(prev => ({ ...prev, weight: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Height (cm)</label>
            <input
              type="number"
              value={editForm.height}
              onChange={(e) => setEditForm(prev => ({ ...prev, height: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Fitness Goal</label>
            <textarea
              value={editForm.fitnessGoal}
              onChange={(e) => setEditForm(prev => ({ ...prev, fitnessGoal: e.target.value }))}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          {profile.weight && (
            <div className={styles.infoItem}>
              <span>Weight:</span> {profile.weight} kg
            </div>
          )}
          {profile.height && (
            <div className={styles.infoItem}>
              <span>Height:</span> {profile.height} cm
            </div>
          )}
          {profile.fitnessGoal && (
            <div className={styles.infoItem}>
              <span>Fitness Goal:</span>
              <p>{profile.fitnessGoal}</p>
            </div>
          )}
          <div className={styles.buttonGroup}>
            <button 
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
