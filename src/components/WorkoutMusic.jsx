import { useState, useEffect, useRef } from 'react';
import { useWorkout } from '../context/WorkoutContext';

// Free workout music tracks from pixabay
const MUSIC_URLS = [
  'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3b7803bd5.mp3?filename=powerful-beat-121791.mp3',
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sport-rock-trailer-122341.mp3',
  'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=sport-fashion-house-131283.mp3',
  'https://cdn.pixabay.com/download/audio/2022/10/25/audio_127d4dfd59.mp3?filename=powerful-energetic-sport-rock-trailer-137126.mp3',
  'https://cdn.pixabay.com/download/audio/2023/06/19/audio_7cab32ba1c.mp3?filename=sport-hip-hop-138202.mp3'
];

export default function WorkoutMusic() {
  const { activeWorkout } = useWorkout();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Cleanup function to stop music
  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Initialize or reset audio when component mounts or workout changes
  useEffect(() => {
    // If there's no active workout, stop the music
    if (!activeWorkout) {
      stopMusic();
      return;
    }

    const initializeAudio = () => {
      const randomIndex = Math.floor(Math.random() * MUSIC_URLS.length);
      setCurrentTrack(randomIndex);

      // Always create a new Audio instance when workout changes
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(MUSIC_URLS[randomIndex]);
      audio.loop = false;
      audio.volume = volume;
      audioRef.current = audio;

      // Try to autoplay
      if (activeWorkout) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // If autoplay fails, try one more time
              setTimeout(() => {
                audio.play()
                  .then(() => setIsPlaying(true))
                  .catch(() => console.log('Autoplay prevented. Click play to start music.'));
              }, 1000);
            });
        }
      }
    };

    initializeAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
      }
    };
  }, [activeWorkout]); // Reinitialize when workout changes

  // Handle track changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = MUSIC_URLS[currentTrack];
    
    if (activeWorkout) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrack]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track ended
  useEffect(() => {
    const handleEnded = () => {
      nextTrack();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentTrack]); // Re-attach when track changes

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    if (!audioRef.current) return;
    
    const nextIndex = (currentTrack + 1) % MUSIC_URLS.length;
    setCurrentTrack(nextIndex);
  };

  if (!activeWorkout) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-app-dark/50 rounded-lg">
      <button
        onClick={togglePlay}
        className="p-2 bg-app-accent/10 hover:bg-app-accent/20 rounded-lg text-app-accent transition-colors"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      <button
        onClick={nextTrack}
        className="p-2 bg-app-accent/10 hover:bg-app-accent/20 rounded-lg text-app-accent transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-20 accent-app-accent"
      />
    </div>
  );
}
