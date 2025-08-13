import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from '../types/user';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  instruction: string;
  action: string;
  reward?: {
    skill: string;
    experience: number;
  };
}

interface TutorialIslandProps {
  user: User;
  onComplete: () => void;
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
  min-height: 500px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #f4e4bc;
  margin: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(0,0,0,0.3);
  border-radius: 5px;
  margin: 1rem 0;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  transition: width 0.5s ease;
`;

const StepContainer = styled.div`
  background: rgba(0,0,0,0.3);
  border: 2px solid #8b4513;
  border-radius: 15px;
  padding: 2rem;
  margin: 1rem 0;
`;

const StepTitle = styled.h2`
  color: #ffd700;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Instruction = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #ffd700;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  font-weight: bold;
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, #8b4513, #cd853f);
  color: #f4e4bc;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1rem 0;
  
  &:hover {
    background: linear-gradient(45deg, #a0522d, #daa520);
    transform: translateY(-2px);
  }
`;

const RewardBox = styled.div`
  background: rgba(34, 139, 34, 0.2);
  border: 2px solid #32cd32;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
`;

const CompletionMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid #ffd700;
  border-radius: 15px;
`;

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Fitness Realm!",
    description: "Welcome, brave adventurer! You've just begun your epic fitness journey. In this realm, you'll train various skills to become the ultimate fitness champion.",
    instruction: "Click the button below to learn about your character stats.",
    action: "View My Stats",
    reward: { skill: "Tutorial", experience: 10 }
  },
  {
    id: 2,
    title: "Understanding Your Skills",
    description: "Your character has 10 different fitness skills, each starting at level 1. As you complete workouts and activities, you'll gain experience points (XP) to level up these skills.",
    instruction: "The skills include Strength, Cardio, Flexibility, and more. Each skill represents a different aspect of fitness.",
    action: "Learn More",
    reward: { skill: "Mindfulness", experience: 25 }
  },
  {
    id: 3,
    title: "Setting Your Goals",
    description: "Every great adventurer needs a quest! Goals in Fitness Realm are like quests - they give you direction and purpose in your training.",
    instruction: "You can set goals for weight loss, muscle gain, running distances, and much more.",
    action: "Understand Goals",
    reward: { skill: "Nutrition", experience: 20 }
  },
  {
    id: 4,
    title: "Tracking Your Progress",
    description: "Your journey will be tracked through workouts, measurements, and achievements. Each activity you complete will reward you with XP in relevant skills.",
    instruction: "Regular logging of workouts and progress photos will help you see your transformation.",
    action: "Got It!",
    reward: { skill: "Recovery", experience: 15 }
  },
  {
    id: 5,
    title: "Community & Competition",
    description: "Join other adventurers in challenges, share progress, and compete on leaderboards. The fitness realm is more fun with friends!",
    instruction: "You can add friends, join guilds, and participate in seasonal events.",
    action: "Join the Adventure",
    reward: { skill: "Endurance", experience: 30 }
  }
];

const TutorialIsland: React.FC<TutorialIslandProps> = ({ user, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = () => {
    const step = TUTORIAL_STEPS[currentStep];
    setCompletedSteps(prev => [...prev, step.id]);
    
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const progress = ((completedSteps.length) / TUTORIAL_STEPS.length) * 100;
  const isComplete = completedSteps.length === TUTORIAL_STEPS.length;

  if (isComplete) {
    return (
      <Container>
        <CompletionMessage>
          <Title>🎉 Tutorial Complete! 🎉</Title>
          <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
            Congratulations, {user.displayName}! You've successfully completed your training on Tutorial Island.
          </p>
          <p style={{ margin: '1rem 0' }}>
            You've gained valuable knowledge about:
          </p>
          <ul style={{ textAlign: 'left', display: 'inline-block', margin: '1rem 0' }}>
            <li>Understanding your fitness skills and progression</li>
            <li>Setting and tracking meaningful goals</li>
            <li>How workouts translate to experience points</li>
            <li>The importance of community in your fitness journey</li>
          </ul>
          <p style={{ fontSize: '1.1rem', margin: '1.5rem 0' }}>
            Your adventure in the Fitness Realm begins now!
          </p>
          <ActionButton onClick={onComplete}>
            Enter the Fitness Realm! ⚔️
          </ActionButton>
        </CompletionMessage>
      </Container>
    );
  }

  const currentTutorialStep = TUTORIAL_STEPS[currentStep];

  return (
    <Container>
      <Header>
        <Title>Tutorial Island</Title>
        <Subtitle>Learn the ways of the Fitness Realm</Subtitle>
        <ProgressBar>
          <Progress progress={progress} />
        </ProgressBar>
        <p>Step {currentStep + 1} of {TUTORIAL_STEPS.length}</p>
      </Header>

      <StepContainer>
        <StepTitle>{currentTutorialStep.title}</StepTitle>
        <StepDescription>{currentTutorialStep.description}</StepDescription>
        
        <Instruction>
          📖 {currentTutorialStep.instruction}
        </Instruction>

        {currentTutorialStep.reward && (
          <RewardBox>
            <strong>🎁 Reward:</strong> +{currentTutorialStep.reward.experience} {currentTutorialStep.reward.skill} XP
          </RewardBox>
        )}

        <ActionButton onClick={handleStepComplete}>
          {currentTutorialStep.action}
        </ActionButton>
      </StepContainer>
    </Container>
  );
};

export default TutorialIsland;