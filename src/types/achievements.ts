export type AchievementCategory = 
  | 'milestone' 
  | 'consistency' 
  | 'strength' 
  | 'endurance' 
  | 'exploration' 
  | 'mastery' 
  | 'special' 
  | 'social' 
  | 'collection';

export type AchievementDifficulty = 'easy' | 'medium' | 'hard' | 'elite' | 'master';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  difficulty: AchievementDifficulty;
  
  // Requirements
  requirements: {
    type: 'level' | 'xp' | 'streak' | 'workouts' | 'time' | 'weight' | 'distance' | 'custom';
    skill?: string;
    value: number;
    operator: '>=' | '>' | '=' | '<' | '<=';
    description: string;
  }[];
  
  // Rewards
  rewards: {
    xp?: { [skill: string]: number };
    title?: string;
    badge?: string;
    unlocks?: string[]; // Unlock new content
    cosmetic?: string; // Cosmetic rewards
  };
  
  // Display
  icon: string;
  color: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  points: number; // Achievement points
  
  // Meta
  hidden: boolean; // Hidden until unlocked
  dateAdded: Date;
  prerequisite?: string[]; // Other achievement IDs required
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: Date;
  progress: { [key: string]: number }; // Track progress toward requirements
  isCompleted: boolean;
}

export interface SkillCape {
  skillName: string;
  name: string;
  description: string;
  requirements: {
    level: number;
    skill: string;
  };
  benefits: string[];
  appearance: {
    color: string;
    pattern: string;
    icon: string;
  };
  emote: string; // Special emote for cape
  trimmed: boolean; // Trimmed version for multiple 99s
}

export interface Milestone {
  level: number;
  skill: string;
  name: string;
  description: string;
  rewards: {
    title?: string;
    xpBonus?: number; // Temporary XP bonus
    duration?: number; // Duration of bonus in hours
    unlocks?: string[];
    badge?: string;
  };
  celebration: {
    message: string;
    effects: string[]; // Visual effects
    sound?: string;
  };
}

export interface Title {
  id: string;
  name: string;
  description: string;
  color: string;
  requirements: Achievement['requirements'];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  prefix?: boolean; // Whether title goes before or after name
}