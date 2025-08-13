import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FitnessAssessment as FitnessAssessmentType } from '../types/user';

interface FitnessAssessmentProps {
  onComplete: (assessment: FitnessAssessmentType) => void;
  onBack?: () => void;
}

const Container = styled.div`
  max-width: 800px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  background: rgba(0,0,0,0.3);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #8b4513;
`;

const SectionTitle = styled.h3`
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
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

const Select = styled.select`
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

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.1);
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  accent-color: #ffd700;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.25rem;
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

const schema = yup.object().shape({
  currentWeight: yup.number().required('Current weight is required').positive('Weight must be positive'),
  targetWeight: yup.number().positive('Target weight must be positive').nullable(),
  height: yup.number().required('Height is required').positive('Height must be positive'),
  age: yup.number().required('Age is required').positive('Age must be positive').integer('Age must be a whole number'),
  activityLevel: yup.string().required('Activity level is required'),
  experienceLevel: yup.string().required('Experience level is required'),
  healthConditions: yup.array().of(yup.string()),
  availableEquipment: yup.array().of(yup.string()),
  preferredWorkoutTimes: yup.array().of(yup.string()),
  workoutDuration: yup.number().required('Workout duration is required').positive('Duration must be positive')
});

const FitnessAssessment: React.FC<FitnessAssessmentProps> = ({ onComplete, onBack }) => {
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<FitnessAssessmentType>({
    resolver: yupResolver(schema),
    defaultValues: {
      healthConditions: [],
      availableEquipment: [],
      preferredWorkoutTimes: [],
      workoutDuration: 30
    }
  });

  const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedWorkoutTimes, setSelectedWorkoutTimes] = useState<string[]>([]);

  const healthConditionOptions = [
    'None', 'Back problems', 'Knee problems', 'Heart condition', 
    'Diabetes', 'High blood pressure', 'Asthma', 'Previous injuries',
    'Pregnancy', 'Other medical condition'
  ];

  const equipmentOptions = [
    'No equipment', 'Dumbbells', 'Resistance bands', 'Pull-up bar',
    'Yoga mat', 'Treadmill', 'Stationary bike', 'Kettlebells',
    'Barbell', 'Full gym access', 'Swimming pool', 'Outdoor space'
  ];

  const workoutTimeOptions = [
    'Early morning (5-7 AM)', 'Morning (7-10 AM)', 'Late morning (10 AM-12 PM)',
    'Early afternoon (12-2 PM)', 'Afternoon (2-5 PM)', 'Early evening (5-7 PM)',
    'Evening (7-9 PM)', 'Night (9-11 PM)'
  ];

  const handleCheckboxChange = (
    value: string, 
    selectedArray: string[], 
    setSelectedArray: (arr: string[]) => void,
    fieldName: keyof FitnessAssessmentType
  ) => {
    const newArray = selectedArray.includes(value)
      ? selectedArray.filter(item => item !== value)
      : [...selectedArray, value];
    
    setSelectedArray(newArray);
    setValue(fieldName, newArray as any);
  };

  const onSubmit = (data: FitnessAssessmentType) => {
    const assessmentData = {
      ...data,
      healthConditions: selectedHealthConditions,
      availableEquipment: selectedEquipment,
      preferredWorkoutTimes: selectedWorkoutTimes
    };
    onComplete(assessmentData);
  };

  return (
    <Container>
      <Title>Fitness Assessment</Title>
      <Subtitle>Help us understand your current fitness level and preferences to create the perfect training plan for your adventure!</Subtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SectionTitle>📊 Basic Measurements</SectionTitle>
          
          <FormGroup>
            <Label>Current Weight (lbs)</Label>
            <Controller
              name="currentWeight"
              control={control}
              render={({ field }) => <Input {...field} type="number" placeholder="150" />}
            />
            {errors.currentWeight && <ErrorMessage>{errors.currentWeight.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Target Weight (lbs) - Optional</Label>
            <Controller
              name="targetWeight"
              control={control}
              render={({ field }) => <Input {...field} type="number" placeholder="140" />}
            />
            {errors.targetWeight && <ErrorMessage>{errors.targetWeight.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Height (inches)</Label>
            <Controller
              name="height"
              control={control}
              render={({ field }) => <Input {...field} type="number" placeholder="68" />}
            />
            {errors.height && <ErrorMessage>{errors.height.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Age</Label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => <Input {...field} type="number" placeholder="25" />}
            />
            {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>🏃 Activity & Experience</SectionTitle>
          
          <FormGroup>
            <Label>Current Activity Level</Label>
            <Controller
              name="activityLevel"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Select your activity level</option>
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="light">Light (light exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                  <option value="active">Active (hard exercise 6-7 days/week)</option>
                  <option value="very_active">Very Active (very hard exercise, physical job)</option>
                </Select>
              )}
            />
            {errors.activityLevel && <ErrorMessage>{errors.activityLevel.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Fitness Experience Level</Label>
            <Controller
              name="experienceLevel"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (0-6 months of training)</option>
                  <option value="intermediate">Intermediate (6 months - 2 years)</option>
                  <option value="advanced">Advanced (2+ years of consistent training)</option>
                </Select>
              )}
            />
            {errors.experienceLevel && <ErrorMessage>{errors.experienceLevel.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Preferred Workout Duration (minutes)</Label>
            <Controller
              name="workoutDuration"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </Select>
              )}
            />
            {errors.workoutDuration && <ErrorMessage>{errors.workoutDuration.message}</ErrorMessage>}
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>🏥 Health Considerations</SectionTitle>
          <Label>Select any health conditions or concerns (check all that apply):</Label>
          <CheckboxGroup>
            {healthConditionOptions.map(condition => (
              <CheckboxLabel key={condition}>
                <Checkbox
                  type="checkbox"
                  checked={selectedHealthConditions.includes(condition)}
                  onChange={() => handleCheckboxChange(
                    condition, 
                    selectedHealthConditions, 
                    setSelectedHealthConditions,
                    'healthConditions'
                  )}
                />
                {condition}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </Section>

        <Section>
          <SectionTitle>🏋️ Available Equipment</SectionTitle>
          <Label>What equipment do you have access to? (check all that apply):</Label>
          <CheckboxGroup>
            {equipmentOptions.map(equipment => (
              <CheckboxLabel key={equipment}>
                <Checkbox
                  type="checkbox"
                  checked={selectedEquipment.includes(equipment)}
                  onChange={() => handleCheckboxChange(
                    equipment, 
                    selectedEquipment, 
                    setSelectedEquipment,
                    'availableEquipment'
                  )}
                />
                {equipment}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </Section>

        <Section>
          <SectionTitle>⏰ Workout Schedule</SectionTitle>
          <Label>When do you prefer to work out? (check all that apply):</Label>
          <CheckboxGroup>
            {workoutTimeOptions.map(time => (
              <CheckboxLabel key={time}>
                <Checkbox
                  type="checkbox"
                  checked={selectedWorkoutTimes.includes(time)}
                  onChange={() => handleCheckboxChange(
                    time, 
                    selectedWorkoutTimes, 
                    setSelectedWorkoutTimes,
                    'preferredWorkoutTimes'
                  )}
                />
                {time}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </Section>

        <ButtonContainer>
          {onBack && (
            <ActionButton type="button" onClick={onBack}>
              ← Back
            </ActionButton>
          )}
          <ActionButton type="submit">
            Continue to Goals →
          </ActionButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default FitnessAssessment;