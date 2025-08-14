import { Exercise, ExerciseCategory, DifficultyLevel, EquipmentType, MuscleGroup } from '../types/exercise';
import { ALL_ADDITIONAL_EXERCISES } from './additionalExercises';

export const EXERCISE_DATABASE: Exercise[] = [
  // STRENGTH SKILL EXERCISES
  {
    id: 'strength_001',
    name: 'Barbell Back Squat',
    category: 'strength',
    difficulty: 'intermediate',
    baseXpValue: 50,
    description: 'The king of all exercises. A compound movement that builds massive leg and core strength while improving overall power.',
    benefits: ['Builds massive leg strength', 'Improves core stability', 'Increases bone density', 'Enhances athletic performance'],
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves', 'core', 'lower_back'],
    formSteps: [
      { stepNumber: 1, instruction: 'Position the bar on your upper traps, not your neck', tip: 'Create a shelf with your upper back muscles' },
      { stepNumber: 2, instruction: 'Set feet shoulder-width apart with toes slightly pointed out', commonMistake: 'Feet too narrow or too wide' },
      { stepNumber: 3, instruction: 'Initiate movement by pushing hips back and bending knees', tip: 'Think of sitting back into a chair' },
      { stepNumber: 4, instruction: 'Descend until thighs are parallel to the floor', commonMistake: 'Not going deep enough or going too deep' },
      { stepNumber: 5, instruction: 'Drive through heels to return to starting position', tip: 'Push the floor away with your feet' }
    ],
    safetyTips: [
      'Always use safety bars or have a spotter',
      'Keep your chest up and core engaged throughout',
      'Never round your lower back',
      'Start with bodyweight or light weight to master form'
    ],
    contraindications: ['Recent knee surgery', 'Severe lower back injuries', 'Hip impingement without clearance'],
    equipmentRequired: ['barbell', 'squat_rack'],
    equipmentAlternatives: [
      {
        original: 'barbell',
        alternatives: ['dumbbells', 'kettlebell'],
        instructions: 'Hold dumbbells at sides or goblet squat with kettlebell at chest'
      }
    ],
    variations: [
      { name: 'Goblet Squat', description: 'Hold weight at chest level', difficultyModifier: 0.7, equipmentRequired: ['kettlebell'] },
      { name: 'Front Squat', description: 'Bar positioned on front delts', difficultyModifier: 1.2, equipmentRequired: ['barbell', 'squat_rack'] },
      { name: 'Bodyweight Squat', description: 'No external weight', difficultyModifier: 0.4, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Weight', unit: 'lbs', trackingType: 'weight', isOptional: false },
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 5,
    caloriesBurnedPerMinute: 8,
    tags: ['compound', 'lower_body', 'powerlifting', 'mass_builder'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  {
    id: 'strength_002',
    name: 'Deadlift',
    category: 'strength',
    difficulty: 'advanced',
    baseXpValue: 60,
    description: 'The ultimate test of raw strength. Builds total-body power and teaches proper hip hinge movement patterns.',
    benefits: ['Builds total-body strength', 'Improves posture', 'Strengthens posterior chain', 'Functional movement pattern'],
    primaryMuscles: ['hamstrings', 'glutes', 'lower_back'],
    secondaryMuscles: ['quadriceps', 'core', 'upper_body', 'forearms'],
    formSteps: [
      { stepNumber: 1, instruction: 'Stand with feet hip-width apart, bar over mid-foot', tip: 'Bar should be about 1 inch from your shins' },
      { stepNumber: 2, instruction: 'Hinge at hips and grip bar just outside legs', commonMistake: 'Squatting down instead of hinging' },
      { stepNumber: 3, instruction: 'Engage lats, chest up, shoulders back', tip: 'Think of protecting your armpits' },
      { stepNumber: 4, instruction: 'Drive through heels and extend hips to lift bar', commonMistake: 'Bar drifting away from body' },
      { stepNumber: 5, instruction: 'Stand tall with shoulders back, then reverse the movement', tip: 'Push hips back first on the way down' }
    ],
    safetyTips: [
      'Keep the bar close to your body throughout',
      'Never round your lower back',
      'Use proper warm-up and gradual loading',
      'Consider mixed grip or straps for heavy weights'
    ],
    contraindications: ['Recent back surgery', 'Acute lower back pain', 'Herniated discs without clearance'],
    equipmentRequired: ['barbell'],
    equipmentAlternatives: [
      {
        original: 'barbell',
        alternatives: ['dumbbells', 'kettlebell'],
        instructions: 'Perform single-leg deadlifts with dumbbells or sumo deadlift with kettlebell'
      }
    ],
    variations: [
      { name: 'Romanian Deadlift', description: 'Focus on hip hinge with minimal knee bend', difficultyModifier: 0.8, equipmentRequired: ['barbell'] },
      { name: 'Sumo Deadlift', description: 'Wide stance, hands inside legs', difficultyModifier: 0.9, equipmentRequired: ['barbell'] },
      { name: 'Trap Bar Deadlift', description: 'Use trap/hex bar for more upright position', difficultyModifier: 0.85, equipmentRequired: ['barbell'] }
    ],
    progressMetrics: [
      { name: 'Weight', unit: 'lbs', trackingType: 'weight', isOptional: false },
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 6,
    caloriesBurnedPerMinute: 10,
    tags: ['compound', 'posterior_chain', 'powerlifting', 'strength'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  {
    id: 'strength_003',
    name: 'Bench Press',
    category: 'strength',
    difficulty: 'intermediate',
    baseXpValue: 45,
    description: 'The classic upper body strength builder. Develops pushing power and chest, shoulder, and tricep strength.',
    benefits: ['Builds upper body pushing strength', 'Develops chest mass', 'Improves shoulder stability', 'Enhances pressing power'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps', 'core'],
    formSteps: [
      { stepNumber: 1, instruction: 'Lie on bench with eyes under the bar', tip: 'Bar should be directly over your eyes when racked' },
      { stepNumber: 2, instruction: 'Grip bar slightly wider than shoulder width', commonMistake: 'Grip too wide or too narrow' },
      { stepNumber: 3, instruction: 'Create arch in lower back and retract shoulder blades', tip: 'Think of pinching shoulder blades together' },
      { stepNumber: 4, instruction: 'Unrack and lower bar to chest with control', commonMistake: 'Bouncing bar off chest' },
      { stepNumber: 5, instruction: 'Press bar up and slightly back toward face', tip: 'Think of pushing yourself away from the bar' }
    ],
    safetyTips: [
      'Always use a spotter or safety bars',
      'Keep feet planted on the ground',
      'Control the descent - no bouncing',
      'Full grip on bar (no suicide grip)'
    ],
    contraindications: ['Recent shoulder surgery', 'Acute shoulder impingement', 'Wrist injuries'],
    equipmentRequired: ['barbell', 'bench'],
    equipmentAlternatives: [
      {
        original: 'barbell',
        alternatives: ['dumbbells'],
        instructions: 'Use dumbbells for greater range of motion and unilateral training'
      }
    ],
    variations: [
      { name: 'Dumbbell Bench Press', description: 'Use dumbbells for greater range of motion', difficultyModifier: 0.9, equipmentRequired: ['dumbbells', 'bench'] },
      { name: 'Incline Bench Press', description: 'Bench set at 30-45 degree angle', difficultyModifier: 1.1, equipmentRequired: ['barbell', 'bench'] },
      { name: 'Close-Grip Bench Press', description: 'Hands closer together for tricep emphasis', difficultyModifier: 1.0, equipmentRequired: ['barbell', 'bench'] }
    ],
    progressMetrics: [
      { name: 'Weight', unit: 'lbs', trackingType: 'weight', isOptional: false },
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 4,
    caloriesBurnedPerMinute: 6,
    tags: ['compound', 'upper_body', 'pushing', 'powerlifting'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // CARDIO SKILL EXERCISES
  {
    id: 'cardio_001',
    name: 'Running',
    category: 'cardio',
    difficulty: 'beginner',
    baseXpValue: 30,
    description: 'The most fundamental cardiovascular exercise. Builds endurance, burns calories, and strengthens the cardiovascular system.',
    benefits: ['Improves cardiovascular health', 'Burns calories efficiently', 'Strengthens legs', 'Enhances mental health'],
    primaryMuscles: ['legs'],
    secondaryMuscles: ['core', 'calves'],
    formSteps: [
      { stepNumber: 1, instruction: 'Maintain upright posture with slight forward lean', tip: 'Lean from ankles, not waist' },
      { stepNumber: 2, instruction: 'Land on midfoot directly under your center of gravity', commonMistake: 'Heel striking too far in front of body' },
      { stepNumber: 3, instruction: 'Keep arms bent at 90 degrees, swing front to back', commonMistake: 'Arms crossing body or swinging side to side' },
      { stepNumber: 4, instruction: 'Maintain quick, light cadence around 180 steps per minute', tip: 'Count steps for 15 seconds and multiply by 12' },
      { stepNumber: 5, instruction: 'Breathe rhythmically, typically 3:2 pattern', tip: 'Inhale for 3 steps, exhale for 2 steps' }
    ],
    safetyTips: [
      'Start with walk-run intervals',
      'Increase mileage by no more than 10% per week',
      'Wear proper running shoes',
      'Stay hydrated and run in safe areas'
    ],
    contraindications: ['Recent lower leg injuries', 'Severe joint problems', 'Acute cardiovascular conditions'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [
      {
        original: 'none',
        alternatives: ['treadmill'],
        instructions: 'Use treadmill for controlled environment and incline options'
      }
    ],
    variations: [
      { name: 'Interval Running', description: 'Alternate between high and low intensity', difficultyModifier: 1.3, equipmentRequired: ['none'] },
      { name: 'Hill Running', description: 'Run on inclined surfaces', difficultyModifier: 1.4, equipmentRequired: ['none'] },
      { name: 'Treadmill Running', description: 'Controlled indoor running', difficultyModifier: 0.9, equipmentRequired: ['treadmill'] }
    ],
    progressMetrics: [
      { name: 'Distance', unit: 'miles', trackingType: 'distance', isOptional: false },
      { name: 'Duration', unit: 'minutes', trackingType: 'time', isOptional: false },
      { name: 'Pace', unit: 'min/mile', trackingType: 'time', isOptional: true },
      { name: 'Heart Rate', unit: 'bpm', trackingType: 'resistance_level', isOptional: true }
    ],
    estimatedDurationMinutes: 30,
    caloriesBurnedPerMinute: 12,
    tags: ['endurance', 'fat_burning', 'outdoor', 'beginner_friendly'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  {
    id: 'cardio_002',
    name: 'Burpees',
    category: 'cardio',
    difficulty: 'intermediate',
    baseXpValue: 35,
    description: 'A full-body explosive exercise that combines strength and cardio. Burns massive calories and builds mental toughness.',
    benefits: ['Full-body conditioning', 'High calorie burn', 'Improves power and agility', 'No equipment needed'],
    primaryMuscles: ['full_body'],
    secondaryMuscles: ['core', 'legs', 'arms', 'chest'],
    formSteps: [
      { stepNumber: 1, instruction: 'Start in standing position with feet shoulder-width apart', tip: 'Keep core engaged throughout entire movement' },
      { stepNumber: 2, instruction: 'Squat down and place hands on ground', commonMistake: 'Placing hands too far forward' },
      { stepNumber: 3, instruction: 'Jump feet back into plank position', tip: 'Land softly in a strong plank position' },
      { stepNumber: 4, instruction: 'Perform a push-up (optional for beginners)', commonMistake: 'Allowing hips to sag' },
      { stepNumber: 5, instruction: 'Jump feet back to squat position and jump up with arms overhead', tip: 'Explosive jump at the end' }
    ],
    safetyTips: [
      'Start slowly and focus on form',
      'Modify by stepping instead of jumping',
      'Listen to your body and rest when needed',
      'Land softly to protect joints'
    ],
    contraindications: ['Recent back surgery', 'Severe joint problems', 'Cardiovascular conditions without clearance'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [],
    variations: [
      { name: 'Half Burpee', description: 'No push-up or jump', difficultyModifier: 0.6, equipmentRequired: ['none'] },
      { name: 'Burpee Box Jump', description: 'Jump onto a box instead of vertical jump', difficultyModifier: 1.3, equipmentRequired: ['none'] },
      { name: 'Single-Arm Burpee', description: 'Perform with one arm for added challenge', difficultyModifier: 1.4, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Duration', unit: 'seconds', trackingType: 'time', isOptional: true },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 10,
    caloriesBurnedPerMinute: 15,
    tags: ['hiit', 'full_body', 'no_equipment', 'conditioning'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // FLEXIBILITY SKILL EXERCISES
  {
    id: 'flexibility_001',
    name: 'Downward Dog',
    category: 'flexibility',
    difficulty: 'beginner',
    baseXpValue: 20,
    description: 'A foundational yoga pose that stretches the entire posterior chain while building upper body strength.',
    benefits: ['Stretches hamstrings and calves', 'Strengthens arms and shoulders', 'Improves spinal alignment', 'Calms the mind'],
    primaryMuscles: ['hamstrings', 'calves'],
    secondaryMuscles: ['shoulders', 'core', 'back'],
    formSteps: [
      { stepNumber: 1, instruction: 'Start on hands and knees in tabletop position', tip: 'Hands shoulder-width apart, knees hip-width apart' },
      { stepNumber: 2, instruction: 'Tuck toes under and lift hips up and back', commonMistake: 'Placing too much weight on hands' },
      { stepNumber: 3, instruction: 'Straighten legs as much as comfortable', tip: 'Bend knees if needed to keep spine straight' },
      { stepNumber: 4, instruction: 'Press hands firmly into ground and reach sit bones to sky', commonMistake: 'Rounding the back' },
      { stepNumber: 5, instruction: 'Hold position while breathing deeply', tip: 'Pedal feet to warm up calves' }
    ],
    safetyTips: [
      'Keep micro-bend in knees if hamstrings are tight',
      'Distribute weight evenly between hands and feet',
      'Never force the stretch',
      'Exit pose slowly'
    ],
    contraindications: ['Wrist injuries', 'Recent shoulder surgery', 'High blood pressure (avoid holding too long)'],
    equipmentRequired: ['yoga_mat'],
    equipmentAlternatives: [
      {
        original: 'yoga_mat',
        alternatives: ['none'],
        instructions: 'Can be performed on any non-slip surface'
      }
    ],
    variations: [
      { name: 'Three-Legged Dog', description: 'Lift one leg up for added challenge', difficultyModifier: 1.2, equipmentRequired: ['yoga_mat'] },
      { name: 'Dolphin Pose', description: 'Forearms on ground instead of hands', difficultyModifier: 1.3, equipmentRequired: ['yoga_mat'] },
      { name: 'Puppy Pose', description: 'Knees stay on ground', difficultyModifier: 0.7, equipmentRequired: ['yoga_mat'] }
    ],
    progressMetrics: [
      { name: 'Hold Time', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false },
      { name: 'Comfort Level', unit: '1-10', trackingType: 'resistance_level', isOptional: true }
    ],
    estimatedDurationMinutes: 3,
    caloriesBurnedPerMinute: 3,
    tags: ['yoga', 'stretching', 'upper_body', 'hamstrings'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // ENDURANCE SKILL EXERCISES
  {
    id: 'endurance_001',
    name: 'Plank Hold',
    category: 'endurance',
    difficulty: 'beginner',
    baseXpValue: 25,
    description: 'The ultimate core endurance exercise. Builds incredible core strength and teaches proper spine alignment.',
    benefits: ['Builds core endurance', 'Improves posture', 'Strengthens entire core', 'Enhances body awareness'],
    primaryMuscles: ['core', 'abs'],
    secondaryMuscles: ['shoulders', 'glutes', 'legs'],
    formSteps: [
      { stepNumber: 1, instruction: 'Start in push-up position with forearms on ground', tip: 'Elbows directly under shoulders' },
      { stepNumber: 2, instruction: 'Keep body in straight line from head to heels', commonMistake: 'Hips too high or too low' },
      { stepNumber: 3, instruction: 'Engage core by pulling belly button toward spine', tip: 'Think of creating tension throughout entire body' },
      { stepNumber: 4, instruction: 'Breathe normally while maintaining position', commonMistake: 'Holding breath' },
      { stepNumber: 5, instruction: 'Hold position for desired time', tip: 'Start with 30 seconds and build up' }
    ],
    safetyTips: [
      'Stop if form breaks down',
      'Start with shorter holds and build up',
      'Keep neck in neutral position',
      'Don\'t hold breath'
    ],
    contraindications: ['Recent back surgery', 'Acute lower back pain', 'Wrist injuries'],
    equipmentRequired: ['yoga_mat'],
    equipmentAlternatives: [
      {
        original: 'yoga_mat',
        alternatives: ['none'],
        instructions: 'Can be performed on any surface'
      }
    ],
    variations: [
      { name: 'Side Plank', description: 'Balance on one forearm and side of feet', difficultyModifier: 1.1, equipmentRequired: ['yoga_mat'] },
      { name: 'Plank with Leg Lift', description: 'Lift one leg while holding plank', difficultyModifier: 1.3, equipmentRequired: ['yoga_mat'] },
      { name: 'Knee Plank', description: 'Rest on knees instead of toes', difficultyModifier: 0.6, equipmentRequired: ['yoga_mat'] }
    ],
    progressMetrics: [
      { name: 'Hold Time', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 3,
    caloriesBurnedPerMinute: 4,
    tags: ['core', 'isometric', 'bodyweight', 'endurance'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // BALANCE SKILL EXERCISES
  {
    id: 'balance_001',
    name: 'Single-Leg Stand',
    category: 'balance',
    difficulty: 'beginner',
    baseXpValue: 15,
    description: 'A fundamental balance exercise that improves proprioception and ankle stability.',
    benefits: ['Improves balance and coordination', 'Strengthens ankles', 'Enhances proprioception', 'Prevents falls'],
    primaryMuscles: ['calves'],
    secondaryMuscles: ['core', 'glutes'],
    formSteps: [
      { stepNumber: 1, instruction: 'Stand tall with feet hip-width apart', tip: 'Find a focal point to help with balance' },
      { stepNumber: 2, instruction: 'Lift one foot off the ground', commonMistake: 'Lifting foot too high initially' },
      { stepNumber: 3, instruction: 'Keep standing leg slightly bent', tip: 'Locked knee makes balancing harder' },
      { stepNumber: 4, instruction: 'Engage core and maintain upright posture', commonMistake: 'Leaning to one side' },
      { stepNumber: 5, instruction: 'Hold position then switch legs', tip: 'Start with eyes open, progress to eyes closed' }
    ],
    safetyTips: [
      'Have a wall or chair nearby for support',
      'Start with shorter holds',
      'Practice on firm surface before trying unstable surfaces',
      'Stop if you feel dizzy'
    ],
    contraindications: ['Acute ankle injuries', 'Severe balance disorders', 'Recent ankle surgery'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [
      {
        original: 'none',
        alternatives: ['bosu_ball'],
        instructions: 'Perform on unstable surface for added challenge'
      }
    ],
    variations: [
      { name: 'Eyes Closed Single-Leg Stand', description: 'Close eyes to increase difficulty', difficultyModifier: 1.5, equipmentRequired: ['none'] },
      { name: 'BOSU Ball Single-Leg Stand', description: 'Stand on unstable surface', difficultyModifier: 1.8, equipmentRequired: ['bosu_ball'] },
      { name: 'Single-Leg Stand with Arm Movements', description: 'Move arms while balancing', difficultyModifier: 1.3, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Hold Time', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Sets Per Leg', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 2,
    caloriesBurnedPerMinute: 2,
    tags: ['balance', 'proprioception', 'ankle_stability', 'bodyweight'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // AGILITY SKILL EXERCISES
  {
    id: 'agility_001',
    name: 'Ladder Drills',
    category: 'agility',
    difficulty: 'intermediate',
    baseXpValue: 30,
    description: 'Quick footwork drills that improve coordination, agility, and neuromuscular control.',
    benefits: ['Improves foot speed', 'Enhances coordination', 'Builds agility', 'Develops neuromuscular control'],
    primaryMuscles: ['calves'],
    secondaryMuscles: ['core', 'legs'],
    formSteps: [
      { stepNumber: 1, instruction: 'Stand at one end of agility ladder', tip: 'Start with basic two-feet-in-each-box pattern' },
      { stepNumber: 2, instruction: 'Step into first box with both feet', commonMistake: 'Looking down at feet instead of ahead' },
      { stepNumber: 3, instruction: 'Quickly move through ladder with chosen pattern', tip: 'Stay on balls of feet for quick movement' },
      { stepNumber: 4, instruction: 'Maintain upright posture and pump arms', commonMistake: 'Leaning too far forward' },
      { stepNumber: 5, instruction: 'Complete pattern and return with different footwork', tip: 'Practice various patterns for different benefits' }
    ],
    safetyTips: [
      'Start slowly and focus on accuracy before speed',
      'Warm up properly before high-intensity drills',
      'Ensure ladder is secure and flat',
      'Wear appropriate athletic shoes'
    ],
    contraindications: ['Recent ankle injuries', 'Acute foot pain', 'Balance disorders'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [
      {
        original: 'none',
        alternatives: ['none'],
        instructions: 'Can create imaginary ladder or use chalk/tape to mark boxes'
      }
    ],
    variations: [
      { name: 'In-In-Out-Out', description: 'Two feet in box, two feet outside', difficultyModifier: 1.0, equipmentRequired: ['none'] },
      { name: 'Lateral Shuffle', description: 'Side-to-side movement through ladder', difficultyModifier: 1.2, equipmentRequired: ['none'] },
      { name: 'Icky Shuffle', description: 'Complex pattern with crossover steps', difficultyModifier: 1.5, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Time', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Patterns Completed', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 10,
    caloriesBurnedPerMinute: 8,
    tags: ['agility', 'footwork', 'coordination', 'speed'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // COORDINATION SKILL EXERCISES
  {
    id: 'coordination_001',
    name: 'Jump Rope',
    category: 'coordination',
    difficulty: 'beginner',
    baseXpValue: 25,
    description: 'Classic coordination exercise that improves timing, rhythm, and cardiovascular fitness.',
    benefits: ['Improves hand-eye coordination', 'Builds cardiovascular fitness', 'Enhances timing and rhythm', 'Strengthens calves'],
    primaryMuscles: ['calves'],
    secondaryMuscles: ['shoulders', 'forearms', 'core'],
    formSteps: [
      { stepNumber: 1, instruction: 'Hold rope handles with light grip', tip: 'Handles should reach your armpits when standing on rope' },
      { stepNumber: 2, instruction: 'Keep elbows close to sides, rotate from wrists', commonMistake: 'Using whole arms to turn rope' },
      { stepNumber: 3, instruction: 'Jump just high enough for rope to pass under feet', tip: 'Stay on balls of feet, small bouncing motion' },
      { stepNumber: 4, instruction: 'Land softly and maintain steady rhythm', commonMistake: 'Jumping too high or landing hard' },
      { stepNumber: 5, instruction: 'Keep eyes looking forward, not down at feet', tip: 'Focus on maintaining consistent timing' }
    ],
    safetyTips: [
      'Start with shorter sessions (30 seconds to 1 minute)',
      'Land softly to protect joints',
      'Use proper jump rope for your height',
      'Practice on appropriate surface (not concrete)'
    ],
    contraindications: ['Recent ankle or foot injuries', 'Severe joint problems', 'Balance disorders'],
    equipmentRequired: ['jump_rope'],
    equipmentAlternatives: [
      {
        original: 'jump_rope',
        alternatives: ['none'],
        instructions: 'Practice jumping motion without rope to build coordination'
      }
    ],
    variations: [
      { name: 'Single Bounce', description: 'Basic jump on both feet', difficultyModifier: 1.0, equipmentRequired: ['jump_rope'] },
      { name: 'Alternate Foot', description: 'Jump from foot to foot like running in place', difficultyModifier: 1.1, equipmentRequired: ['jump_rope'] },
      { name: 'Double Under', description: 'Rope passes under feet twice per jump', difficultyModifier: 1.8, equipmentRequired: ['jump_rope'] }
    ],
    progressMetrics: [
      { name: 'Duration', unit: 'seconds', trackingType: 'time', isOptional: false },
      { name: 'Jumps', unit: 'count', trackingType: 'reps', isOptional: true },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 10,
    caloriesBurnedPerMinute: 12,
    tags: ['coordination', 'cardio', 'rhythm', 'portable'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // RECOVERY SKILL EXERCISES
  {
    id: 'recovery_001',
    name: 'Foam Rolling',
    category: 'recovery',
    difficulty: 'beginner',
    baseXpValue: 15,
    description: 'Self-myofascial release technique that helps reduce muscle tension and improve recovery.',
    benefits: ['Reduces muscle tension', 'Improves flexibility', 'Enhances recovery', 'Increases blood flow'],
    primaryMuscles: ['full_body'],
    secondaryMuscles: ['core'],
    formSteps: [
      { stepNumber: 1, instruction: 'Position body on foam roller targeting specific muscle group', tip: 'Start with lighter pressure and gradually increase' },
      { stepNumber: 2, instruction: 'Support body weight with hands and opposite leg', commonMistake: 'Putting full body weight on roller initially' },
      { stepNumber: 3, instruction: 'Slowly roll back and forth over muscle', tip: 'Roll 1-2 inches per second' },
      { stepNumber: 4, instruction: 'Pause on tender spots for 30-60 seconds', commonMistake: 'Rolling too quickly over tight areas' },
      { stepNumber: 5, instruction: 'Breathe deeply and relax into the pressure', tip: 'Tensing up reduces effectiveness' }
    ],
    safetyTips: [
      'Never roll over joints or bones',
      'Avoid rolling injured areas',
      'Stop if you experience sharp pain',
      'Stay hydrated after foam rolling'
    ],
    contraindications: ['Acute injuries', 'Blood clots', 'Recent fractures', 'Severe osteoporosis'],
    equipmentRequired: ['foam_roller'],
    equipmentAlternatives: [
      {
        original: 'foam_roller',
        alternatives: ['none'],
        instructions: 'Use tennis ball or lacrosse ball for targeted trigger point release'
      }
    ],
    variations: [
      { name: 'IT Band Rolling', description: 'Target iliotibial band on side of leg', difficultyModifier: 1.2, equipmentRequired: ['foam_roller'] },
      { name: 'Quadriceps Rolling', description: 'Roll front of thighs', difficultyModifier: 1.0, equipmentRequired: ['foam_roller'] },
      { name: 'Upper Back Rolling', description: 'Target upper back and shoulders', difficultyModifier: 0.8, equipmentRequired: ['foam_roller'] }
    ],
    progressMetrics: [
      { name: 'Duration', unit: 'minutes', trackingType: 'time', isOptional: false },
      { name: 'Body Parts Targeted', unit: 'count', trackingType: 'reps', isOptional: true },
      { name: 'Pressure Level', unit: '1-10', trackingType: 'resistance_level', isOptional: true }
    ],
    estimatedDurationMinutes: 10,
    caloriesBurnedPerMinute: 2,
    tags: ['recovery', 'self_massage', 'flexibility', 'tension_release'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  // MINDFULNESS SKILL EXERCISES
  {
    id: 'mindfulness_001',
    name: 'Meditation',
    category: 'mindfulness',
    difficulty: 'beginner',
    baseXpValue: 20,
    description: 'Mental training practice that develops awareness, focus, and emotional regulation.',
    benefits: ['Reduces stress and anxiety', 'Improves focus and concentration', 'Enhances emotional regulation', 'Promotes better sleep'],
    primaryMuscles: ['core'],
    secondaryMuscles: [],
    formSteps: [
      { stepNumber: 1, instruction: 'Find comfortable seated position with spine straight', tip: 'Use cushion or chair for comfort' },
      { stepNumber: 2, instruction: 'Close eyes or soften gaze downward', commonMistake: 'Trying to force thoughts away' },
      { stepNumber: 3, instruction: 'Focus on natural breathing pattern', tip: 'Don\'t try to control breath, just observe' },
      { stepNumber: 4, instruction: 'When mind wanders, gently return attention to breath', commonMistake: 'Getting frustrated with wandering mind' },
      { stepNumber: 5, instruction: 'Continue for desired duration', tip: 'Start with 5-10 minutes and gradually increase' }
    ],
    safetyTips: [
      'Start with short sessions',
      'Be patient with yourself',
      'Find quiet, comfortable space',
      'Consistency is more important than duration'
    ],
    contraindications: ['Severe mental health conditions without professional guidance'],
    equipmentRequired: ['none'],
    equipmentAlternatives: [],
    variations: [
      { name: 'Guided Meditation', description: 'Follow audio or video guidance', difficultyModifier: 0.8, equipmentRequired: ['none'] },
      { name: 'Walking Meditation', description: 'Practice mindfulness while walking slowly', difficultyModifier: 0.9, equipmentRequired: ['none'] },
      { name: 'Body Scan Meditation', description: 'Focus attention on different parts of body', difficultyModifier: 1.1, equipmentRequired: ['none'] }
    ],
    progressMetrics: [
      { name: 'Duration', unit: 'minutes', trackingType: 'time', isOptional: false },
      { name: 'Sessions', unit: 'count', trackingType: 'sets', isOptional: false },
      { name: 'Focus Quality', unit: '1-10', trackingType: 'resistance_level', isOptional: true }
    ],
    estimatedDurationMinutes: 10,
    caloriesBurnedPerMinute: 1,
    tags: ['mindfulness', 'stress_relief', 'mental_health', 'focus'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  }
];

// Add more exercises to reach 100+
export const ADDITIONAL_EXERCISES: Exercise[] = [
  // Additional Strength exercises
  {
    id: 'strength_004',
    name: 'Pull-ups',
    category: 'strength',
    difficulty: 'intermediate',
    baseXpValue: 40,
    description: 'The ultimate upper body pulling exercise. Builds incredible back, bicep, and grip strength.',
    benefits: ['Builds upper body pulling strength', 'Develops V-shaped back', 'Improves grip strength', 'Functional movement'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'shoulders', 'core'],
    formSteps: [
      { stepNumber: 1, instruction: 'Hang from bar with hands slightly wider than shoulders', tip: 'Use overhand grip for traditional pull-up' },
      { stepNumber: 2, instruction: 'Engage core and retract shoulder blades', commonMistake: 'Starting pull with arms instead of back' },
      { stepNumber: 3, instruction: 'Pull body up until chin clears bar', tip: 'Think of pulling elbows down to ribs' },
      { stepNumber: 4, instruction: 'Lower with control to full arm extension', commonMistake: 'Dropping down too quickly' },
      { stepNumber: 5, instruction: 'Repeat for desired reps', tip: 'Full range of motion is key' }
    ],
    safetyTips: [
      'Build up gradually - use assistance if needed',
      'Avoid swinging or kipping initially',
      'Warm up shoulders thoroughly',
      'Stop if you feel sharp pain'
    ],
    contraindications: ['Recent shoulder surgery', 'Severe elbow problems', 'Acute back injuries'],
    equipmentRequired: ['pull_up_bar'],
    equipmentAlternatives: [
      {
        original: 'pull_up_bar',
        alternatives: ['resistance_bands'],
        instructions: 'Use resistance bands for assisted pull-ups or lat pulldowns'
      }
    ],
    variations: [
      { name: 'Chin-ups', description: 'Underhand grip emphasizes biceps', difficultyModifier: 0.9, equipmentRequired: ['pull_up_bar'] },
      { name: 'Wide-Grip Pull-ups', description: 'Hands wider for lat emphasis', difficultyModifier: 1.2, equipmentRequired: ['pull_up_bar'] },
      { name: 'Assisted Pull-ups', description: 'Use band or machine assistance', difficultyModifier: 0.6, equipmentRequired: ['pull_up_bar', 'resistance_bands'] }
    ],
    progressMetrics: [
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false },
      { name: 'Added Weight', unit: 'lbs', trackingType: 'weight', isOptional: true }
    ],
    estimatedDurationMinutes: 5,
    caloriesBurnedPerMinute: 7,
    tags: ['compound', 'upper_body', 'pulling', 'bodyweight'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  },

  {
    id: 'strength_005',
    name: 'Overhead Press',
    category: 'strength',
    difficulty: 'intermediate',
    baseXpValue: 35,
    description: 'Builds powerful shoulders and core stability. The ultimate test of overhead strength.',
    benefits: ['Builds shoulder strength', 'Improves core stability', 'Enhances overhead mobility', 'Develops functional pressing power'],
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'core', 'back'],
    formSteps: [
      { stepNumber: 1, instruction: 'Stand with feet hip-width apart, bar at shoulder level', tip: 'Keep core tight throughout movement' },
      { stepNumber: 2, instruction: 'Grip bar just outside shoulders', commonMistake: 'Grip too wide or too narrow' },
      { stepNumber: 3, instruction: 'Press bar straight up over head', tip: 'Push bar up and slightly back' },
      { stepNumber: 4, instruction: 'Lock out arms overhead with bar over shoulders', commonMistake: 'Not achieving full lockout' },
      { stepNumber: 5, instruction: 'Lower bar with control to starting position', tip: 'Keep core engaged on descent' }
    ],
    safetyTips: [
      'Use safety bars or have a spotter',
      'Warm up shoulders thoroughly',
      'Start with lighter weight to learn movement',
      'Keep core engaged throughout'
    ],
    contraindications: ['Recent shoulder surgery', 'Shoulder impingement', 'Severe lower back problems'],
    equipmentRequired: ['barbell', 'squat_rack'],
    equipmentAlternatives: [
      {
        original: 'barbell',
        alternatives: ['dumbbells'],
        instructions: 'Use dumbbells for unilateral training and shoulder stability'
      }
    ],
    variations: [
      { name: 'Dumbbell Shoulder Press', description: 'Use dumbbells for greater range of motion', difficultyModifier: 0.9, equipmentRequired: ['dumbbells'] },
      { name: 'Seated Overhead Press', description: 'Perform seated to reduce core demand', difficultyModifier: 0.8, equipmentRequired: ['barbell', 'bench'] },
      { name: 'Push Press', description: 'Use leg drive to assist press', difficultyModifier: 1.3, equipmentRequired: ['barbell', 'squat_rack'] }
    ],
    progressMetrics: [
      { name: 'Weight', unit: 'lbs', trackingType: 'weight', isOptional: false },
      { name: 'Reps', unit: 'count', trackingType: 'reps', isOptional: false },
      { name: 'Sets', unit: 'count', trackingType: 'sets', isOptional: false }
    ],
    estimatedDurationMinutes: 4,
    caloriesBurnedPerMinute: 6,
    tags: ['compound', 'shoulders', 'pressing', 'core_stability'],
    createdAt: new Date('2025-01-01'),
    lastUpdated: new Date('2025-01-01')
  }
];

// Combine all exercises
export const ALL_EXERCISES = [...EXERCISE_DATABASE, ...ADDITIONAL_EXERCISES, ...ALL_ADDITIONAL_EXERCISES];

// Helper functions for exercise database
export const getExercisesByCategory = (category: ExerciseCategory): Exercise[] => {
  return ALL_EXERCISES.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty: DifficultyLevel): Exercise[] => {
  return ALL_EXERCISES.filter(exercise => exercise.difficulty === difficulty);
};

export const getExercisesByEquipment = (equipment: EquipmentType[]): Exercise[] => {
  return ALL_EXERCISES.filter(exercise => 
    exercise.equipmentRequired.length === 0 || 
    exercise.equipmentRequired.some(req => equipment.includes(req))
  );
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return ALL_EXERCISES.find(exercise => exercise.id === id);
};

export const searchExercises = (searchTerm: string): Exercise[] => {
  const term = searchTerm.toLowerCase();
  return ALL_EXERCISES.filter(exercise => 
    exercise.name.toLowerCase().includes(term) ||
    exercise.description.toLowerCase().includes(term) ||
    exercise.tags.some(tag => tag.toLowerCase().includes(term)) ||
    exercise.benefits.some(benefit => benefit.toLowerCase().includes(term))
  );
};