export interface RuneScapeSkill {
  name: string;
  level: number;
  experience: number;
  icon: string;
}

export interface Avatar {
  gender: 'male' | 'female';
  skinTone: number;
  hairStyle: number;
  hairColor: number;
  topColor: number;
  bottomColor: number;
  shoeColor: number;
}

export interface FitnessGoal {
  id: string;
  type: 'strength' | 'cardio' | 'weight_loss' | 'muscle_gain' | 'endurance' | 'flexibility';
  target: number;
  unit: string;
  deadline?: Date;
  description: string;
}

export interface FitnessAssessment {
  currentWeight: number;
  targetWeight?: number;
  height: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  healthConditions: string[];
  availableEquipment: string[];
  preferredWorkoutTimes: string[];
  workoutDuration: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar: Avatar;
  skills: RuneScapeSkill[];
  level: number;
  totalExperience: number;
  fitnessAssessment?: FitnessAssessment;
  goals: FitnessGoal[];
  createdAt: Date;
  lastActive: Date;
  tutorialCompleted: boolean;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  displayName: string;
  avatar: Avatar;
  fitnessAssessment: FitnessAssessment;
  initialGoals: FitnessGoal[];
}