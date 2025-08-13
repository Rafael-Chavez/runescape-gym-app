import React, { useState } from 'react';
import styled from 'styled-components';
import { Exercise, ExerciseSet } from '../types/exercise';

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
  onStartWorkout?: (exercise: Exercise) => void;
  onLogSet?: (exerciseId: string, set: ExerciseSet) => void;
}

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
  z-index: 1000;
  padding: 2rem;
`;

const Modal = styled.div`
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  padding: 2rem;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
  border: 2px solid #ffd700;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(220, 53, 69, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(220, 53, 69, 1);
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
  padding-right: 3rem;
`;

const Title = styled.h1`
  color: #ffd700;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CategoryBadge = styled.span`
  padding: 0.5rem 1rem;
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid #ffd700;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #ffd700;
  text-transform: capitalize;
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  background: ${props => {
    switch (props.difficulty) {
      case 'beginner': return '#28a745';
      case 'intermediate': return '#ffc107';
      case 'advanced': return '#fd7e14';
      case 'expert': return '#dc3545';
      default: return '#6c757d';
    }
  }};
  color: white;
`;

const XpBadge = styled.span`
  padding: 0.5rem 1rem;
  background: rgba(34, 139, 34, 0.3);
  border: 1px solid #32cd32;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #32cd32;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background: rgba(0,0,0,0.3);
  border: 1px solid #8b4513;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #ffd700;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const FormStepsList = styled.ol`
  list-style: none;
  padding: 0;
  counter-reset: step-counter;
`;

const FormStep = styled.li`
  counter-increment: step-counter;
  margin-bottom: 1rem;
  padding-left: 3rem;
  position: relative;
  
  &::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    background: #ffd700;
    color: #2c1810;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

const StepInstruction = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StepTip = styled.div`
  color: #32cd32;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  
  &::before {
    content: "💡 Tip: ";
  }
`;

const StepMistake = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  
  &::before {
    content: "⚠️ Avoid: ";
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BenefitItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: "✅";
    position: absolute;
    left: 0;
  }
`;

const SafetyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SafetyItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: #ffc107;
  
  &::before {
    content: "⚠️";
    position: absolute;
    left: 0;
  }
`;

const VariationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const VariationCard = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #ffd700;
  border-radius: 10px;
  padding: 1rem;
`;

const VariationName = styled.h4`
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const VariationDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const DifficultyModifier = styled.span<{ modifier: number }>`
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${props => props.modifier > 1 ? '#dc3545' : props.modifier < 1 ? '#28a745' : '#ffc107'};
  color: white;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(139, 69, 19, 0.5);
  border: 1px solid #8b4513;
  border-radius: 15px;
  font-size: 0.8rem;
  text-transform: capitalize;
`;

const MuscleTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(34, 139, 34, 0.3);
  border: 1px solid #32cd32;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #32cd32;
  text-transform: capitalize;
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
  margin-right: 1rem;
  margin-bottom: 1rem;
  
  &:hover {
    background: linear-gradient(45deg, #a0522d, #daa520);
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #ffd700;
  border-radius: 10px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffd700;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #f4e4bc;
`;

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ 
  exercise, 
  onClose, 
  onStartWorkout,
  onLogSet 
}) => {
  const [showWorkoutLog, setShowWorkoutLog] = useState(false);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <Header>
          <Title>{exercise.name}</Title>
          <BadgeContainer>
            <CategoryBadge>{exercise.category}</CategoryBadge>
            <DifficultyBadge difficulty={exercise.difficulty}>
              {exercise.difficulty}
            </DifficultyBadge>
            <XpBadge>{exercise.baseXpValue} XP</XpBadge>
          </BadgeContainer>
          <Description>{exercise.description}</Description>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatValue>{exercise.baseXpValue}</StatValue>
            <StatLabel>Base XP</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{exercise.estimatedDurationMinutes}</StatValue>
            <StatLabel>Duration (min)</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{exercise.caloriesBurnedPerMinute}</StatValue>
            <StatLabel>Cal/min</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{exercise.variations.length}</StatValue>
            <StatLabel>Variations</StatLabel>
          </StatCard>
        </StatsGrid>

        <div style={{ marginBottom: '2rem' }}>
          <ActionButton onClick={() => onStartWorkout?.(exercise)}>
            🏋️ Start Workout
          </ActionButton>
          <ActionButton onClick={() => setShowWorkoutLog(!showWorkoutLog)}>
            📊 Log Progress
          </ActionButton>
        </div>

        <Section>
          <SectionTitle>💪 Benefits</SectionTitle>
          <BenefitsList>
            {exercise.benefits.map((benefit, index) => (
              <BenefitItem key={index}>{benefit}</BenefitItem>
            ))}
          </BenefitsList>
        </Section>

        <Section>
          <SectionTitle>🎯 Target Muscles</SectionTitle>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Primary: </strong>
            <TagContainer>
              {exercise.primaryMuscles.map(muscle => (
                <MuscleTag key={muscle}>{muscle.replace('_', ' ')}</MuscleTag>
              ))}
            </TagContainer>
          </div>
          <div>
            <strong>Secondary: </strong>
            <TagContainer>
              {exercise.secondaryMuscles.map(muscle => (
                <MuscleTag key={muscle}>{muscle.replace('_', ' ')}</MuscleTag>
              ))}
            </TagContainer>
          </div>
        </Section>

        <Section>
          <SectionTitle>📋 Form & Technique</SectionTitle>
          <FormStepsList>
            {exercise.formSteps.map((step, index) => (
              <FormStep key={index}>
                <StepInstruction>{step.instruction}</StepInstruction>
                {step.tip && <StepTip>{step.tip}</StepTip>}
                {step.commonMistake && <StepMistake>{step.commonMistake}</StepMistake>}
              </FormStep>
            ))}
          </FormStepsList>
        </Section>

        <Section>
          <SectionTitle>⚠️ Safety Tips</SectionTitle>
          <SafetyList>
            {exercise.safetyTips.map((tip, index) => (
              <SafetyItem key={index}>{tip}</SafetyItem>
            ))}
          </SafetyList>
        </Section>

        <Section>
          <SectionTitle>🏋️ Equipment</SectionTitle>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Required: </strong>
            {exercise.equipmentRequired.length === 0 ? (
              <span style={{ color: '#32cd32' }}>No equipment needed!</span>
            ) : (
              <TagContainer>
                {exercise.equipmentRequired.map(equipment => (
                  <Tag key={equipment}>{equipment.replace('_', ' ')}</Tag>
                ))}
              </TagContainer>
            )}
          </div>
          
          {exercise.equipmentAlternatives.length > 0 && (
            <div>
              <strong>Alternatives:</strong>
              {exercise.equipmentAlternatives.map((alt, index) => (
                <div key={index} style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ color: '#ffc107' }}>
                    Instead of {alt.original.replace('_', ' ')}:
                  </span>
                  <br />
                  {alt.instructions}
                </div>
              ))}
            </div>
          )}
        </Section>

        {exercise.variations.length > 0 && (
          <Section>
            <SectionTitle>🔄 Variations</SectionTitle>
            <VariationGrid>
              {exercise.variations.map((variation, index) => (
                <VariationCard key={index}>
                  <VariationName>{variation.name}</VariationName>
                  <VariationDescription>{variation.description}</VariationDescription>
                  <DifficultyModifier modifier={variation.difficultyModifier}>
                    {variation.difficultyModifier > 1 ? 'Harder' : 
                     variation.difficultyModifier < 1 ? 'Easier' : 'Same'} 
                    ({Math.round(variation.difficultyModifier * 100)}%)
                  </DifficultyModifier>
                </VariationCard>
              ))}
            </VariationGrid>
          </Section>
        )}

        <Section>
          <SectionTitle>🏷️ Tags</SectionTitle>
          <TagContainer>
            {exercise.tags.map(tag => (
              <Tag key={tag}>{tag.replace('_', ' ')}</Tag>
            ))}
          </TagContainer>
        </Section>

        {exercise.contraindications.length > 0 && (
          <Section>
            <SectionTitle style={{ color: '#ff6b6b' }}>🚫 Contraindications</SectionTitle>
            <div style={{ color: '#ff6b6b' }}>
              <strong>Avoid this exercise if you have:</strong>
              <ul style={{ marginTop: '0.5rem' }}>
                {exercise.contraindications.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
          </Section>
        )}
      </Modal>
    </Overlay>
  );
};

export default ExerciseDetail;