import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '../types/user';
import { AVATAR_OPTIONS, getDefaultAvatar } from '../data/avatarOptions';

interface CharacterCreationProps {
  onComplete: (avatar: Avatar) => void;
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
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const AvatarPreview = styled.div`
  width: 200px;
  height: 300px;
  margin: 0 auto 2rem;
  background: linear-gradient(180deg, #87ceeb 0%, #90ee90 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border: 3px solid #ffd700;
  position: relative;
`;

const CustomizationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CustomizationSection = styled.div`
  background: rgba(0,0,0,0.3);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #8b4513;
`;

const SectionTitle = styled.h3`
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const OptionButton = styled.button<{ isSelected: boolean; bgColor?: string }>`
  padding: 0.5rem;
  border: 2px solid ${props => props.isSelected ? '#ffd700' : '#8b4513'};
  border-radius: 8px;
  background: ${props => props.bgColor || 'rgba(139, 69, 19, 0.5)'};
  color: #f4e4bc;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ffd700;
    transform: translateY(-2px);
  }
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  padding: 1rem 2rem;
  border: 2px solid ${props => props.isSelected ? '#ffd700' : '#8b4513'};
  border-radius: 10px;
  background: ${props => props.isSelected ? 'rgba(255, 215, 0, 0.2)' : 'rgba(139, 69, 19, 0.5)'};
  color: #f4e4bc;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ffd700;
    transform: translateY(-2px);
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

const CharacterCreation: React.FC<CharacterCreationProps> = ({ onComplete, onBack }) => {
  const [avatar, setAvatar] = useState<Avatar>(getDefaultAvatar());

  const updateAvatar = (key: keyof Avatar, value: any) => {
    setAvatar(prev => ({ ...prev, [key]: value }));
  };

  const getAvatarDisplay = () => {
    const gender = avatar.gender === 'male' ? '🧙‍♂️' : '🧙‍♀️';
    return gender;
  };

  return (
    <Container>
      <Title>Create Your Fitness Champion</Title>
      
      <AvatarPreview>
        {getAvatarDisplay()}
      </AvatarPreview>

      <CustomizationGrid>
        <CustomizationSection>
          <SectionTitle>Gender</SectionTitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GenderButton
              isSelected={avatar.gender === 'male'}
              onClick={() => updateAvatar('gender', 'male')}
            >
              🧙‍♂️ Male
            </GenderButton>
            <GenderButton
              isSelected={avatar.gender === 'female'}
              onClick={() => updateAvatar('gender', 'female')}
            >
              🧙‍♀️ Female
            </GenderButton>
          </div>
        </CustomizationSection>

        <CustomizationSection>
          <SectionTitle>Skin Tone</SectionTitle>
          <OptionGrid>
            {AVATAR_OPTIONS.skinTones.map(tone => (
              <OptionButton
                key={tone.id}
                isSelected={avatar.skinTone === tone.id}
                bgColor={tone.color}
                onClick={() => updateAvatar('skinTone', tone.id)}
              >
                {tone.name}
              </OptionButton>
            ))}
          </OptionGrid>
        </CustomizationSection>

        <CustomizationSection>
          <SectionTitle>Hair Style</SectionTitle>
          <OptionGrid>
            {AVATAR_OPTIONS.hairStyles.map(style => (
              <OptionButton
                key={style.id}
                isSelected={avatar.hairStyle === style.id}
                onClick={() => updateAvatar('hairStyle', style.id)}
              >
                {style.preview} {style.name}
              </OptionButton>
            ))}
          </OptionGrid>
        </CustomizationSection>

        <CustomizationSection>
          <SectionTitle>Hair Color</SectionTitle>
          <OptionGrid>
            {AVATAR_OPTIONS.hairColors.map(color => (
              <OptionButton
                key={color.id}
                isSelected={avatar.hairColor === color.id}
                bgColor={color.color}
                onClick={() => updateAvatar('hairColor', color.id)}
              >
                {color.name}
              </OptionButton>
            ))}
          </OptionGrid>
        </CustomizationSection>

        <CustomizationSection>
          <SectionTitle>Top Color</SectionTitle>
          <OptionGrid>
            {AVATAR_OPTIONS.clothingColors.map(color => (
              <OptionButton
                key={color.id}
                isSelected={avatar.topColor === color.id}
                bgColor={color.color}
                onClick={() => updateAvatar('topColor', color.id)}
              >
                {color.name}
              </OptionButton>
            ))}
          </OptionGrid>
        </CustomizationSection>

        <CustomizationSection>
          <SectionTitle>Bottom Color</SectionTitle>
          <OptionGrid>
            {AVATAR_OPTIONS.clothingColors.map(color => (
              <OptionButton
                key={color.id}
                isSelected={avatar.bottomColor === color.id}
                bgColor={color.color}
                onClick={() => updateAvatar('bottomColor', color.id)}
              >
                {color.name}
              </OptionButton>
            ))}
          </OptionGrid>
        </CustomizationSection>
      </CustomizationGrid>

      <ButtonContainer>
        {onBack && (
          <ActionButton onClick={onBack}>
            ← Back
          </ActionButton>
        )}
        <ActionButton onClick={() => onComplete(avatar)}>
          Continue to Training →
        </ActionButton>
      </ButtonContainer>
    </Container>
  );
};

export default CharacterCreation;