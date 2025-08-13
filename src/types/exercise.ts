export type ExerciseCategory = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'endurance' 
  | 'balance' 
  | 'agility' 
  | 'coordination' 
  | 'recovery' 
  | 'nutrition' 
  | 'mindfulness';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type EquipmentType = 
  | 'none' 
  | 'dumbbells' 
  | 'barbell' 
  | 'resistance_bands' 
  | 'kettlebell' 
  | 'pull_up_bar' 
  | 'yoga_mat' 
  | 'medicine_ball' 
  | 'treadmill' 
  | 'stationary_bike' 
  | 'cable_machine' 
  | 'smith_machine' 
  | 'bosu_ball' 
  | 'stability_ball' 
  | 'foam_roller' 
  | 'jump_rope' 
  | 'bench' 
  | 'squat_rack';

export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'forearms' 
  | 'abs' 
  | 'obliques' 
  | 'lower_back' 
  | 'glutes' 
  | 'quadriceps' 
  | 'hamstrings' 
  | 'calves' 
  | 'full_body' 
  | 'core' 
  | 'legs' 
  | 'arms' 
  | 'upper_body' 
  | 'lower_body';

export interface FormStep {
  stepNumber: number;
  instruction: string;
  tip?: string;
  commonMistake?: string;
}

export interface ExerciseVariation {
  name: string;
  description: string;
  difficultyModifier: number; // Multiplier for base XP (0.5 = easier, 1.5 = harder)
  equipmentRequired: EquipmentType[];
}

export interface ProgressMetric {
  name: string;
  unit: string;
  trackingType: 'reps' | 'weight' | 'time' | 'distance' | 'calories' | 'sets' | 'resistance_level';
  isOptional: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  difficulty: DifficultyLevel;
  baseXpValue: number;
  
  // Description and instructions
  description: string;
  benefits: string[];
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  
  // Form and technique
  formSteps: FormStep[];
  safetyTips: string[];
  contraindications: string[];
  
  // Equipment and setup
  equipmentRequired: EquipmentType[];
  equipmentAlternatives: {
    original: EquipmentType;
    alternatives: EquipmentType[];
    instructions: string;
  }[];
  
  // Variations and progressions
  variations: ExerciseVariation[];
  prerequisites?: string[]; // Required skills or exercises to master first
  progressions?: string[]; // Next exercises to advance to
  
  // Tracking metrics
  progressMetrics: ProgressMetric[];
  
  // Media and references
  instructionalVideoUrl?: string;
  demonstrationGifs?: string[];
  referenceImages?: string[];
  
  // Metadata
  estimatedDurationMinutes: number;
  caloriesBurnedPerMinute: number;
  tags: string[];
  createdAt: Date;
  lastUpdated: Date;
}

export interface ExerciseSet {
  exerciseId: string;
  reps?: number;
  weight?: number;
  duration?: number; // in seconds
  distance?: number; // in meters/miles
  resistanceLevel?: number;
  restTime?: number; // in seconds
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  date: Date;
  name: string;
  exercises: ExerciseSet[];
  totalDurationMinutes: number;
  totalCaloriesBurned: number;
  totalXpEarned: number;
  skillXpBreakdown: { [skill: string]: number };
  notes?: string;
  mood?: 'poor' | 'fair' | 'good' | 'great' | 'excellent';
  perceived_exertion?: number; // 1-10 scale
}

export interface ExerciseProgress {
  exerciseId: string;
  userId: string;
  personalBest: {
    weight?: number;
    reps?: number;
    duration?: number;
    distance?: number;
  };
  progressHistory: {
    date: Date;
    metrics: { [metricName: string]: number };
    xpEarned: number;
  }[];
  totalXpEarned: number;
  timesCompleted: number;
  averageRating: number;
  lastPerformed?: Date;
  notes: string[];
}

export interface ExerciseFilter {
  categories?: ExerciseCategory[];
  difficulties?: DifficultyLevel[];
  equipment?: EquipmentType[];
  muscleGroups?: MuscleGroup[];
  duration?: {
    min: number;
    max: number;
  };
  xpRange?: {
    min: number;
    max: number;
  };
  searchTerm?: string;
  tags?: string[];
}