import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { XPCalculationResult } from '../utils/xpCalculation';

interface XPTrackerProps {
  xpGained: XPCalculationResult;
  skill: string;
  onComplete?: () => void;
  duration?: number;
}

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const xpPulse = keyframes`
  0% { transform: scale(1); color: #32cd32; }
  50% { transform: scale(1.1); color: #ffd700; }
  100% { transform: scale(1); color: #32cd32; }
`;

const Container = styled.div<{ isVisible: boolean; fadeOut: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border: 2px solid #ffd700;
  border-radius: 15px;
  padding: 1.5rem;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
  min-width: 300px;
  max-width: 400px;
  z-index: 1500;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  animation: ${props => 
    props.fadeOut ? fadeOut : slideUp
  } 0.5s ease-out;
  opacity: ${props => props.isVisible ? 1 : 0};
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkillName = styled.h3`
  color: #ffd700;
  margin: 0;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  
  &:hover {
    color: #ffd700;
  }
`;

const XPAmount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
  animation: ${xpPulse} 1s ease-in-out;
`;

const BreakdownContainer = styled.div`
  background: rgba(0,0,0,0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
`;

const BreakdownTitle = styled.h4`
  color: #ffd700;
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
`;

const BreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const BreakdownLabel = styled.div`
  color: #f4e4bc;
`;

const BreakdownValue = styled.div<{ isBonus?: boolean }>`
  color: ${props => props.isBonus ? '#32cd32' : '#ffd700'};
  font-weight: bold;
  text-align: right;
`;

const MultiplierContainer = styled.div`
  margin-top: 1rem;
`;

const MultiplierGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.25rem;
  font-size: 0.8rem;
`;

const MultiplierLabel = styled.div`
  color: #ccc;
`;

const MultiplierValue = styled.div<{ value: number }>`
  color: ${props => {
    if (props.value > 1.2) return '#32cd32';
    if (props.value > 1.0) return '#ffd700';
    if (props.value < 1.0) return '#ff6b6b';
    return '#f4e4bc';
  }};
  font-weight: bold;
  text-align: right;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(0,0,0,0.3);
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  background: linear-gradient(90deg, #32cd32, #ffd700);
  width: ${props => props.width}%;
  transition: width 2s ease-out;
`;

const XPTracker: React.FC<XPTrackerProps> = ({
  xpGained,
  skill,
  onComplete,
  duration = 4000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [duration, onComplete]);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 500);
  };

  const formatMultiplier = (value: number): string => {
    if (value === 1.0) return '1.00x';
    return `${value.toFixed(2)}x`;
  };

  return (
    <Container isVisible={isVisible} fadeOut={fadeOut}>
      <Header>
        <SkillName>{skill} XP</SkillName>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </Header>

      <XPAmount>+{xpGained.totalXP.toLocaleString()}</XPAmount>

      <BreakdownContainer>
        <BreakdownTitle>XP Breakdown</BreakdownTitle>
        <BreakdownGrid>
          <BreakdownLabel>Base XP:</BreakdownLabel>
          <BreakdownValue>{xpGained.baseXP.toLocaleString()}</BreakdownValue>
          
          <BreakdownLabel>Bonus XP:</BreakdownLabel>
          <BreakdownValue isBonus>+{xpGained.bonusXP.toLocaleString()}</BreakdownValue>
          
          <BreakdownLabel>Total XP:</BreakdownLabel>
          <BreakdownValue>{xpGained.totalXP.toLocaleString()}</BreakdownValue>
        </BreakdownGrid>

        <MultiplierContainer>
          <BreakdownTitle>Multipliers</BreakdownTitle>
          <MultiplierGrid>
            <MultiplierLabel>Duration:</MultiplierLabel>
            <MultiplierValue value={xpGained.multipliers.duration}>
              {formatMultiplier(xpGained.multipliers.duration)}
            </MultiplierValue>

            <MultiplierLabel>Intensity:</MultiplierLabel>
            <MultiplierValue value={xpGained.multipliers.intensity}>
              {formatMultiplier(xpGained.multipliers.intensity)}
            </MultiplierValue>

            <MultiplierLabel>Consistency:</MultiplierLabel>
            <MultiplierValue value={xpGained.multipliers.consistency}>
              {formatMultiplier(xpGained.multipliers.consistency)}
            </MultiplierValue>

            <MultiplierLabel>Form:</MultiplierLabel>
            <MultiplierValue value={xpGained.multipliers.form}>
              {formatMultiplier(xpGained.multipliers.form)}
            </MultiplierValue>

            <MultiplierLabel>Difficulty:</MultiplierLabel>
            <MultiplierValue value={xpGained.multipliers.difficulty}>
              {formatMultiplier(xpGained.multipliers.difficulty)}
            </MultiplierValue>
          </MultiplierGrid>
        </MultiplierContainer>
      </BreakdownContainer>

      <ProgressBar>
        <ProgressFill width={progress} />
      </ProgressBar>
    </Container>
  );
};

export default XPTracker;