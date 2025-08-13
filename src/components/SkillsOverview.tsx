import React from 'react';
import styled from 'styled-components';
import { RuneScapeSkill } from '../types/user';
import { getLevelFromXP, getXPForLevel, getLevelProgress } from '../utils/xpCalculation';

interface SkillsOverviewProps {
  skills: RuneScapeSkill[];
  title?: string;
  showExperience?: boolean;
}

const Container = styled.div`
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  padding: 1.5rem;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
`;

const Title = styled.h3`
  text-align: center;
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SkillCard = styled.div`
  background: rgba(0,0,0,0.3);
  border: 2px solid #8b4513;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ffd700;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.h4`
  color: #ffd700;
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const SkillLevel = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f4e4bc;
  margin-bottom: 0.5rem;
`;

const ExperienceBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0,0,0,0.5);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ExperienceProgress = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #228b22, #32cd32);
  transition: width 0.3s ease;
`;

const ExperienceText = styled.div`
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 0.25rem;
`;

const TotalLevel = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid #ffd700;
  border-radius: 10px;
`;

const TotalLevelText = styled.div`
  font-size: 1.2rem;
  color: #ffd700;
  font-weight: bold;
`;

const SkillsOverview: React.FC<SkillsOverviewProps> = ({ 
  skills, 
  title = "Your Skills", 
  showExperience = true 
}) => {
  const totalLevel = skills.reduce((sum, skill) => sum + getLevelFromXP(skill.experience), 0);
  const totalExperience = skills.reduce((sum, skill) => sum + skill.experience, 0);

  return (
    <Container>
      <Title>{title}</Title>
      
      <SkillsGrid>
        {skills.map((skill, index) => {
          const levelProgress = getLevelProgress(skill.experience);
          
          return (
            <SkillCard key={index}>
              <SkillIcon>{skill.icon}</SkillIcon>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel>Level {levelProgress.currentLevel}</SkillLevel>
              
              {showExperience && (
                <>
                  <ExperienceBar>
                    <ExperienceProgress progress={levelProgress.progressPercent} />
                  </ExperienceBar>
                  <ExperienceText>
                    {skill.experience.toLocaleString()} XP
                    {levelProgress.currentLevel < 99 && (
                      <div style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '0.25rem' }}>
                        {levelProgress.xpNeededForNext.toLocaleString()} XP to level {levelProgress.currentLevel + 1}
                      </div>
                    )}
                  </ExperienceText>
                </>
              )}
            </SkillCard>
          );
        })}
      </SkillsGrid>

      <TotalLevel>
        <TotalLevelText>
          Total Level: {totalLevel} | Total XP: {totalExperience.toLocaleString()}
        </TotalLevelText>
      </TotalLevel>
    </Container>
  );
};

export default SkillsOverview;