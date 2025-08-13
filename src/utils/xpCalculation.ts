import { Exercise, ExerciseSet, WorkoutSession } from '../types/exercise';
import { RuneScapeSkill } from '../types/user';

// RuneScape-inspired XP calculation system
export interface XPCalculationResult {
  baseXP: number;
  bonusXP: number;
  totalXP: number;
  skillsAffected: string[];
  multipliers: {
    duration: number;
    intensity: number;
    consistency: number;
    form: number;
    difficulty: number;
  };
}

export interface LevelProgressInfo {
  currentLevel: number;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  xpNeededForNext: number;
  progressPercent: number;
}

// RuneScape XP table - exact replica of original game
export const XP_TABLE: number[] = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431
];

// Constants for XP calculation
export const XP_MULTIPLIERS = {
  // Duration multipliers (longer workouts get slight bonus)
  DURATION: {
    VERY_SHORT: 0.8,  // < 10 minutes
    SHORT: 0.9,       // 10-20 minutes
    NORMAL: 1.0,      // 20-45 minutes
    LONG: 1.1,        // 45-60 minutes
    VERY_LONG: 1.15   // > 60 minutes
  },
  
  // Intensity multipliers based on heart rate zones
  INTENSITY: {
    LIGHT: 0.8,       // < 60% max HR
    MODERATE: 1.0,    // 60-70% max HR
    VIGOROUS: 1.2,    // 70-85% max HR
    HIGH: 1.4,        // 85-95% max HR
    MAXIMUM: 1.6      // > 95% max HR
  },
  
  // Consistency bonus (streak multiplier)
  CONSISTENCY: {
    BASE: 1.0,
    PER_DAY_STREAK: 0.02,  // 2% bonus per consecutive day
    MAX_STREAK_BONUS: 0.5  // Cap at 50% bonus (25 day streak)
  },
  
  // Form quality multiplier
  FORM: {
    POOR: 0.6,        // Bad form reduces XP significantly
    FAIR: 0.8,        // Okay form
    GOOD: 1.0,        // Standard form
    EXCELLENT: 1.2    // Perfect form bonus
  },
  
  // Difficulty multiplier
  DIFFICULTY: {
    BEGINNER: 0.8,
    INTERMEDIATE: 1.0,
    ADVANCED: 1.3,
    EXPERT: 1.6
  }
};

/**
 * Calculate XP gained from a single exercise set
 */
export const calculateSetXP = (
  exercise: Exercise,
  set: ExerciseSet,
  options: {
    intensity?: 'light' | 'moderate' | 'vigorous' | 'high' | 'maximum';
    formQuality?: 'poor' | 'fair' | 'good' | 'excellent';
    streakDays?: number;
  } = {}
): XPCalculationResult => {
  const {
    intensity = 'moderate',
    formQuality = 'good',
    streakDays = 0
  } = options;

  // Base XP from exercise
  let baseXP = exercise.baseXpValue;

  // Duration multiplier based on actual duration vs estimated
  const actualDuration = set.duration || exercise.estimatedDurationMinutes * 60; // in seconds
  const durationMinutes = actualDuration / 60;
  
  let durationMultiplier = XP_MULTIPLIERS.DURATION.NORMAL;
  if (durationMinutes < 10) durationMultiplier = XP_MULTIPLIERS.DURATION.VERY_SHORT;
  else if (durationMinutes < 20) durationMultiplier = XP_MULTIPLIERS.DURATION.SHORT;
  else if (durationMinutes < 45) durationMultiplier = XP_MULTIPLIERS.DURATION.NORMAL;
  else if (durationMinutes < 60) durationMultiplier = XP_MULTIPLIERS.DURATION.LONG;
  else durationMultiplier = XP_MULTIPLIERS.DURATION.VERY_LONG;

  // Intensity multiplier
  const intensityMultiplier = XP_MULTIPLIERS.INTENSITY[intensity.toUpperCase() as keyof typeof XP_MULTIPLIERS.INTENSITY];

  // Consistency multiplier (streak bonus)
  const streakBonus = Math.min(
    streakDays * XP_MULTIPLIERS.CONSISTENCY.PER_DAY_STREAK,
    XP_MULTIPLIERS.CONSISTENCY.MAX_STREAK_BONUS
  );
  const consistencyMultiplier = XP_MULTIPLIERS.CONSISTENCY.BASE + streakBonus;

  // Form quality multiplier
  const formMultiplier = XP_MULTIPLIERS.FORM[formQuality.toUpperCase() as keyof typeof XP_MULTIPLIERS.FORM];

  // Difficulty multiplier
  const difficultyMultiplier = XP_MULTIPLIERS.DIFFICULTY[exercise.difficulty.toUpperCase() as keyof typeof XP_MULTIPLIERS.DIFFICULTY];

  // Calculate reps/weight bonus for strength exercises
  let performanceBonus = 1.0;
  if (exercise.category === 'strength' && set.weight && set.reps) {
    // Bonus for heavier weights and more reps
    const weightBonus = Math.min(set.weight / 100, 2.0); // Cap at 2x for 200+ lbs
    const repsBonus = Math.min(set.reps / 10, 1.5); // Cap at 1.5x for 15+ reps
    performanceBonus = 1 + (weightBonus * 0.1) + (repsBonus * 0.05);
  } else if (exercise.category === 'cardio' && set.distance) {
    // Bonus for longer distances
    const distanceBonus = Math.min(set.distance / 5, 2.0); // Cap at 2x for 5+ miles
    performanceBonus = 1 + (distanceBonus * 0.1);
  } else if (exercise.category === 'endurance' && set.duration) {
    // Bonus for longer holds
    const durationBonus = Math.min(set.duration / 120, 2.0); // Cap at 2x for 2+ minutes
    performanceBonus = 1 + (durationBonus * 0.1);
  }

  // Calculate final XP
  const multipliers = {
    duration: durationMultiplier,
    intensity: intensityMultiplier,
    consistency: consistencyMultiplier,
    form: formMultiplier,
    difficulty: difficultyMultiplier
  };

  const totalMultiplier = Object.values(multipliers).reduce((acc, mult) => acc * mult, 1) * performanceBonus;
  const bonusXP = baseXP * (totalMultiplier - 1);
  const totalXP = Math.round(baseXP * totalMultiplier);

  return {
    baseXP,
    bonusXP: Math.round(bonusXP),
    totalXP,
    skillsAffected: [exercise.category],
    multipliers
  };
};

/**
 * Calculate total XP for a workout session
 */
export const calculateWorkoutXP = (
  session: WorkoutSession,
  exercises: Exercise[],
  userStreak: number = 0
): { totalXP: number; skillBreakdown: { [skill: string]: number } } => {
  let totalXP = 0;
  const skillBreakdown: { [skill: string]: number } = {};

  session.exercises.forEach(set => {
    const exercise = exercises.find(ex => ex.id === set.exerciseId);
    if (!exercise) return;

    // Estimate intensity based on workout metrics
    let intensity: 'light' | 'moderate' | 'vigorous' | 'high' | 'maximum' = 'moderate';
    if (session.perceived_exertion) {
      if (session.perceived_exertion <= 3) intensity = 'light';
      else if (session.perceived_exertion <= 5) intensity = 'moderate';
      else if (session.perceived_exertion <= 7) intensity = 'vigorous';
      else if (session.perceived_exertion <= 9) intensity = 'high';
      else intensity = 'maximum';
    }

    const xpResult = calculateSetXP(exercise, set, {
      intensity,
      formQuality: 'good', // Default to good form
      streakDays: userStreak
    });

    totalXP += xpResult.totalXP;
    
    // Add to skill breakdown
    xpResult.skillsAffected.forEach(skill => {
      skillBreakdown[skill] = (skillBreakdown[skill] || 0) + xpResult.totalXP;
    });
  });

  return { totalXP, skillBreakdown };
};

/**
 * Get level from XP amount using RuneScape formula
 */
export const getLevelFromXP = (xp: number): number => {
  for (let level = 99; level >= 1; level--) {
    if (xp >= XP_TABLE[level - 1]) {
      return level;
    }
  }
  return 1;
};

/**
 * Get XP required for a specific level
 */
export const getXPForLevel = (level: number): number => {
  if (level < 1) return 0;
  if (level > 99) return XP_TABLE[98]; // Level 99 XP
  return XP_TABLE[level - 1];
};

/**
 * Get detailed level progress information
 */
export const getLevelProgress = (currentXP: number): LevelProgressInfo => {
  const currentLevel = getLevelFromXP(currentXP);
  const xpForCurrentLevel = getXPForLevel(currentLevel);
  const xpForNextLevel = currentLevel >= 99 ? XP_TABLE[98] : getXPForLevel(currentLevel + 1);
  const xpNeededForNext = currentLevel >= 99 ? 0 : xpForNextLevel - currentXP;
  const progressPercent = currentLevel >= 99 ? 100 : 
    ((currentXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return {
    currentLevel,
    currentXP,
    xpForCurrentLevel,
    xpForNextLevel,
    xpNeededForNext,
    progressPercent: Math.round(progressPercent * 100) / 100
  };
};

/**
 * Calculate total level from all skills
 */
export const calculateTotalLevel = (skills: RuneScapeSkill[]): number => {
  return skills.reduce((total, skill) => total + getLevelFromXP(skill.experience), 0);
};

/**
 * Calculate combat level equivalent (average of physical skills)
 */
export const calculateCombatLevel = (skills: RuneScapeSkill[]): number => {
  const physicalSkills = ['strength', 'cardio', 'endurance', 'agility'];
  const physicalSkillLevels = skills
    .filter(skill => physicalSkills.includes(skill.name.toLowerCase()))
    .map(skill => getLevelFromXP(skill.experience));

  if (physicalSkillLevels.length === 0) return 1;
  
  const averageLevel = physicalSkillLevels.reduce((sum, level) => sum + level, 0) / physicalSkillLevels.length;
  return Math.floor(averageLevel);
};

/**
 * Check if user has leveled up after gaining XP
 */
export const checkLevelUp = (oldXP: number, newXP: number): { leveledUp: boolean; newLevel: number; oldLevel: number } => {
  const oldLevel = getLevelFromXP(oldXP);
  const newLevel = getLevelFromXP(newXP);
  
  return {
    leveledUp: newLevel > oldLevel,
    newLevel,
    oldLevel
  };
};

/**
 * Calculate XP rates (XP per hour)
 */
export const calculateXPRate = (xpGained: number, timeSpentMinutes: number): number => {
  if (timeSpentMinutes === 0) return 0;
  return Math.round((xpGained / timeSpentMinutes) * 60);
};

/**
 * Get milestone levels (every 10 levels + special milestones)
 */
export const getMilestones = (): number[] => {
  return [10, 20, 30, 40, 50, 60, 70, 80, 90, 99];
};

/**
 * Check if a level is a milestone
 */
export const isMilestone = (level: number): boolean => {
  return getMilestones().includes(level);
};