import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { FitnessGoal } from '../types/user';

interface GoalSettingProps {
  onComplete: (goals: FitnessGoal[]) => void;
  onBack?: () => void;
}

interface GoalFormData {
  type: FitnessGoal['type'];
  target: number;
  unit: string;
  deadline: string;
  description: string;
}

const Container = styled.div`
  max-width: 900px;
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
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #f4e4bc;
`;

const GoalTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GoalTypeCard = styled.div<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? 'rgba(255, 215, 0, 0.2)' : 'rgba(0,0,0,0.3)'};
  border: 2px solid ${props => props.isSelected ? '#ffd700' : '#8b4513'};
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ffd700;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
  }
`;

const GoalIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const GoalTypeName = styled.h3`
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const GoalDescription = styled.p`
  font-size: 0.9rem;
  color: #f4e4bc;
  line-height: 1.4;
`;

const CurrentGoalsSection = styled.div`
  background: rgba(0,0,0,0.3);
  border: 2px solid #8b4513;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const SectionTitle = styled.h3`
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GoalItem = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #ffd700;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GoalInfo = styled.div`
  flex: 1;
`;

const GoalTarget = styled.div`
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.25rem;
`;

const GoalDeadline = styled.div`
  font-size: 0.9rem;
  color: #ccc;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: #c82333;
  }
`;

const Form = styled.form`
  background: rgba(0,0,0,0.3);
  border: 2px solid #8b4513;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #f4e4bc;
`;

const Input = styled.input`
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

const Select = styled.select`
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #8b4513;
  border-radius: 8px;
  background: rgba(0,0,0,0.3);
  color: #f4e4bc;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ffd700;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, #8b4513, #cd853f);
  color: #f4e4bc;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #a0522d, #daa520);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AddGoalButton = styled(ActionButton)`
  background: linear-gradient(45deg, #228b22, #32cd32);
  
  &:hover {
    background: linear-gradient(45deg, #2e8b57, #3cb371);
  }
`;

const GOAL_TYPES = [
  {
    type: 'weight_loss' as const,
    icon: '⚖️',
    name: 'Weight Loss',
    description: 'Lose weight and reduce body fat percentage',
    units: ['lbs', 'kg', '%']
  },
  {
    type: 'muscle_gain' as const,
    icon: '💪',
    name: 'Muscle Gain',
    description: 'Build lean muscle mass and increase strength',
    units: ['lbs', 'kg']
  },
  {
    type: 'strength' as const,
    icon: '🏋️',
    name: 'Strength',
    description: 'Increase maximum lifting capacity',
    units: ['lbs', 'kg', 'reps']
  },
  {
    type: 'cardio' as const,
    icon: '🏃',
    name: 'Cardio Endurance',
    description: 'Improve cardiovascular fitness and stamina',
    units: ['miles', 'km', 'minutes']
  },
  {
    type: 'endurance' as const,
    icon: '⚡',
    name: 'General Endurance',
    description: 'Increase overall fitness and energy levels',
    units: ['minutes', 'hours', 'sessions']
  },
  {
    type: 'flexibility' as const,
    icon: '🧘',
    name: 'Flexibility',
    description: 'Improve range of motion and mobility',
    units: ['degrees', 'sessions', 'poses']
  }
];

const GoalSetting: React.FC<GoalSettingProps> = ({ onComplete, onBack }) => {
  const [selectedGoalType, setSelectedGoalType] = useState<FitnessGoal['type'] | null>(null);
  const [currentGoals, setCurrentGoals] = useState<FitnessGoal[]>([]);
  const [showForm, setShowForm] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<GoalFormData>({
    defaultValues: {
      type: 'strength',
      target: 0,
      unit: '',
      deadline: '',
      description: ''
    }
  });

  const selectedType = watch('type');
  const availableUnits = GOAL_TYPES.find(gt => gt.type === selectedType)?.units || [];

  const onSubmit = (data: GoalFormData) => {
    // Basic validation
    if (!data.type) {
      alert('Please select a goal type');
      return;
    }
    if (!data.target || data.target <= 0) {
      alert('Please enter a valid target amount');
      return;
    }
    if (!data.unit) {
      alert('Please select a unit');
      return;
    }
    if (!data.deadline) {
      alert('Please select a deadline');
      return;
    }
    if (!data.description || data.description.length < 10) {
      alert('Please enter a description (at least 10 characters)');
      return;
    }

    const newGoal: FitnessGoal = {
      id: Date.now().toString(),
      type: data.type,
      target: data.target,
      unit: data.unit,
      deadline: new Date(data.deadline),
      description: data.description
    };

    setCurrentGoals(prev => [...prev, newGoal]);
    setShowForm(false);
    setSelectedGoalType(null);
    reset();
  };

  const removeGoal = (goalId: string) => {
    setCurrentGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleGoalTypeSelect = (type: FitnessGoal['type']) => {
    setSelectedGoalType(type);
    setShowForm(true);
    reset({ type });
  };

  const handleComplete = () => {
    if (currentGoals.length === 0) {
      alert('Please add at least one goal before continuing.');
      return;
    }
    onComplete(currentGoals);
  };

  const formatDeadline = (deadline: Date) => {
    return deadline.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container>
      <Title>Set Your Fitness Goals</Title>
      <Subtitle>
        Every great adventure needs a destination! Set specific, measurable goals to guide your fitness journey.
      </Subtitle>

      {currentGoals.length > 0 && (
        <CurrentGoalsSection>
          <SectionTitle>Your Current Goals ({currentGoals.length})</SectionTitle>
          <GoalsList>
            {currentGoals.map(goal => (
              <GoalItem key={goal.id}>
                <GoalInfo>
                  <GoalTarget>
                    {GOAL_TYPES.find(gt => gt.type === goal.type)?.icon} {goal.description}
                  </GoalTarget>
                  <div>Target: {goal.target} {goal.unit}</div>
                  <GoalDeadline>Deadline: {formatDeadline(goal.deadline)}</GoalDeadline>
                </GoalInfo>
                <RemoveButton onClick={() => removeGoal(goal.id)}>
                  Remove
                </RemoveButton>
              </GoalItem>
            ))}
          </GoalsList>
        </CurrentGoalsSection>
      )}

      {!showForm && (
        <>
          <SectionTitle>Choose a Goal Type</SectionTitle>
          <GoalTypeGrid>
            {GOAL_TYPES.map(goalType => (
              <GoalTypeCard
                key={goalType.type}
                isSelected={false}
                onClick={() => handleGoalTypeSelect(goalType.type)}
              >
                <GoalIcon>{goalType.icon}</GoalIcon>
                <GoalTypeName>{goalType.name}</GoalTypeName>
                <GoalDescription>{goalType.description}</GoalDescription>
              </GoalTypeCard>
            ))}
          </GoalTypeGrid>
        </>
      )}

      {showForm && selectedGoalType && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Add {GOAL_TYPES.find(gt => gt.type === selectedGoalType)?.name} Goal</SectionTitle>
          
          <Controller
            name="type"
            control={control}
            render={({ field }) => <input {...field} type="hidden" />}
          />

          <FormRow>
            <FormGroup>
              <Label>Target Amount</Label>
              <Controller
                name="target"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="number" step="0.1" placeholder="Enter target" />
                )}
              />
              {errors.target && <div style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.target.message}</div>}
            </FormGroup>

            <FormGroup>
              <Label>Unit</Label>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="">Select unit</option>
                    {availableUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </Select>
                )}
              />
              {errors.unit && <div style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.unit.message}</div>}
            </FormGroup>

            <FormGroup>
              <Label>Target Deadline</Label>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="date" min={new Date().toISOString().split('T')[0]} />
                )}
              />
              {errors.deadline && <div style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.deadline.message}</div>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Goal Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea 
                  {...field} 
                  placeholder="Describe your goal in detail (e.g., 'Run a 5K in under 30 minutes')" 
                />
              )}
            />
            {errors.description && <div style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.description.message}</div>}
          </FormGroup>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <ActionButton type="button" onClick={() => setShowForm(false)}>
              Cancel
            </ActionButton>
            <AddGoalButton type="submit">
              Add Goal
            </AddGoalButton>
          </div>
        </Form>
      )}

      <ButtonContainer>
        {onBack && (
          <ActionButton onClick={onBack}>
            ← Back
          </ActionButton>
        )}
        <ActionButton onClick={handleComplete} disabled={currentGoals.length === 0}>
          Complete Registration →
        </ActionButton>
      </ButtonContainer>
    </Container>
  );
};

export default GoalSetting;