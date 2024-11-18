export const EXERCISE_CATEGORIES = {
  'Chest': {
    name: 'Chest',
    exercises: [
      { id: 1, name: 'Barbell Bench Press', category: 'Chest' },
      { id: 12, name: 'Incline Bench Press', category: 'Chest' },
      { id: 28, name: 'Decline Bench Press', category: 'Chest' },
      { id: 16, name: 'Chest Flyes', category: 'Chest' },
      { id: 25, name: 'Push-ups', category: 'Chest' },
      { id: 22, name: 'Dips', category: 'Chest' },
      { id: 35, name: 'Cable Flyes', category: 'Chest' },
      { id: 47, name: 'Machine Chest Press', category: 'Chest' }
    ]
  },
  'Back': {
    name: 'Back',
    exercises: [
      { id: 2, name: 'Pull-ups', category: 'Back' },
      { id: 9, name: 'Lat Pulldowns', category: 'Back' },
      { id: 4, name: 'Deadlift', category: 'Back' },
      { id: 15, name: 'Dumbbell Rows', category: 'Back' },
      { id: 29, name: 'T-Bar Rows', category: 'Back' },
      { id: 37, name: 'Barbell Shrugs', category: 'Back' },
      { id: 40, name: 'Dumbbell Pullovers', category: 'Back' },
      { id: 46, name: 'Good Mornings', category: 'Back' },
      { id: 49, name: 'Reverse Grip Pulldowns', category: 'Back' }
    ]
  },
  'Legs': {
    name: 'Legs',
    exercises: [
      { id: 3, name: 'Squats', category: 'Legs' },
      { id: 8, name: 'Leg Press', category: 'Legs' },
      { id: 11, name: 'Romanian Deadlift', category: 'Legs' },
      { id: 18, name: 'Leg Extensions', category: 'Legs' },
      { id: 24, name: 'Leg Curls', category: 'Legs' },
      { id: 26, name: 'Calf Raises', category: 'Legs' },
      { id: 32, name: 'Hip Thrusts', category: 'Legs' },
      { id: 41, name: 'Standing Calf Raises', category: 'Legs' },
      { id: 48, name: 'Glute Bridges', category: 'Legs' }
    ]
  },
  'Shoulders': {
    name: 'Shoulders',
    exercises: [
      { id: 5, name: 'Shoulder Press', category: 'Shoulders' },
      { id: 13, name: 'Face Pulls', category: 'Shoulders' },
      { id: 20, name: 'Lateral Raises', category: 'Shoulders' },
      { id: 23, name: 'Reverse Flyes', category: 'Shoulders' },
      { id: 30, name: 'Front Raises', category: 'Shoulders' },
      { id: 33, name: 'Arnold Press', category: 'Shoulders' },
      { id: 36, name: 'Seated Military Press', category: 'Shoulders' },
      { id: 45, name: 'Upright Rows', category: 'Shoulders' }
    ]
  },
  'Arms': {
    name: 'Arms',
    exercises: [
      { id: 6, name: 'Bicep Curls', category: 'Arms' },
      { id: 7, name: 'Tricep Pushdowns', category: 'Arms' },
      { id: 17, name: 'Hammer Curls', category: 'Arms' },
      { id: 27, name: 'Skull Crushers', category: 'Arms' },
      { id: 34, name: 'Preacher Curls', category: 'Arms' },
      { id: 39, name: 'Close Grip Bench Press', category: 'Arms' },
      { id: 43, name: 'Concentration Curls', category: 'Arms' }
    ]
  },
  'Core': {
    name: 'Core',
    exercises: [
      { id: 10, name: 'Plank', category: 'Core' },
      { id: 21, name: 'Cable Woodchoppers', category: 'Core' },
      { id: 31, name: 'Russian Twists', category: 'Core' },
      { id: 38, name: 'Reverse Crunches', category: 'Core' },
      { id: 42, name: 'Decline Sit-ups', category: 'Core' },
      { id: 44, name: 'Cable Crunches', category: 'Core' },
      { id: 50, name: 'Side Plank', category: 'Core' }
    ]
  }
};

export const exercises = [
  {
    id: 1,
    name: "Barbell Bench Press",
    category: "Chest",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on a flat bench with your feet flat on the ground",
      "Grip the barbell slightly wider than shoulder width",
      "Lower the bar to your chest with controlled movement",
      "Press the bar back up to starting position"
    ],
    muscles: ["Chest", "Shoulders", "Triceps"],
    equipment: "Barbell"
  },
  {
    id: 2,
    name: "Pull-ups",
    category: "Back",
    difficulty: "Advanced",
    gifUrl: "https://images.unsplash.com/photo-1598971639058-b11fb6f4bb81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    instructions: [
      "Hang from pull-up bar with hands slightly wider than shoulders",
      "Pull yourself up until chin is over the bar",
      "Lower yourself with control to starting position"
    ],
    muscles: ["Back", "Biceps", "Shoulders"],
    equipment: "Pull-up Bar"
  },
  {
    id: 3,
    name: "Squats",
    category: "Legs",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower your body by bending knees and hips",
      "Keep your back straight and chest up",
      "Return to starting position"
    ],
    muscles: ["Quadriceps", "Hamstrings", "Glutes"],
    equipment: "None"
  },
  {
    id: 4,
    name: "Deadlift",
    category: "Back",
    difficulty: "Advanced",
    gifUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand with feet hip-width apart",
      "Bend at hips and knees to grasp barbell",
      "Keep back straight and chest up",
      "Lift bar by extending hips and knees",
      "Return weight to ground with controlled movement"
    ],
    muscles: ["Back", "Legs", "Core"],
    equipment: "Barbell"
  },
  {
    id: 5,
    name: "Shoulder Press",
    category: "Shoulders",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit or stand with dumbbells at shoulder height",
      "Press weights overhead until arms are extended",
      "Lower weights back to starting position"
    ],
    muscles: ["Shoulders", "Triceps"],
    equipment: "Dumbbells"
  },
  {
    id: 6,
    name: "Bicep Curls",
    category: "Arms",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand with dumbbells in hand, arms fully extended",
      "Curl weights up towards shoulders",
      "Lower weights back down with control",
      "Keep elbows close to body throughout movement"
    ],
    muscles: ["Biceps"],
    equipment: "Dumbbells"
  },
  {
    id: 7,
    name: "Tricep Pushdowns",
    category: "Arms",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand at cable machine with high attachment",
      "Grip rope or bar at chest height",
      "Push down until arms are fully extended",
      "Control weight back up to starting position"
    ],
    muscles: ["Triceps"],
    equipment: "Cable Machine"
  },
  {
    id: 8,
    name: "Leg Press",
    category: "Legs",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit in leg press machine with feet shoulder-width apart",
      "Lower weight by bending knees",
      "Push weight back up by extending legs",
      "Don't lock knees at top of movement"
    ],
    muscles: ["Quadriceps", "Hamstrings", "Glutes"],
    equipment: "Leg Press Machine"
  },
  {
    id: 9,
    name: "Lat Pulldowns",
    category: "Back",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    instructions: [
      "Sit at lat pulldown machine",
      "Grip bar wider than shoulder width",
      "Pull bar down to upper chest",
      "Control weight back up to starting position"
    ],
    muscles: ["Back", "Biceps"],
    equipment: "Cable Machine"
  },
  {
    id: 10,
    name: "Plank",
    category: "Core",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Start in push-up position on forearms",
      "Keep body in straight line from head to heels",
      "Hold position while engaging core",
      "Maintain position for desired duration"
    ],
    muscles: ["Core", "Shoulders"],
    equipment: "None"
  },
  {
    id: 11,
    name: "Romanian Deadlift",
    category: "Legs",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1600026453346-a44501602a02?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand with feet hip-width apart holding barbell",
      "Keep slight bend in knees",
      "Hinge at hips while keeping back straight",
      "Lower weight until you feel hamstring stretch",
      "Return to starting position"
    ],
    muscles: ["Hamstrings", "Lower Back", "Glutes"],
    equipment: "Barbell"
  },
  {
    id: 12,
    name: "Incline Bench Press",
    category: "Chest",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on incline bench set to 30-45 degrees",
      "Grip barbell slightly wider than shoulders",
      "Lower bar to upper chest",
      "Press bar back up to starting position"
    ],
    muscles: ["Upper Chest", "Shoulders", "Triceps"],
    equipment: "Barbell, Incline Bench"
  },
  {
    id: 13,
    name: "Face Pulls",
    category: "Shoulders",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1738&q=80",
    instructions: [
      "Set cable machine to head height",
      "Pull rope attachment to face level",
      "Keep elbows high and wide",
      "Squeeze shoulder blades together"
    ],
    muscles: ["Rear Deltoids", "Upper Back", "Rotator Cuff"],
    equipment: "Cable Machine"
  },
  {
    id: 14,
    name: "Bulgarian Split Squats",
    category: "Legs",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Place one foot behind you on bench",
      "Lower back knee toward ground",
      "Keep front knee aligned with ankle",
      "Push through front heel to stand"
    ],
    muscles: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: "Bench, Optional Dumbbells"
  },
  {
    id: 15,
    name: "Dumbbell Rows",
    category: "Back",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1585152968992-d2b9444408cc?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Place one knee and hand on bench",
      "Keep back parallel to ground",
      "Pull dumbbell to hip",
      "Lower with control"
    ],
    muscles: ["Upper Back", "Lats", "Biceps"],
    equipment: "Dumbbells, Bench"
  },
  {
    id: 16,
    name: "Chest Flyes",
    category: "Chest",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1597347316205-36f6c451902a?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on bench with dumbbells extended above chest",
      "Lower weights in wide arc",
      "Keep slight bend in elbows",
      "Squeeze chest to return to start"
    ],
    muscles: ["Chest", "Shoulders"],
    equipment: "Dumbbells, Bench"
  },
  {
    id: 17,
    name: "Hammer Curls",
    category: "Arms",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand with dumbbells at sides, palms facing each other",
      "Curl weights while maintaining neutral grip",
      "Lower with control",
      "Keep elbows close to body"
    ],
    muscles: ["Biceps", "Forearms"],
    equipment: "Dumbbells"
  },
  {
    id: 18,
    name: "Leg Extensions",
    category: "Legs",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit in machine with back against pad",
      "Hook feet under ankle pad",
      "Extend legs fully",
      "Lower with control"
    ],
    muscles: ["Quadriceps"],
    equipment: "Leg Extension Machine"
  },
  {
    id: 19,
    name: "Seated Cable Rows",
    category: "Back",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit at cable machine with feet on platform",
      "Keep back straight",
      "Pull handle to lower chest",
      "Extend arms fully on return"
    ],
    muscles: ["Upper Back", "Lats", "Biceps"],
    equipment: "Cable Machine"
  },
  {
    id: 20,
    name: "Lateral Raises",
    category: "Shoulders",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1738&q=80",
    instructions: [
      "Stand with dumbbells at sides",
      "Raise arms out to sides until parallel with ground",
      "Keep slight bend in elbows",
      "Lower with control"
    ],
    muscles: ["Lateral Deltoids"],
    equipment: "Dumbbells"
  },
  {
    id: 21,
    name: "Cable Woodchoppers",
    category: "Core",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Set cable to high position",
      "Rotate torso while pulling cable down and across body",
      "Keep arms straight",
      "Control return movement"
    ],
    muscles: ["Core", "Obliques"],
    equipment: "Cable Machine"
  },
  {
    id: 22,
    name: "Dips",
    category: "Chest",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Mount dip bars with straight arms",
      "Lower body by bending elbows",
      "Keep slight forward lean for chest focus",
      "Push back to start position"
    ],
    muscles: ["Chest", "Triceps", "Shoulders"],
    equipment: "Dip Bars"
  },
  {
    id: 23,
    name: "Reverse Flyes",
    category: "Shoulders",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1598268030450-7a476f602bf6?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Bend forward at hips",
      "Keep back straight",
      "Raise dumbbells out to sides",
      "Squeeze shoulder blades together"
    ],
    muscles: ["Rear Deltoids", "Upper Back"],
    equipment: "Dumbbells"
  },
  {
    id: 24,
    name: "Leg Curls",
    category: "Legs",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie face down on machine",
      "Hook ankles under pad",
      "Curl legs up towards buttocks",
      "Lower with control"
    ],
    muscles: ["Hamstrings"],
    equipment: "Leg Curl Machine"
  },
  {
    id: 25,
    name: "Push-ups",
    category: "Chest",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Start in plank position",
      "Lower chest to ground",
      "Keep body straight",
      "Push back up to start"
    ],
    muscles: ["Chest", "Shoulders", "Triceps"],
    equipment: "None"
  },
  {
    id: 26,
    name: "Calf Raises",
    category: "Legs",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand on edge of platform",
      "Lower heels below platform level",
      "Rise up onto toes",
      "Lower with control"
    ],
    muscles: ["Calves"],
    equipment: "Platform"
  },
  {
    id: 27,
    name: "Skull Crushers",
    category: "Arms",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on bench holding weight above chest",
      "Bend elbows to lower weight toward forehead",
      "Keep upper arms stationary",
      "Extend arms to return to start"
    ],
    muscles: ["Triceps"],
    equipment: "Barbell or EZ Bar"
  },
  {
    id: 28,
    name: "Decline Bench Press",
    category: "Chest",
    difficulty: "Advanced",
    gifUrl: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on decline bench",
      "Grip barbell slightly wider than shoulders",
      "Lower bar to lower chest",
      "Press back to starting position"
    ],
    muscles: ["Lower Chest", "Triceps"],
    equipment: "Barbell, Decline Bench"
  },
  {
    id: 29,
    name: "T-Bar Rows",
    category: "Back",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1585152968992-d2b9444408cc?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Straddle T-bar with chest supported",
      "Grip handles",
      "Pull weight up to chest",
      "Lower with control"
    ],
    muscles: ["Upper Back", "Lats"],
    equipment: "T-Bar Row Machine"
  },
  {
    id: 30,
    name: "Front Raises",
    category: "Shoulders",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand holding weights in front of thighs",
      "Raise arms straight in front to shoulder height",
      "Keep slight bend in elbows",
      "Lower with control"
    ],
    muscles: ["Front Deltoids"],
    equipment: "Dumbbells"
  },
  {
    id: 31,
    name: "Russian Twists",
    category: "Core",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit with knees bent, feet off ground",
      "Lean back slightly",
      "Rotate torso side to side",
      "Hold weight for added difficulty"
    ],
    muscles: ["Obliques", "Core"],
    equipment: "Optional Weight"
  },
  {
    id: 32,
    name: "Hip Thrusts",
    category: "Legs",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit with upper back against bench",
      "Roll barbell over hips",
      "Drive hips up by squeezing glutes",
      "Lower with control"
    ],
    muscles: ["Glutes", "Hamstrings"],
    equipment: "Barbell, Bench"
  },
  {
    id: 33,
    name: "Arnold Press",
    category: "Shoulders",
    difficulty: "Advanced",
    gifUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Start with dumbbells at shoulders, palms facing you",
      "Press weights while rotating palms out",
      "Lower while rotating palms back in",
      "Return to start position"
    ],
    muscles: ["Shoulders", "Triceps"],
    equipment: "Dumbbells"
  },
  {
    id: 34,
    name: "Preacher Curls",
    category: "Arms",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit at preacher bench",
      "Rest arms on pad",
      "Curl weight up",
      "Lower with control"
    ],
    muscles: ["Biceps"],
    equipment: "Barbell or Dumbbells"
  },
  {
    id: 35,
    name: "Cable Flyes",
    category: "Chest",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1597347316205-36f6c451902a?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand between cable machines",
      "Keep slight bend in elbows",
      "Bring hands together in front",
      "Control return movement"
    ],
    muscles: ["Chest"],
    equipment: "Cable Machine"
  },
  {
    id: 36,
    name: "Seated Military Press",
    category: "Shoulders",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit with back supported",
      "Press barbell overhead",
      "Lower to shoulder level",
      "Keep core tight throughout"
    ],
    muscles: ["Shoulders", "Triceps"],
    equipment: "Barbell"
  },
  {
    id: 37,
    name: "Barbell Shrugs",
    category: "Back",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Hold barbell at arms length",
      "Elevate shoulders straight up",
      "Hold briefly at top",
      "Lower with control"
    ],
    muscles: ["Traps"],
    equipment: "Barbell"
  },
  {
    id: 38,
    name: "Reverse Crunches",
    category: "Core",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on back with legs up",
      "Lift hips off ground",
      "Roll back to starting position",
      "Keep controlled movement"
    ],
    muscles: ["Lower Abs"],
    equipment: "None"
  },
  {
    id: 39,
    name: "Close Grip Bench Press",
    category: "Arms",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Grip barbell shoulder width or closer",
      "Lower bar to lower chest",
      "Keep elbows close to body",
      "Press back to start"
    ],
    muscles: ["Triceps", "Chest"],
    equipment: "Barbell"
  },
  {
    id: 40,
    name: "Dumbbell Pullovers",
    category: "Back",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1598971639058-b11fb6f4bb81?auto=format&fit=crop&w=1738&q=80",
    instructions: [
      "Lie across bench with head supported",
      "Hold dumbbell overhead with straight arms",
      "Lower weight behind head",
      "Return to start position"
    ],
    muscles: ["Lats", "Chest"],
    equipment: "Dumbbell, Bench"
  },
  {
    id: 41,
    name: "Standing Calf Raises",
    category: "Legs",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand on calf raise machine",
      "Lower heels toward floor",
      "Rise up onto toes",
      "Lower with control"
    ],
    muscles: ["Calves"],
    equipment: "Calf Raise Machine"
  },
  {
    id: 42,
    name: "Decline Sit-ups",
    category: "Core",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Secure feet in decline bench",
      "Cross arms over chest",
      "Sit up with control",
      "Lower back down slowly"
    ],
    muscles: ["Upper Abs"],
    equipment: "Decline Bench"
  },
  {
    id: 43,
    name: "Concentration Curls",
    category: "Arms",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Sit on bench with elbow on inner thigh",
      "Curl weight toward shoulder",
      "Lower with control",
      "Keep upper arm stationary"
    ],
    muscles: ["Biceps"],
    equipment: "Dumbbell"
  },
  {
    id: 44,
    name: "Cable Crunches",
    category: "Core",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Kneel facing cable machine",
      "Hold rope attachment behind head",
      "Crunch down toward floor",
      "Control return movement"
    ],
    muscles: ["Abs"],
    equipment: "Cable Machine"
  },
  {
    id: 45,
    name: "Upright Rows",
    category: "Shoulders",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Stand holding barbell in front of thighs",
      "Pull bar up to chin level",
      "Keep elbows higher than forearms",
      "Lower with control"
    ],
    muscles: ["Shoulders", "Traps"],
    equipment: "Barbell"
  },
  {
    id: 46,
    name: "Good Mornings",
    category: "Back",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Place barbell on upper back",
      "Hinge at hips with slight knee bend",
      "Lower torso until parallel with floor",
      "Return to upright position"
    ],
    muscles: ["Lower Back", "Hamstrings"],
    equipment: "Barbell"
  },
  {
    id: 47,
    name: "Machine Chest Press",
    category: "Chest",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Adjust seat to chest height",
      "Grip handles",
      "Press weight forward",
      "Control return movement"
    ],
    muscles: ["Chest", "Shoulders", "Triceps"],
    equipment: "Chest Press Machine"
  },
  {
    id: 48,
    name: "Glute Bridges",
    category: "Legs",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on back with knees bent",
      "Feet flat on floor",
      "Lift hips toward ceiling",
      "Squeeze glutes at top"
    ],
    muscles: ["Glutes", "Hamstrings"],
    equipment: "None"
  },
  {
    id: 49,
    name: "Reverse Grip Pulldowns",
    category: "Back",
    difficulty: "Intermediate",
    gifUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1738&q=80",
    instructions: [
      "Grip bar with palms facing you",
      "Pull bar to upper chest",
      "Keep chest up",
      "Control return movement"
    ],
    muscles: ["Lats", "Biceps"],
    equipment: "Cable Machine"
  },
  {
    id: 50,
    name: "Side Plank",
    category: "Core",
    difficulty: "Beginner",
    gifUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1740&q=80",
    instructions: [
      "Lie on side with forearm on ground",
      "Lift hips off ground",
      "Hold position",
      "Keep body straight"
    ],
    muscles: ["Obliques", "Core"],
    equipment: "None"
  }
];

export const categories = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core"
];

export const difficulties = [
  "Beginner",
  "Intermediate",
  "Advanced"
];
