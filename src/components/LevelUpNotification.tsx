import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Milestone } from '../types/achievements';
import { getSkillCape, getMilestoneByLevel } from '../data/achievements';

interface LevelUpNotificationProps {
  skill: string;
  oldLevel: number;
  newLevel: number;
  xpGained: number;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const slideIn = keyframes`
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6); }
`;

const levelUpPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: ${slideIn} 0.8s ease-out;
`;

const NotificationCard = styled.div`
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 50%, #ffd700 100%);
  border: 3px solid #ffd700;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
  position: relative;
  max-width: 500px;
  animation: ${glow} 2s ease-in-out infinite, ${levelUpPulse} 1s ease-in-out;
  overflow: hidden;
`;

const Sparkles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Sparkle = styled.div<{ delay: number; x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: 20px;
  height: 20px;
  background: #ffd700;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  animation: ${sparkle} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const LevelUpText = styled.h1`
  font-size: 3rem;
  color: #ffd700;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.7);
  font-weight: bold;
`;

const SkillName = styled.h2`
  font-size: 2rem;
  color: #f4e4bc;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const LevelDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
`;

const LevelNumber = styled.div<{ isNew?: boolean }>`
  font-size: 4rem;
  font-weight: bold;
  color: ${props => props.isNew ? '#ffd700' : '#ccc'};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  ${props => props.isNew && `
    animation: ${levelUpPulse} 1s ease-in-out infinite;
  `}
`;

const Arrow = styled.div`
  font-size: 3rem;
  color: #ffd700;
  animation: ${levelUpPulse} 1.5s ease-in-out infinite;
`;

const XPGained = styled.div`
  font-size: 1.2rem;
  color: #32cd32;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const MilestoneInfo = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid #ffd700;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1.5rem 0;
`;

const MilestoneTitle = styled.h3`
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const MilestoneDescription = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const RewardsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const RewardItem = styled.li`
  padding: 0.5rem 0;
  font-size: 1rem;
  
  &::before {
    content: '🎁 ';
    margin-right: 0.5rem;
  }
`;

const CapeInfo = styled.div`
  background: linear-gradient(45deg, #8b0000, #dc3545);
  border: 2px solid #ffd700;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1.5rem 0;
`;

const CapeTitle = styled.h3`
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #8b4513, #cd853f);
  border: none;
  border-radius: 10px;
  color: #f4e4bc;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #a0522d, #daa520);
    transform: translateY(-2px);
  }
`;

const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({
  skill,
  oldLevel,
  newLevel,
  xpGained,
  onClose,
  autoClose = true,
  duration = 8000
}) => {
  const [sparklePositions] = useState(() => 
    Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2
    }))
  );

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  useEffect(() => {
    // Play level up sound effect
    const audio = new Audio('/sounds/level-up.mp3');
    audio.play().catch(() => {
      // Ignore if sound fails to play
    });
  }, []);

  const milestone = getMilestoneByLevel(newLevel);
  const skillCape = newLevel === 99 ? getSkillCape(skill) : null;

  return (
    <Overlay onClick={onClose}>
      <NotificationCard onClick={(e) => e.stopPropagation()}>
        <Sparkles>
          {sparklePositions.map((pos, index) => (
            <Sparkle
              key={index}
              x={pos.x}
              y={pos.y}
              delay={pos.delay}
            />
          ))}
        </Sparkles>

        <LevelUpText>LEVEL UP!</LevelUpText>
        <SkillName>{skill}</SkillName>
        
        <LevelDisplay>
          <LevelNumber>{oldLevel}</LevelNumber>
          <Arrow>→</Arrow>
          <LevelNumber isNew>{newLevel}</LevelNumber>
        </LevelDisplay>

        <XPGained>+{xpGained.toLocaleString()} XP gained!</XPGained>

        {milestone && (
          <MilestoneInfo>
            <MilestoneTitle>🎉 {milestone.name}</MilestoneTitle>
            <MilestoneDescription>{milestone.description}</MilestoneDescription>
            {milestone.rewards && (
              <RewardsList>
                {milestone.rewards.title && (
                  <RewardItem>New title unlocked: "{milestone.rewards.title}"</RewardItem>
                )}
                {milestone.rewards.xpBonus && (
                  <RewardItem>
                    {Math.round((milestone.rewards.xpBonus - 1) * 100)}% XP bonus for {milestone.rewards.duration} hours!
                  </RewardItem>
                )}
                {milestone.rewards.badge && (
                  <RewardItem>New badge earned: {milestone.rewards.badge}</RewardItem>
                )}
                {milestone.rewards.unlocks && milestone.rewards.unlocks.map(unlock => (
                  <RewardItem key={unlock}>Unlocked: {unlock}</RewardItem>
                ))}
              </RewardsList>
            )}
          </MilestoneInfo>
        )}

        {skillCape && (
          <CapeInfo>
            <CapeTitle>🎖️ SKILL CAPE UNLOCKED! 🎖️</CapeTitle>
            <h4 style={{ color: skillCape.appearance.color, margin: '1rem 0' }}>
              {skillCape.appearance.icon} {skillCape.name}
            </h4>
            <p style={{ marginBottom: '1rem' }}>{skillCape.description}</p>
            <RewardsList>
              {skillCape.benefits.map((benefit, index) => (
                <RewardItem key={index}>{benefit}</RewardItem>
              ))}
            </RewardsList>
            <p style={{ fontStyle: 'italic', color: '#ffd700' }}>
              Special emote unlocked: {skillCape.emote}
            </p>
          </CapeInfo>
        )}

        <CloseButton onClick={onClose}>
          Continue Your Journey
        </CloseButton>
      </NotificationCard>
    </Overlay>
  );
};

export default LevelUpNotification;