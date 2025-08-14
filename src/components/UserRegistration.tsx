import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CharacterCreation from './CharacterCreation';
import FitnessAssessment from './FitnessAssessment';
import GoalSetting from './GoalSetting';
import TutorialIsland from './TutorialIsland';
import SkillsOverview from './SkillsOverview';
import { User, UserRegistrationData, Avatar, FitnessAssessment as FitnessAssessmentType, FitnessGoal } from '../types/user';
import { createInitialSkills } from '../data/skills';

interface UserRegistrationProps {
  onComplete: (user: User) => void;
}

type RegistrationStep = 'account' | 'character' | 'assessment' | 'goals' | 'tutorial' | 'complete';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 2rem;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0,0,0,0.3);
  border-radius: 15px;
  max-width: 800px;
  margin: 0 auto 2rem auto;
`;

const StepItem = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 10px;
  background: ${props => 
    props.isActive ? 'rgba(255, 215, 0, 0.3)' : 
    props.isCompleted ? 'rgba(34, 139, 34, 0.3)' : 
    'rgba(139, 69, 19, 0.3)'
  };
  border: 2px solid ${props => 
    props.isActive ? '#ffd700' : 
    props.isCompleted ? '#32cd32' : 
    '#8b4513'
  };
  color: #f4e4bc;
  font-weight: bold;
  transition: all 0.3s ease;
`;

const StepNumber = styled.span<{ isActive: boolean; isCompleted: boolean }>`
  background: ${props => 
    props.isActive ? '#ffd700' : 
    props.isCompleted ? '#32cd32' : 
    '#8b4513'
  };
  color: ${props => 
    props.isActive || props.isCompleted ? '#000' : '#f4e4bc'
  };
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
`;

const AccountForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #ffd700;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #f4e4bc;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #8b4513;
  border-radius: 8px;
  background: rgba(0,0,0,0.3);
  color: #f4e4bc;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ffd700;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, #8b4513, #cd853f);
  color: #f4e4bc;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: linear-gradient(45deg, #a0522d, #daa520);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const WelcomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
  text-align: center;
`;

interface AccountFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  displayName: string;
}

const accountSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password')], 'Passwords must match'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
  displayName: yup.string().required('Display name is required').min(2, 'Display name must be at least 2 characters').max(30, 'Display name must be less than 30 characters')
});

const STEPS = [
  { key: 'account', label: 'Account', number: 1 },
  { key: 'character', label: 'Character', number: 2 },
  { key: 'assessment', label: 'Assessment', number: 3 },
  { key: 'goals', label: 'Goals', number: 4 },
  { key: 'tutorial', label: 'Tutorial', number: 5 },
  { key: 'complete', label: 'Complete', number: 6 }
];

const UserRegistration: React.FC<UserRegistrationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('account');
  const [registrationData, setRegistrationData] = useState<Partial<UserRegistrationData>>({});
  const [completedSteps, setCompletedSteps] = useState<RegistrationStep[]>([]);

  const { control, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
    resolver: yupResolver(accountSchema)
  });

  const markStepCompleted = (step: RegistrationStep) => {
    setCompletedSteps(prev => prev.includes(step) ? prev : [...prev, step]);
  };

  const handleAccountSubmit = (data: AccountFormData) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    markStepCompleted('account');
    setCurrentStep('character');
  };

  const handleCharacterComplete = (avatar: Avatar) => {
    setRegistrationData(prev => ({ ...prev, avatar }));
    markStepCompleted('character');
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = (assessment: FitnessAssessmentType) => {
    setRegistrationData(prev => ({ ...prev, fitnessAssessment: assessment }));
    markStepCompleted('assessment');
    setCurrentStep('goals');
  };

  const handleGoalsComplete = (goals: FitnessGoal[]) => {
    setRegistrationData(prev => ({ ...prev, initialGoals: goals }));
    markStepCompleted('goals');
    setCurrentStep('tutorial');
  };

  const handleTutorialComplete = () => {
    markStepCompleted('tutorial');
    setCurrentStep('complete');
    
    const newUser: User = {
      id: Date.now().toString(),
      email: registrationData.email!,
      username: registrationData.username!,
      displayName: registrationData.displayName!,
      avatar: registrationData.avatar!,
      skills: createInitialSkills(),
      level: 1,
      totalExperience: 0,
      fitnessAssessment: registrationData.fitnessAssessment,
      goals: registrationData.initialGoals || [],
      createdAt: new Date(),
      lastActive: new Date(),
      tutorialCompleted: true
    };
    
    setTimeout(() => {
      onComplete(newUser);
    }, 3000);
  };

  const renderStepIndicator = () => (
    <StepIndicator>
      {STEPS.map(step => (
        <StepItem
          key={step.key}
          isActive={currentStep === step.key}
          isCompleted={completedSteps.includes(step.key as RegistrationStep)}
        >
          <StepNumber
            isActive={currentStep === step.key}
            isCompleted={completedSteps.includes(step.key as RegistrationStep)}
          >
            {completedSteps.includes(step.key as RegistrationStep) ? '✓' : step.number}
          </StepNumber>
          <StepLabel>{step.label}</StepLabel>
        </StepItem>
      ))}
    </StepIndicator>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'account':
        return (
          <AccountForm onSubmit={handleSubmit(handleAccountSubmit)}>
            <Title>Create Your Account</Title>
            
            <FormGroup>
              <Label>Email Address</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} type="email" placeholder="adventurer@example.com" />}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Username</Label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Choose a unique username" />}
              />
              {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Display Name</Label>
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => <Input {...field} placeholder="How others will see you" />}
              />
              {errors.displayName && <ErrorMessage>{errors.displayName.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input {...field} type="password" placeholder="Create a strong password" />}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password</Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => <Input {...field} type="password" placeholder="Confirm your password" />}
              />
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
            </FormGroup>

            <ActionButton type="submit">
              Create Account & Continue →
            </ActionButton>
          </AccountForm>
        );

      case 'character':
        return (
          <CharacterCreation
            onComplete={handleCharacterComplete}
            onBack={() => setCurrentStep('account')}
          />
        );

      case 'assessment':
        return (
          <FitnessAssessment
            onComplete={handleAssessmentComplete}
            onBack={() => setCurrentStep('character')}
          />
        );

      case 'goals':
        return (
          <GoalSetting
            onComplete={handleGoalsComplete}
            onBack={() => setCurrentStep('assessment')}
          />
        );

      case 'tutorial':
        const tempUser: User = {
          id: 'temp',
          email: registrationData.email!,
          username: registrationData.username!,
          displayName: registrationData.displayName!,
          avatar: registrationData.avatar!,
          skills: createInitialSkills(),
          level: 1,
          totalExperience: 0,
          fitnessAssessment: registrationData.fitnessAssessment,
          goals: registrationData.initialGoals || [],
          createdAt: new Date(),
          lastActive: new Date(),
          tutorialCompleted: false
        };

        return (
          <TutorialIsland
            user={tempUser}
            onComplete={handleTutorialComplete}
          />
        );

      case 'complete':
        return (
          <WelcomeContainer>
            <Title>🎉 Welcome to Fitness Realm! 🎉</Title>
            <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
              Congratulations, {registrationData.displayName}! Your character has been created and your adventure begins now.
            </p>
            <div style={{ margin: '2rem 0' }}>
              <SkillsOverview 
                skills={createInitialSkills()} 
                title="Your Starting Skills"
                showExperience={false}
              />
            </div>
            <p style={{ fontSize: '1rem', color: '#ccc' }}>
              Redirecting you to the main application...
            </p>
          </WelcomeContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      {renderStepIndicator()}
      {renderCurrentStep()}
    </Container>
  );
};

export default UserRegistration;