import { Achievement, SkillCape, Milestone, Title } from '../types/achievements';

export const ACHIEVEMENTS: Achievement[] = [
  // Milestone Achievements
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first workout in the Fitness Realm',
    category: 'milestone',
    difficulty: 'easy',
    requirements: [
      {
        type: 'workouts',
        value: 1,
        operator: '>=',
        description: 'Complete 1 workout'
      }
    ],
    rewards: {
      xp: { 'mindfulness': 100 },
      title: 'Novice',
      badge: 'first_workout'
    },
    icon: '🦶',
    color: '#28a745',
    rarity: 'common',
    points: 10,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'dedicated_trainee',
    name: 'Dedicated Trainee',
    description: 'Train for 7 consecutive days',
    category: 'consistency',
    difficulty: 'medium',
    requirements: [
      {
        type: 'streak',
        value: 7,
        operator: '>=',
        description: 'Maintain 7-day workout streak'
      }
    ],
    rewards: {
      xp: { 'mindfulness': 500 },
      title: 'Dedicated',
      badge: 'week_streak'
    },
    icon: '🔥',
    color: '#fd7e14',
    rarity: 'uncommon',
    points: 25,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'iron_will',
    name: 'Iron Will',
    description: 'Train for 30 consecutive days',
    category: 'consistency',
    difficulty: 'hard',
    requirements: [
      {
        type: 'streak',
        value: 30,
        operator: '>=',
        description: 'Maintain 30-day workout streak'
      }
    ],
    rewards: {
      xp: { 'mindfulness': 2000, 'endurance': 1000 },
      title: 'Iron Willed',
      badge: 'month_streak'
    },
    icon: '🛡️',
    color: '#6c757d',
    rarity: 'rare',
    points: 100,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'unstoppable_force',
    name: 'Unstoppable Force',
    description: 'Train for 100 consecutive days',
    category: 'consistency',
    difficulty: 'elite',
    requirements: [
      {
        type: 'streak',
        value: 100,
        operator: '>=',
        description: 'Maintain 100-day workout streak'
      }
    ],
    rewards: {
      xp: { 'mindfulness': 5000, 'endurance': 3000, 'strength': 2000 },
      title: 'Unstoppable',
      badge: 'century_streak',
      cosmetic: 'golden_aura'
    },
    icon: '⚡',
    color: '#ffd700',
    rarity: 'legendary',
    points: 500,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  // Strength Achievements
  {
    id: 'strength_novice',
    name: 'Strength Novice',
    description: 'Reach level 10 in Strength',
    category: 'milestone',
    difficulty: 'easy',
    requirements: [
      {
        type: 'level',
        skill: 'strength',
        value: 10,
        operator: '>=',
        description: 'Reach level 10 Strength'
      }
    ],
    rewards: {
      xp: { 'strength': 200 },
      badge: 'strength_10'
    },
    icon: '💪',
    color: '#dc3545',
    rarity: 'common',
    points: 15,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'heavy_lifter',
    name: 'Heavy Lifter',
    description: 'Deadlift your bodyweight',
    category: 'strength',
    difficulty: 'medium',
    requirements: [
      {
        type: 'custom',
        value: 1,
        operator: '>=',
        description: 'Deadlift weight >= bodyweight'
      }
    ],
    rewards: {
      xp: { 'strength': 1000 },
      title: 'Heavy Lifter',
      badge: 'bodyweight_deadlift'
    },
    icon: '🏋️',
    color: '#495057',
    rarity: 'uncommon',
    points: 50,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'beast_mode',
    name: 'Beast Mode',
    description: 'Deadlift 2x your bodyweight',
    category: 'strength',
    difficulty: 'elite',
    requirements: [
      {
        type: 'custom',
        value: 2,
        operator: '>=',
        description: 'Deadlift weight >= 2x bodyweight'
      }
    ],
    rewards: {
      xp: { 'strength': 5000 },
      title: 'Beast',
      badge: 'double_bodyweight',
      cosmetic: 'strength_aura'
    },
    icon: '🦍',
    color: '#8b0000',
    rarity: 'epic',
    points: 250,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  // Cardio Achievements
  {
    id: 'runner',
    name: 'Runner',
    description: 'Run a total of 26.2 miles (marathon distance)',
    category: 'endurance',
    difficulty: 'medium',
    requirements: [
      {
        type: 'distance',
        value: 26.2,
        operator: '>=',
        description: 'Run cumulative 26.2 miles'
      }
    ],
    rewards: {
      xp: { 'cardio': 2620 },
      title: 'Marathoner',
      badge: 'marathon_distance'
    },
    icon: '🏃',
    color: '#007bff',
    rarity: 'uncommon',
    points: 75,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'ultramarathoner',
    name: 'Ultramarathoner',
    description: 'Run a total of 100 miles',
    category: 'endurance',
    difficulty: 'elite',
    requirements: [
      {
        type: 'distance',
        value: 100,
        operator: '>=',
        description: 'Run cumulative 100 miles'
      }
    ],
    rewards: {
      xp: { 'cardio': 10000, 'endurance': 5000 },
      title: 'Ultra',
      badge: 'ultra_runner',
      cosmetic: 'speed_trail'
    },
    icon: '💨',
    color: '#17a2b8',
    rarity: 'epic',
    points: 300,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  // Master Achievements
  {
    id: 'jack_of_all_trades',
    name: 'Jack of All Trades',
    description: 'Reach level 50 in all skills',
    category: 'mastery',
    difficulty: 'master',
    requirements: [
      {
        type: 'custom',
        value: 50,
        operator: '>=',
        description: 'All skills level 50+'
      }
    ],
    rewards: {
      xp: { 'strength': 5000, 'cardio': 5000, 'flexibility': 5000, 'endurance': 5000, 'balance': 5000, 'agility': 5000, 'coordination': 5000, 'recovery': 5000, 'mindfulness': 5000, 'nutrition': 5000 },
      title: 'Master of All',
      badge: 'jack_of_trades',
      cosmetic: 'rainbow_aura'
    },
    icon: '🌟',
    color: '#6f42c1',
    rarity: 'legendary',
    points: 1000,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'maxed_account',
    name: 'Maxed Account',
    description: 'Reach level 99 in all skills',
    category: 'mastery',
    difficulty: 'master',
    requirements: [
      {
        type: 'custom',
        value: 99,
        operator: '>=',
        description: 'All skills level 99'
      }
    ],
    rewards: {
      title: 'Maxed',
      badge: 'maxed_account',
      cosmetic: 'max_cape',
      unlocks: ['max_guild_access']
    },
    icon: '👑',
    color: '#ffd700',
    rarity: 'legendary',
    points: 5000,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  // Special Achievements
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete 10 workouts before 7 AM',
    category: 'special',
    difficulty: 'medium',
    requirements: [
      {
        type: 'custom',
        value: 10,
        operator: '>=',
        description: 'Complete 10 early morning workouts'
      }
    ],
    rewards: {
      xp: { 'mindfulness': 1000 },
      title: 'Early Bird',
      badge: 'morning_warrior'
    },
    icon: '🌅',
    color: '#ff6b6b',
    rarity: 'uncommon',
    points: 40,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  },

  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Complete 10 workouts after 9 PM',
    category: 'special',
    difficulty: 'medium',
    requirements: [
      {
        type: 'custom',
        value: 10,
        operator: '>=',
        description: 'Complete 10 late night workouts'
      }
    ],
    rewards: {
      xp: { 'mindfulness': 1000 },
      title: 'Night Owl',
      badge: 'night_warrior'
    },
    icon: '🦉',
    color: '#4834d4',
    rarity: 'uncommon',
    points: 40,
    hidden: false,
    dateAdded: new Date('2025-01-01')
  }
];

export const SKILL_CAPES: SkillCape[] = [
  {
    skillName: 'strength',
    name: 'Strength Cape',
    description: 'A cape worn by those who have mastered the art of strength training.',
    requirements: {
      level: 99,
      skill: 'strength'
    },
    benefits: [
      '+10% XP gain for Strength exercises',
      'Unlimited gym access emote',
      'Respected by all gym-goers'
    ],
    appearance: {
      color: '#dc3545',
      pattern: 'muscle_fibers',
      icon: '💪'
    },
    emote: 'Flexing Pose',
    trimmed: false
  },

  {
    skillName: 'cardio',
    name: 'Cardio Cape',
    description: 'A lightweight cape for cardiovascular masters.',
    requirements: {
      level: 99,
      skill: 'cardio'
    },
    benefits: [
      '+10% XP gain for Cardio exercises',
      'Never get out of breath emote',
      'Can run indefinitely in style'
    ],
    appearance: {
      color: '#007bff',
      pattern: 'wind_streams',
      icon: '🏃'
    },
    emote: 'Endless Running',
    trimmed: false
  },

  {
    skillName: 'flexibility',
    name: 'Flexibility Cape',
    description: 'A flowing cape that moves with perfect grace.',
    requirements: {
      level: 99,
      skill: 'flexibility'
    },
    benefits: [
      '+10% XP gain for Flexibility exercises',
      'Perfect split emote',
      'Immunity to muscle stiffness'
    ],
    appearance: {
      color: '#28a745',
      pattern: 'flowing_waves',
      icon: '🧘'
    },
    emote: 'Perfect Split',
    trimmed: false
  },

  {
    skillName: 'endurance',
    name: 'Endurance Cape',
    description: 'A durable cape for those with unlimited stamina.',
    requirements: {
      level: 99,
      skill: 'endurance'
    },
    benefits: [
      '+10% XP gain for Endurance exercises',
      'Infinite plank emote',
      'Never need rest between sets'
    ],
    appearance: {
      color: '#ffc107',
      pattern: 'lightning_bolts',
      icon: '⚡'
    },
    emote: 'Infinite Plank',
    trimmed: false
  },

  {
    skillName: 'balance',
    name: 'Balance Cape',
    description: 'A perfectly balanced cape that never falls.',
    requirements: {
      level: 99,
      skill: 'balance'
    },
    benefits: [
      '+10% XP gain for Balance exercises',
      'One-handed handstand emote',
      'Perfect balance in all activities'
    ],
    appearance: {
      color: '#6f42c1',
      pattern: 'yin_yang',
      icon: '⚖️'
    },
    emote: 'One-Handed Handstand',
    trimmed: false
  },

  {
    skillName: 'agility',
    name: 'Agility Cape',
    description: 'A cape for the quickest and most agile athletes.',
    requirements: {
      level: 99,
      skill: 'agility'
    },
    benefits: [
      '+10% XP gain for Agility exercises',
      'Parkour flip emote',
      'Move with cat-like reflexes'
    ],
    appearance: {
      color: '#fd7e14',
      pattern: 'speed_lines',
      icon: '🤸'
    },
    emote: 'Parkour Flip',
    trimmed: false
  },

  {
    skillName: 'coordination',
    name: 'Coordination Cape',
    description: 'A cape that moves in perfect harmony with its wearer.',
    requirements: {
      level: 99,
      skill: 'coordination'
    },
    benefits: [
      '+10% XP gain for Coordination exercises',
      'Perfect juggling emote',
      'Flawless movement coordination'
    ],
    appearance: {
      color: '#e83e8c',
      pattern: 'synchronized_circles',
      icon: '🎯'
    },
    emote: 'Perfect Juggling',
    trimmed: false
  },

  {
    skillName: 'recovery',
    name: 'Recovery Cape',
    description: 'A soothing cape that promotes healing and rest.',
    requirements: {
      level: 99,
      skill: 'recovery'
    },
    benefits: [
      '+10% XP gain for Recovery exercises',
      'Instant relaxation emote',
      'Accelerated muscle recovery'
    ],
    appearance: {
      color: '#20c997',
      pattern: 'healing_spirals',
      icon: '😴'
    },
    emote: 'Instant Zen',
    trimmed: false
  },

  {
    skillName: 'mindfulness',
    name: 'Mindfulness Cape',
    description: 'A serene cape that radiates inner peace.',
    requirements: {
      level: 99,
      skill: 'mindfulness'
    },
    benefits: [
      '+10% XP gain for Mindfulness exercises',
      'Levitation meditation emote',
      'Perfect mental clarity'
    ],
    appearance: {
      color: '#6f42c1',
      pattern: 'meditation_mandalas',
      icon: '🧠'
    },
    emote: 'Levitation Meditation',
    trimmed: false
  },

  {
    skillName: 'nutrition',
    name: 'Nutrition Cape',
    description: 'A cape for masters of healthy eating and meal planning.',
    requirements: {
      level: 99,
      skill: 'nutrition'
    },
    benefits: [
      '+10% XP gain for Nutrition activities',
      'Perfect meal prep emote',
      'Immunity to junk food temptation'
    ],
    appearance: {
      color: '#28a745',
      pattern: 'fruit_vegetables',
      icon: '🥗'
    },
    emote: 'Perfect Meal Prep',
    trimmed: false
  }
];

export const MILESTONES: Milestone[] = [
  // Level 10 milestones
  {
    level: 10,
    skill: 'any',
    name: 'Novice Achievement',
    description: 'You\'ve proven your dedication to improvement!',
    rewards: {
      title: 'Novice',
      badge: 'novice_badge'
    },
    celebration: {
      message: 'Congratulations! You\'ve reached level 10 in {skill}!',
      effects: ['sparkles', 'level_up_sound'],
      sound: 'level_up'
    }
  },
  
  {
    level: 25,
    skill: 'any',
    name: 'Adept Achievement',
    description: 'Your skills are becoming impressive!',
    rewards: {
      title: 'Adept',
      xpBonus: 1.1,
      duration: 24,
      badge: 'adept_badge'
    },
    celebration: {
      message: 'Amazing! You\'ve reached level 25 in {skill}! Enjoy 10% bonus XP for 24 hours!',
      effects: ['golden_sparkles', 'fanfare'],
      sound: 'milestone_25'
    }
  },

  {
    level: 50,
    skill: 'any',
    name: 'Expert Achievement',
    description: 'You\'re now among the elite practitioners!',
    rewards: {
      title: 'Expert',
      xpBonus: 1.15,
      duration: 48,
      badge: 'expert_badge'
    },
    celebration: {
      message: 'Incredible! You\'ve reached level 50 in {skill}! Enjoy 15% bonus XP for 48 hours!',
      effects: ['rainbow_sparkles', 'trumpet_fanfare'],
      sound: 'milestone_50'
    }
  },

  {
    level: 75,
    skill: 'any',
    name: 'Master Achievement',
    description: 'You\'ve achieved mastery few ever reach!',
    rewards: {
      title: 'Master',
      xpBonus: 1.2,
      duration: 72,
      badge: 'master_badge'
    },
    celebration: {
      message: 'Legendary! You\'ve reached level 75 in {skill}! Enjoy 20% bonus XP for 72 hours!',
      effects: ['epic_fireworks', 'victory_music'],
      sound: 'milestone_75'
    }
  },

  {
    level: 99,
    skill: 'any',
    name: 'Grandmaster Achievement',
    description: 'You have achieved the ultimate mastery!',
    rewards: {
      title: 'Grandmaster',
      unlocks: ['skill_cape_' + '{skill}'],
      badge: 'grandmaster_badge'
    },
    celebration: {
      message: 'LEGENDARY! You\'ve reached the maximum level 99 in {skill}! You\'ve earned the {skill} cape!',
      effects: ['legendary_explosion', 'cape_ceremony', 'global_announcement'],
      sound: 'level_99'
    }
  }
];

export const TITLES: Title[] = [
  {
    id: 'novice',
    name: 'Novice',
    description: 'A beginner on the path to fitness mastery',
    color: '#6c757d',
    requirements: [
      {
        type: 'level',
        skill: 'any',
        value: 10,
        operator: '>=',
        description: 'Reach level 10 in any skill'
      }
    ],
    rarity: 'common',
    prefix: false
  },

  {
    id: 'dedicated',
    name: 'the Dedicated',
    description: 'Earned through unwavering commitment',
    color: '#fd7e14',
    requirements: [
      {
        type: 'streak',
        value: 7,
        operator: '>=',
        description: 'Maintain 7-day workout streak'
      }
    ],
    rarity: 'uncommon',
    prefix: false
  },

  {
    id: 'beast',
    name: 'the Beast',
    description: 'Raw power personified',
    color: '#8b0000',
    requirements: [
      {
        type: 'custom',
        value: 2,
        operator: '>=',
        description: 'Deadlift 2x bodyweight'
      }
    ],
    rarity: 'epic',
    prefix: false
  },

  {
    id: 'maxed',
    name: 'the Maxed',
    description: 'Ultimate mastery of all skills',
    color: '#ffd700',
    requirements: [
      {
        type: 'custom',
        value: 99,
        operator: '>=',
        description: 'All skills level 99'
      }
    ],
    rarity: 'legendary',
    prefix: false
  }
];

// Helper functions
export const getAchievementsByCategory = (category: string) => {
  return ACHIEVEMENTS.filter(achievement => achievement.category === category);
};

export const getMilestoneByLevel = (level: number) => {
  return MILESTONES.find(milestone => milestone.level === level);
};

export const getSkillCape = (skillName: string) => {
  return SKILL_CAPES.find(cape => cape.skillName === skillName);
};

export const getTitleById = (id: string) => {
  return TITLES.find(title => title.id === id);
};