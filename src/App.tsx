import React, { useState } from 'react';
import styled from 'styled-components';
import UserRegistration from './components/UserRegistration';
import SkillsOverview from './components/SkillsOverview';
import ExerciseBrowser from './components/ExerciseBrowser';
import ExerciseDetail from './components/ExerciseDetail';
import LevelUpNotification from './components/LevelUpNotification';
import XPTracker from './components/XPTracker';
import { User } from './types/user';
import { Exercise } from './types/exercise';
import { calculateSetXP, checkLevelUp, getLevelFromXP } from './utils/xpCalculation';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
`;

const MainApp = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  border: 2px solid #ffd700;
`;

const Title = styled.h1`
  color: #ffd700;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #f4e4bc;
  margin: 0;
`;

const UserInfo = styled.div`
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid #8b4513;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const UserStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background: rgba(0,0,0,0.3);
  border: 1px solid #8b4513;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`;

const StatLabel = styled.div`
  color: #ffd700;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  color: #f4e4bc;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0,0,0,0.3);
  border-radius: 15px;
  border: 1px solid #8b4513;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.isActive ? '#ffd700' : '#8b4513'};
  border-radius: 10px;
  background: ${props => props.isActive ? 'rgba(255, 215, 0, 0.2)' : 'rgba(139, 69, 19, 0.3)'};
  color: #f4e4bc;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ffd700;
    background: rgba(255, 215, 0, 0.1);
    transform: translateY(-2px);
  }
`;

type AppView = 'skills' | 'exercises' | 'workout' | 'progress';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('skills');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [levelUpData, setLevelUpData] = useState<{
    skill: string;
    oldLevel: number;
    newLevel: number;
    xpGained: number;
  } | null>(null);
  const [xpTrackerData, setXpTrackerData] = useState<{
    xpResult: any;
    skill: string;
  } | null>(null);

  const handleRegistrationComplete = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('fitnessRealmUser', JSON.stringify(user));
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('fitnessRealmUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('fitnessRealmUser');
      }
    }
  }, []);

  if (!currentUser) {
    return (
      <AppContainer>
        <UserRegistration onComplete={handleRegistrationComplete} />
      </AppContainer>
    );
  }

  const totalLevel = currentUser.skills.reduce((sum, skill) => sum + skill.level, 0);
  const averageLevel = (totalLevel / currentUser.skills.length).toFixed(1);

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleStartWorkout = (exercise: Exercise) => {
    console.log('Starting workout with:', exercise.name);
    // Simulate completing an exercise set for demonstration
    simulateExerciseCompletion(exercise);
  };

  const simulateExerciseCompletion = (exercise: Exercise) => {
    if (!currentUser) return;

    // Simulate exercise set data
    const mockSet = {
      exerciseId: exercise.id,
      reps: exercise.category === 'strength' ? 10 : undefined,
      weight: exercise.category === 'strength' ? 135 : undefined,
      duration: exercise.category === 'endurance' ? 60 : exercise.estimatedDurationMinutes * 60,
      distance: exercise.category === 'cardio' ? 2.5 : undefined
    };

    // Calculate XP gained
    const xpResult = calculateSetXP(exercise, mockSet, {
      intensity: 'vigorous',
      formQuality: 'good',
      streakDays: 5 // Mock streak
    });

    // Find the skill to update
    const skillIndex = currentUser.skills.findIndex(
      skill => skill.name.toLowerCase() === exercise.category
    );

    if (skillIndex === -1) return;

    const currentSkill = currentUser.skills[skillIndex];
    const oldLevel = getLevelFromXP(currentSkill.experience);
    const newExperience = currentSkill.experience + xpResult.totalXP;
    const levelUpInfo = checkLevelUp(currentSkill.experience, newExperience);

    // Update user's skill
    const updatedUser = {
      ...currentUser,
      skills: currentUser.skills.map((skill, index) => 
        index === skillIndex 
          ? { ...skill, experience: newExperience }
          : skill
      ),
      totalExperience: currentUser.totalExperience + xpResult.totalXP
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('fitnessRealmUser', JSON.stringify(updatedUser));

    // Show XP tracker
    setXpTrackerData({
      xpResult,
      skill: currentSkill.name
    });

    // Show level up notification if leveled up
    if (levelUpInfo.leveledUp) {
      setTimeout(() => {
        setLevelUpData({
          skill: currentSkill.name,
          oldLevel: levelUpInfo.oldLevel,
          newLevel: levelUpInfo.newLevel,
          xpGained: xpResult.totalXP
        });
      }, 2000); // Show after XP tracker
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'skills':
        return (
          <SkillsOverview 
            skills={currentUser.skills}
            title="Your Skills Progress"
            showExperience={true}
          />
        );
      case 'exercises':
        return (
          <ExerciseBrowser 
            onExerciseSelect={handleExerciseSelect}
            userEquipment={['dumbbells', 'yoga_mat', 'resistance_bands']} // TODO: Get from user profile
          />
        );
      case 'workout':
        return (
          <div style={{ 
            padding: '2rem', 
            background: 'rgba(255, 215, 0, 0.1)', 
            border: '2px solid #ffd700', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>🏋️ Workout Tracker</h3>
            <p>Real-time workout tracking and XP calculation coming soon!</p>
            <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '1rem' }}>
              Track your sets, reps, and earn skill XP in real-time.
            </p>
          </div>
        );
      case 'progress':
        return (
          <div style={{ 
            padding: '2rem', 
            background: 'rgba(255, 215, 0, 0.1)', 
            border: '2px solid #ffd700', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>📊 Progress Analytics</h3>
            <p>Detailed progress charts, personal records, and achievement tracking coming soon!</p>
            <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '1rem' }}>
              Visualize your fitness journey with comprehensive analytics.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      <MainApp>
        <Header>
          <Title>🏰 Fitness Realm ⚔️</Title>
          <Subtitle>Train Your Body, Level Your Life</Subtitle>
        </Header>

        <UserInfo>
          <WelcomeMessage>
            <h2>Welcome back, {currentUser.displayName}! 🎉</h2>
            <p>Ready to continue your fitness adventure?</p>
          </WelcomeMessage>
          
          <UserStats>
            <StatCard>
              <StatLabel>Total Level</StatLabel>
              <StatValue>{totalLevel}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Average Level</StatLabel>
              <StatValue>{averageLevel}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Total XP</StatLabel>
              <StatValue>{currentUser.totalExperience.toLocaleString()}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Active Goals</StatLabel>
              <StatValue>{currentUser.goals.length}</StatValue>
            </StatCard>
          </UserStats>
        </UserInfo>

        <Navigation>
          <NavButton 
            isActive={currentView === 'skills'} 
            onClick={() => setCurrentView('skills')}
          >
            📊 Skills
          </NavButton>
          <NavButton 
            isActive={currentView === 'exercises'} 
            onClick={() => setCurrentView('exercises')}
          >
            ⚔️ Exercises
          </NavButton>
          <NavButton 
            isActive={currentView === 'workout'} 
            onClick={() => setCurrentView('workout')}
          >
            🏋️ Workout
          </NavButton>
          <NavButton 
            isActive={currentView === 'progress'} 
            onClick={() => setCurrentView('progress')}
          >
            📈 Progress
          </NavButton>
        </Navigation>

        {renderCurrentView()}

        {selectedExercise && (
          <ExerciseDetail
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
            onStartWorkout={handleStartWorkout}
          />
        )}

        {xpTrackerData && (
          <XPTracker
            xpGained={xpTrackerData.xpResult}
            skill={xpTrackerData.skill}
            onComplete={() => setXpTrackerData(null)}
          />
        )}

        {levelUpData && (
          <LevelUpNotification
            skill={levelUpData.skill}
            oldLevel={levelUpData.oldLevel}
            newLevel={levelUpData.newLevel}
            xpGained={levelUpData.xpGained}
            onClose={() => setLevelUpData(null)}
          />
        )}
      </MainApp>
    </AppContainer>
  );
}

export default App;
