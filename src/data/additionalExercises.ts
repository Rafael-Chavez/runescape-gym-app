import { Exercise } from '../types/exercise';

// This file contains additional exercises to bring our total to 100+
export const ADDITIONAL_EXERCISES_BATCH_2: Exercise[] = [
  // More Strength Exercises
  {
    id: 'strength_006',
    name: 'Dumbbell Rows',
    category: 'strength',
    difficulty: 'beginner',
    baseXpValue: 30,
    description: 'A fundamental pulling exercise that builds back strength and improves posture.',
    benefits: ['Builds back strength', 'Improves posture', 'Balances pushing movements', 'Strengthens rear delts'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'shoulders'],
    formSteps: [
      { stepNumber: 1, instruction: 'Place one knee and hand on bench for support', tip: 'Keep back straight and core engaged' },
      { stepNumber: 2, instruction: 'Hold dumbbell in opposite hand, arm fully extended', commonMistake: 'Starting with arm bent' },
      { stepNumber: 3, instruction: 'Pull dumbbell to ribs, leading with elbow', tip: 'Think of starting the pull with your elbow' },
      { stepNumber: 4, instruction: 'Squeeze shoulder blade at top of movement', commonMistake: 'Not fully contracting the back' },
      { stepNumber: 5, instruction: 'Lower with control to starting position', tip: 'Feel the stretch in your lat at the bottom' }
    ],
    safetyTips: ['Keep core tight throughout', 'Don\'t twist your torso', 'Use full range of motion', 'Start with lighter weight'],
    contraindications: ['Recent back surgery', 'Acute lower back pain', 'Severe shoulder impingement'],
    equipmentRequired: ['dumbbells', 'bench'],
    equipmentAlternatives: [
      { original: 'bench', alternatives: ['none'], instructions: 'Perform bent-over rows standing with feet staggered' }
    ],
    variations: [
      { name: 'Bent-Over Row', description: 'Stand bent over without bench support', difficultyModifier: 1.1, equipmentRequired: ['dumbbells'] },
      { name: 'Single-Arm Cable Row', description: 'Use cable machine for constant tension', difficultyModifier: 1.0, equipmentRequired: ['cable_machine'] },
      { name: 'Chest-Supported Row', description: 'Use incline bench for chest support', difficultyModifier: 0.9, equipmentRequired: ['dumbbells', 'bench'] }
    ],
    progressMetrics: [
      { name: 'Weight', unit: 'lbs', trackingType: 'weight', isOptional: false },
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 4,
    caloriesBurnedPerMinute: 5,
    tags: ['pulling', 'unilateral', 'back_building', 'posture'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // More Cardio Exercises
  {
    id: 'cardio_003',
    name: 'Mountain Climbers',
    category: 'cardio',
    difficulty: 'intermediate',
    baseXpValue: 25,
    description: 'High-intensity bodyweight exercise that combines cardio with core strengthening.',
    benefits: ['Burns calories quickly', 'Strengthens core', 'Improves coordination', 'No equipment needed'],
    primaryMuscles: ['core'],
    secondaryMuscles: ['shoulders', 'legs'],
    formSteps: [
      { stepNumber: 1, instruction: 'Start in plank position with hands under shoulders', tip: 'Keep body in straight line' },
      { stepNumber: 2, instruction: 'Bring right knee toward chest', commonMistake: 'Lifting hips too high' },
      { stepNumber: 3, instruction: 'Quickly switch legs, bringing left knee to chest', tip: 'Keep switching motion fluid' },
      { stepNumber: 4, instruction: 'Continue alternating legs rapidly', commonMistake: 'Bouncing hips up and down' },
      { stepNumber: 5, instruction: 'Maintain plank position throughout', tip: 'Think of running in plank position' }
    ],
    safetyTips: ['Start slowly and build speed', 'Keep core engaged', 'Land softly on balls of feet', 'Stop if form breaks down'],
    contraindications: ['Wrist injuries', 'Recent abdominal surgery', 'Severe lower back problems'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [],
    variations: [
      { name: 'Slow Mountain Climbers', description: 'Perform slowly with controlled movement', difficultyModifier: 0.7, equipmentRequired: ['none'] },
      { name: 'Cross-Body Mountain Climbers', description: 'Bring knee to opposite elbow', difficultyModifier: 1.2, equipmentRequired: ['none'] },
      { name: 'Mountain Climber Pushups', description: 'Add pushup between each leg switch', difficultyModifier: 1.5, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Duration', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: true },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 2,
    caloriesBurnedPerMinute: 12,
    tags: ['hiit', 'core', 'bodyweight', 'conditioning'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  {
    id: 'cardio_004',
    name: 'Cycling',
    category: 'cardio',
    difficulty: 'beginner',
    baseXpValue: 35,
    description: 'Low-impact cardiovascular exercise that builds leg strength and endurance.',
    benefits: ['Low impact on joints', 'Builds leg strength', 'Improves cardiovascular health', 'Can be done indoors or outdoors'],
    primaryMuscles: ['legs'],
    secondaryMuscles: ['core', 'glutes'],
    formSteps: [
      { stepNumber: 1, instruction: 'Adjust seat height so leg is slightly bent at bottom of pedal stroke', tip: 'Proper bike fit is crucial for comfort and safety' },
      { stepNumber: 2, instruction: 'Keep core engaged and back straight', commonMistake: 'Hunching over handlebars' },
      { stepNumber: 3, instruction: 'Pedal in smooth circles, not just pushing down', tip: 'Think of scraping mud off bottom of shoe' },
      { stepNumber: 4, instruction: 'Maintain steady breathing rhythm', commonMistake: 'Holding breath during hard efforts' },
      { stepNumber: 5, instruction: 'Keep knees aligned over feet', tip: 'Avoid letting knees cave inward' }
    ],
    safetyTips: ['Wear proper helmet outdoors', 'Start with shorter rides', 'Stay hydrated', 'Check bike maintenance regularly'],
    contraindications: ['Severe knee problems', 'Recent hip surgery', 'Balance disorders'],
    equipmentRequired: ['stationary_bike'],
    equipmentAlternatives: [
      { original: 'stationary_bike', alternatives: ['none'], instructions: 'Use outdoor bicycle or indoor trainer' }
    ],
    variations: [
      { name: 'Interval Cycling', description: 'Alternate between high and low intensity', difficultyModifier: 1.3, equipmentRequired: ['stationary_bike'] },
      { name: 'Hill Climbing', description: 'Increase resistance to simulate hills', difficultyModifier: 1.4, equipmentRequired: ['stationary_bike'] },
      { name: 'Spin Class', description: 'Follow structured group fitness format', difficultyModifier: 1.2, equipmentRequired: ['stationary_bike'] }
    ],
    progressMetrics: [
      { name: 'Duration', unit: 'minutes', trackingType: 'time', isOptional: false },
      { name: 'Distance', unit: 'miles', trackingType: 'distance', isOptional: true },
      { name: 'Resistance Level', unit: '1-10', trackingType: 'resistance_level', isOptional: true },
      { name: 'Calories', unit: 'kcal', trackingType: 'calories', isOptional: true }
    ],
    estimatedDurationMinutes: 30,
    caloriesBurnedPerMinute: 10,
    tags: ['low_impact', 'endurance', 'leg_strength', 'beginner_friendly'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // More Flexibility Exercises
  {
    id: 'flexibility_002',
    name: 'Pigeon Pose',
    category: 'flexibility',
    difficulty: 'intermediate',
    baseXpValue: 25,
    description: 'Deep hip opener that stretches hip flexors, glutes, and outer thighs.',
    benefits: ['Opens tight hips', 'Stretches hip flexors', 'Releases tension in glutes', 'Improves hip mobility'],
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'quadriceps'],
    formSteps: [
      { stepNumber: 1, instruction: 'Start in downward dog position', tip: 'Begin from a familiar pose' },
      { stepNumber: 2, instruction: 'Bring right knee toward right wrist', commonMistake: 'Forcing knee too close to wrist' },
      { stepNumber: 3, instruction: 'Lower right shin toward parallel with front of mat', tip: 'Only go as far as comfortable' },
      { stepNumber: 4, instruction: 'Extend left leg straight back', commonMistake: 'Allowing back leg to bend' },
      { stepNumber: 5, instruction: 'Fold forward over front leg if comfortable', tip: 'Use props under hips if needed' }
    ],
    safetyTips: ['Never force the position', 'Use props for support if needed', 'Listen to your body', 'Exit slowly if you feel pain'],
    contraindications: ['Knee injuries', 'Recent hip surgery', 'Severe hip problems'],
    equipmentRequired: ['yoga_mat'],
    equipmentAlternatives: [
      { original: 'yoga_mat', alternatives: ['none'], instructions: 'Can be done on any soft surface or with blanket' }
    ],
    variations: [
      { name: 'Supported Pigeon', description: 'Use bolster or pillows under hips', difficultyModifier: 0.7, equipmentRequired: ['yoga_mat'] },
      { name: 'Figure-4 Pigeon', description: 'Lying on back variation', difficultyModifier: 0.8, equipmentRequired: ['yoga_mat'] },
      { name: 'King Pigeon', description: 'Advanced backbend variation', difficultyModifier: 1.8, equipmentRequired: ['yoga_mat'] }
    ],
    progressMetrics: [
      { name: 'Hold Time', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Comfort Level', unit: '1-10', trackingType: 'resistance_level', isOptional: true },
      { name: 'Range of Motion', unit: '1-10', trackingType: 'resistance_level', isOptional: true }
    ],
    estimatedDurationMinutes: 5,
    caloriesBurnedPerMinute: 2,
    tags: ['hip_opener', 'deep_stretch', 'yoga', 'flexibility'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // More Balance Exercises
  {
    id: 'balance_002',
    name: 'Tree Pose',
    category: 'balance',
    difficulty: 'beginner',
    baseXpValue: 20,
    description: 'Classic yoga balance pose that improves stability and focus.',
    benefits: ['Improves balance', 'Strengthens standing leg', 'Enhances focus', 'Calms the mind'],
    primaryMuscles: ['calves', 'core'],
    secondaryMuscles: ['glutes'],
    formSteps: [
      { stepNumber: 1, instruction: 'Stand tall with feet hip-width apart', tip: 'Find a focal point to help with balance' },
      { stepNumber: 2, instruction: 'Shift weight to left foot', commonMistake: 'Not fully committing weight to standing leg' },
      { stepNumber: 3, instruction: 'Place right foot on inner left thigh or calf', tip: 'Never place foot on side of knee' },
      { stepNumber: 4, instruction: 'Bring palms together at heart center', commonMistake: 'Rushing to raise arms overhead' },
      { stepNumber: 5, instruction: 'Hold position while breathing steadily', tip: 'It\'s normal for the pose to be wobbly' }
    ],
    safetyTips: ['Never place foot on side of knee', 'Use wall for support if needed', 'Start with toe on ground', 'Focus on steady breathing'],
    contraindications: ['Severe balance disorders', 'Recent ankle injuries', 'Acute dizziness'],
    equipmentRequired: ['yoga_mat'],
    equipmentAlternatives: [
      { original: 'yoga_mat', alternatives: ['none'], instructions: 'Can be practiced anywhere with stable footing' }
    ],
    variations: [
      { name: 'Supported Tree', description: 'Use wall or chair for hand support', difficultyModifier: 0.6, equipmentRequired: ['none'] },
      { name: 'Tree with Arms Up', description: 'Raise arms overhead in V-shape', difficultyModifier: 1.2, equipmentRequired: ['yoga_mat'] },
      { name: 'Eyes Closed Tree', description: 'Practice with eyes closed', difficultyModifier: 1.5, equipmentRequired: ['yoga_mat'] }
    ],
    progressMetrics: [
      { name: 'Hold Time', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Stability Rating', unit: '1-10', trackingType: 'resistance_level', isOptional: true }
    ],
    estimatedDurationMinutes: 3,
    caloriesBurnedPerMinute: 2,
    tags: ['yoga', 'balance', 'focus', 'mindfulness'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // More Agility Exercises
  {
    id: 'agility_002',
    name: 'Cone Drills',
    category: 'agility',
    difficulty: 'intermediate',
    baseXpValue: 35,
    description: 'Sport-specific drills that improve change of direction, acceleration, and deceleration.',
    benefits: ['Improves change of direction', 'Builds acceleration', 'Enhances deceleration control', 'Sport-specific conditioning'],
    primaryMuscles: ['legs'],
    secondaryMuscles: ['core', 'calves'],
    formSteps: [
      { stepNumber: 1, instruction: 'Set up cones in desired pattern (5-10 yards apart)', tip: 'Start with simple patterns before complex ones' },
      { stepNumber: 2, instruction: 'Focus on low center of gravity during cuts', commonMistake: 'Standing too upright during direction changes' },
      { stepNumber: 3, instruction: 'Plant outside foot when changing direction', tip: 'Drive off outside foot to cut effectively' },
      { stepNumber: 4, instruction: 'Keep eyes up and look ahead', commonMistake: 'Staring down at cones' },
      { stepNumber: 5, instruction: 'Accelerate through each movement', tip: 'Don\'t just go through the motions - move with purpose' }
    ],
    safetyTips: ['Warm up thoroughly before high-intensity drills', 'Start slowly and build speed', 'Ensure proper footwear', 'Practice on safe, level surface'],
    contraindications: ['Recent ankle injuries', 'Knee instability', 'Acute lower leg pain'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [
      { original: 'none', alternatives: ['none'], instructions: 'Use any objects as markers (water bottles, shoes, etc.)' }
    ],
    variations: [
      { name: '5-10-5 Shuttle', description: 'Sprint 5 yards, back 10, forward 5', difficultyModifier: 1.2, equipmentRequired: ['none'] },
      { name: 'T-Drill', description: 'Four-cone pattern in T-shape', difficultyModifier: 1.3, equipmentRequired: ['none'] },
      { name: 'Box Drill', description: 'Four cones in square pattern', difficultyModifier: 1.1, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Time', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false },
      { name: 'Rest Time', unit: 'seconds', trackingType: 'time', isOptional: true }
    ],
    estimatedDurationMinutes: 15,
    caloriesBurnedPerMinute: 10,
    tags: ['sport_specific', 'change_of_direction', 'speed', 'conditioning'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  }
];

// Continue with more exercises to reach 100+...
export const STRENGTH_EXERCISES_BATCH_3: Exercise[] = [
  {
    id: 'strength_007',
    name: 'Push-ups',
    category: 'strength',
    difficulty: 'beginner',
    baseXpValue: 25,
    description: 'The classic bodyweight exercise that builds chest, shoulder, and tricep strength.',
    benefits: ['Builds upper body strength', 'Requires no equipment', 'Improves core stability', 'Easy to modify'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps', 'core'],
    formSteps: [
      { stepNumber: 1, instruction: 'Start in plank position with hands slightly wider than shoulders', tip: 'Keep body in straight line' },
      { stepNumber: 2, instruction: 'Lower body until chest nearly touches ground', commonMistake: 'Not going low enough' },
      { stepNumber: 3, instruction: 'Keep core tight throughout movement', tip: 'Don\'t let hips sag or pike up' },
      { stepNumber: 4, instruction: 'Push through hands to return to start', commonMistake: 'Leading with hips instead of chest' },
      { stepNumber: 5, instruction: 'Maintain steady breathing pattern', tip: 'Exhale on the push up' }
    ],
    safetyTips: ['Keep wrists aligned under shoulders', 'Maintain neutral spine', 'Start on knees if needed', 'Stop if you feel wrist pain'],
    contraindications: ['Wrist injuries', 'Recent shoulder surgery', 'Acute back pain'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [],
    variations: [
      { name: 'Knee Push-ups', description: 'Perform on knees instead of toes', difficultyModifier: 0.6, equipmentRequired: ['none'] },
      { name: 'Incline Push-ups', description: 'Hands elevated on bench or wall', difficultyModifier: 0.7, equipmentRequired: ['none'] },
      { name: 'Diamond Push-ups', description: 'Hands form diamond shape for tricep emphasis', difficultyModifier: 1.3, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 3,
    caloriesBurnedPerMinute: 6,
    tags: ['bodyweight', 'upper_body', 'classic', 'no_equipment'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  {
    id: 'strength_008',
    name: 'Lunges',
    category: 'strength',
    difficulty: 'beginner',
    baseXpValue: 30,
    description: 'Unilateral leg exercise that builds strength, balance, and stability.',
    benefits: ['Builds leg strength', 'Improves balance', 'Corrects muscle imbalances', 'Functional movement pattern'],
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves', 'core'],
    formSteps: [
      { stepNumber: 1, instruction: 'Stand with feet hip-width apart', tip: 'Keep torso upright throughout' },
      { stepNumber: 2, instruction: 'Step forward with right foot', commonMistake: 'Step too short or too long' },
      { stepNumber: 3, instruction: 'Lower until both knees at 90 degrees', tip: 'Back knee should nearly touch ground' },
      { stepNumber: 4, instruction: 'Push through front heel to return to start', commonMistake: 'Pushing off back toe' },
      { stepNumber: 5, instruction: 'Alternate legs or complete set on one side', tip: 'Keep most weight on front leg' }
    ],
    safetyTips: ['Don\'t let front knee cave inward', 'Keep front knee over ankle', 'Start with bodyweight only', 'Use wall for balance if needed'],
    contraindications: ['Knee injuries', 'Balance disorders', 'Recent hip surgery'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [
      { original: 'none', alternatives: ['dumbbells'], instructions: 'Hold dumbbells at sides for added resistance' }
    ],
    variations: [
      { name: 'Reverse Lunges', description: 'Step backward instead of forward', difficultyModifier: 0.9, equipmentRequired: ['none'] },
      { name: 'Walking Lunges', description: 'Continuously step forward alternating legs', difficultyModifier: 1.1, equipmentRequired: ['none'] },
      { name: 'Lateral Lunges', description: 'Step to the side instead of forward', difficultyModifier: 1.2, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false },
      { name: 'Weight', unit: 'lbs', trackingType: 'weight', isOptional: true }
    ],
    estimatedDurationMinutes: 5,
    caloriesBurnedPerMinute: 7,
    tags: ['unilateral', 'functional', 'bodyweight', 'balance'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  }
];

// Export all additional exercises combined
export const ALL_ADDITIONAL_EXERCISES = [
  ...ADDITIONAL_EXERCISES_BATCH_2,
  ...STRENGTH_EXERCISES_BATCH_3
];