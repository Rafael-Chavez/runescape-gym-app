import { RuneScapeSkill } from '../types/user';

export const RUNESCAPE_SKILLS: Omit<RuneScapeSkill, 'level' | 'experience'>[] = [
  { name: 'Strength', icon: '💪' },
  { name: 'Cardio', icon: '🏃' },
  { name: 'Flexibility', icon: '🧘' },
  { name: 'Endurance', icon: '⚡' },
  { name: 'Balance', icon: '⚖️' },
  { name: 'Agility', icon: '🤸' },
  { name: 'Nutrition', icon: '🥗' },
  { name: 'Recovery', icon: '😴' },
  { name: 'Mindfulness', icon: '🧠' },
  { name: 'Coordination', icon: '🎯' }
];

export const createInitialSkills = (): RuneScapeSkill[] => {
  return RUNESCAPE_SKILLS.map(skill => ({
    ...skill,
    level: 1,
    experience: 0
  }));
};

export const calculateLevelFromExperience = (experience: number): number => {
  if (experience < 83) return 1;
  
  let level = 1;
  let totalExp = 0;
  
  while (totalExp <= experience && level < 99) {
    level++;
    totalExp += Math.floor(level + 300 * Math.pow(2, level / 7)) / 4;
  }
  
  return Math.min(level - 1, 99);
};

export const getExperienceForLevel = (level: number): number => {
  if (level <= 1) return 0;
  
  let totalExp = 0;
  for (let i = 1; i < level; i++) {
    totalExp += Math.floor(i + 300 * Math.pow(2, i / 7)) / 4;
  }
  
  return Math.floor(totalExp);
};