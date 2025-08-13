import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Exercise, ExerciseCategory, DifficultyLevel, EquipmentType, ExerciseFilter } from '../types/exercise';
import { ALL_EXERCISES, getExercisesByCategory, getExercisesByDifficulty, searchExercises } from '../data/exercises';

interface ExerciseBrowserProps {
  onExerciseSelect?: (exercise: Exercise) => void;
  userEquipment?: EquipmentType[];
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 100%);
  border-radius: 15px;
  color: #f4e4bc;
  font-family: 'Cinzel', serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #ffd700;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 0;
`;

const FilterContainer = styled.div`
  background: rgba(0,0,0,0.3);
  border: 2px solid #8b4513;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
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

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #8b4513;
  border-radius: 8px;
  background: rgba(0,0,0,0.3);
  color: #f4e4bc;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #ffd700;
  }
  
  &::placeholder {
    color: #ccc;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsCount = styled.div`
  font-size: 1.1rem;
  color: #ffd700;
`;

const SortSelect = styled(Select)`
  width: 200px;
`;

const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const ExerciseCard = styled.div`
  background: rgba(0,0,0,0.3);
  border: 2px solid #8b4513;
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #ffd700;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
  }
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const ExerciseName = styled.h3`
  color: #ffd700;
  margin: 0;
  font-size: 1.3rem;
`;

const DifficultyBadge = styled.span<{ difficulty: DifficultyLevel }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
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

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid #ffd700;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #ffd700;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const ExerciseDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  color: #f4e4bc;
`;

const ExerciseDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailLabel = styled.span`
  color: #ccc;
`;

const DetailValue = styled.span`
  color: #ffd700;
  font-weight: bold;
`;

const EquipmentList = styled.div`
  margin-bottom: 1rem;
`;

const EquipmentTag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: rgba(139, 69, 19, 0.5);
  border: 1px solid #8b4513;
  border-radius: 10px;
  font-size: 0.8rem;
  margin: 0.2rem 0.2rem 0 0;
  text-transform: capitalize;
`;

const PrimaryMuscles = styled.div`
  margin-bottom: 0.5rem;
`;

const MuscleTag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: rgba(34, 139, 34, 0.3);
  border: 1px solid #32cd32;
  border-radius: 10px;
  font-size: 0.8rem;
  margin: 0.2rem 0.2rem 0 0;
  color: #32cd32;
  text-transform: capitalize;
`;

const ExerciseBrowser: React.FC<ExerciseBrowserProps> = ({ onExerciseSelect, userEquipment = [] }) => {
  const [filters, setFilters] = useState<ExerciseFilter>({});
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'xp' | 'category'>('name');

  const filteredExercises = useMemo(() => {
    let exercises = ALL_EXERCISES;

    // Apply filters
    if (filters.categories && filters.categories.length > 0) {
      exercises = exercises.filter(ex => filters.categories!.includes(ex.category));
    }

    if (filters.difficulties && filters.difficulties.length > 0) {
      exercises = exercises.filter(ex => filters.difficulties!.includes(ex.difficulty));
    }

    if (filters.equipment && filters.equipment.length > 0) {
      exercises = exercises.filter(ex => 
        ex.equipmentRequired.length === 0 || 
        ex.equipmentRequired.some(req => filters.equipment!.includes(req))
      );
    }

    if (filters.searchTerm) {
      exercises = searchExercises(filters.searchTerm);
    }

    if (filters.xpRange) {
      exercises = exercises.filter(ex => 
        ex.baseXpValue >= filters.xpRange!.min && 
        ex.baseXpValue <= filters.xpRange!.max
      );
    }

    // Sort exercises
    exercises.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'xp':
          return b.baseXpValue - a.baseXpValue;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return exercises;
  }, [filters, sortBy]);

  const updateFilter = (key: keyof ExerciseFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <Container>
      <Header>
        <Title>⚔️ Exercise Compendium ⚔️</Title>
        <Subtitle>Discover over 100 exercises to level up your fitness skills</Subtitle>
      </Header>

      <FilterContainer>
        <FilterRow>
          <FilterGroup>
            <FilterLabel>Search Exercises</FilterLabel>
            <SearchInput
              type="text"
              placeholder="Search by name, description, or benefits..."
              value={filters.searchTerm || ''}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
            />
          </FilterGroup>
        </FilterRow>

        <FilterRow>
          <FilterGroup>
            <FilterLabel>Category (Skill)</FilterLabel>
            <Select
              value={filters.categories?.[0] || ''}
              onChange={(e) => updateFilter('categories', e.target.value ? [e.target.value as ExerciseCategory] : undefined)}
            >
              <option value="">All Categories</option>
              <option value="strength">💪 Strength</option>
              <option value="cardio">🏃 Cardio</option>
              <option value="flexibility">🧘 Flexibility</option>
              <option value="endurance">⚡ Endurance</option>
              <option value="balance">⚖️ Balance</option>
              <option value="agility">🤸 Agility</option>
              <option value="coordination">🎯 Coordination</option>
              <option value="recovery">😴 Recovery</option>
              <option value="mindfulness">🧠 Mindfulness</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Difficulty Level</FilterLabel>
            <Select
              value={filters.difficulties?.[0] || ''}
              onChange={(e) => updateFilter('difficulties', e.target.value ? [e.target.value as DifficultyLevel] : undefined)}
            >
              <option value="">All Levels</option>
              <option value="beginner">🟢 Beginner</option>
              <option value="intermediate">🟡 Intermediate</option>
              <option value="advanced">🟠 Advanced</option>
              <option value="expert">🔴 Expert</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Equipment Needed</FilterLabel>
            <Select
              value={filters.equipment?.[0] || ''}
              onChange={(e) => updateFilter('equipment', e.target.value ? [e.target.value as EquipmentType] : undefined)}
            >
              <option value="">Any Equipment</option>
              <option value="none">No Equipment</option>
              <option value="dumbbells">Dumbbells</option>
              <option value="barbell">Barbell</option>
              <option value="resistance_bands">Resistance Bands</option>
              <option value="kettlebell">Kettlebell</option>
              <option value="pull_up_bar">Pull-up Bar</option>
              <option value="yoga_mat">Yoga Mat</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>XP Range</FilterLabel>
            <Select
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'low') updateFilter('xpRange', { min: 0, max: 25 });
                else if (value === 'medium') updateFilter('xpRange', { min: 26, max: 50 });
                else if (value === 'high') updateFilter('xpRange', { min: 51, max: 100 });
                else updateFilter('xpRange', undefined);
              }}
            >
              <option value="">All XP Values</option>
              <option value="low">Low (0-25 XP)</option>
              <option value="medium">Medium (26-50 XP)</option>
              <option value="high">High (51+ XP)</option>
            </Select>
          </FilterGroup>
        </FilterRow>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <button
            onClick={clearFilters}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(220, 53, 69, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        </div>
      </FilterContainer>

      <ResultsHeader>
        <ResultsCount>
          Found {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
        </ResultsCount>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Sort by:</span>
          <SortSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="difficulty">Difficulty</option>
            <option value="xp">XP Value</option>
          </SortSelect>
        </div>
      </ResultsHeader>

      <ExerciseGrid>
        {filteredExercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            onClick={() => onExerciseSelect?.(exercise)}
          >
            <ExerciseHeader>
              <ExerciseName>{exercise.name}</ExerciseName>
              <DifficultyBadge difficulty={exercise.difficulty}>
                {exercise.difficulty}
              </DifficultyBadge>
            </ExerciseHeader>

            <CategoryBadge>{exercise.category}</CategoryBadge>

            <ExerciseDescription>
              {exercise.description}
            </ExerciseDescription>

            <ExerciseDetails>
              <DetailItem>
                <DetailLabel>XP Value:</DetailLabel>
                <DetailValue>{exercise.baseXpValue}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Duration:</DetailLabel>
                <DetailValue>{exercise.estimatedDurationMinutes} min</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Calories/min:</DetailLabel>
                <DetailValue>{exercise.caloriesBurnedPerMinute}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Variations:</DetailLabel>
                <DetailValue>{exercise.variations.length}</DetailValue>
              </DetailItem>
            </ExerciseDetails>

            <PrimaryMuscles>
              <DetailLabel style={{ display: 'block', marginBottom: '0.5rem' }}>Primary Muscles:</DetailLabel>
              {exercise.primaryMuscles.map(muscle => (
                <MuscleTag key={muscle}>{muscle.replace('_', ' ')}</MuscleTag>
              ))}
            </PrimaryMuscles>

            <EquipmentList>
              <DetailLabel style={{ display: 'block', marginBottom: '0.5rem' }}>Equipment:</DetailLabel>
              {exercise.equipmentRequired.length === 0 ? (
                <EquipmentTag>No equipment needed</EquipmentTag>
              ) : (
                exercise.equipmentRequired.map(equipment => (
                  <EquipmentTag key={equipment}>{equipment.replace('_', ' ')}</EquipmentTag>
                ))
              )}
            </EquipmentList>
          </ExerciseCard>
        ))}
      </ExerciseGrid>

      {filteredExercises.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#ccc',
          fontSize: '1.2rem'
        }}>
          No exercises found matching your criteria. Try adjusting your filters.
        </div>
      )}
    </Container>
  );
};

export default ExerciseBrowser;