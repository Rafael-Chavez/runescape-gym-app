export const AVATAR_OPTIONS = {
  skinTones: [
    { id: 0, name: 'Light', color: '#FDBCB4' },
    { id: 1, name: 'Fair', color: '#F1C27D' },
    { id: 2, name: 'Medium', color: '#E0AC69' },
    { id: 3, name: 'Olive', color: '#C68642' },
    { id: 4, name: 'Brown', color: '#8D5524' },
    { id: 5, name: 'Dark', color: '#654321' }
  ],
  
  hairStyles: [
    { id: 0, name: 'Bald', preview: '🟢' },
    { id: 1, name: 'Short', preview: '👨' },
    { id: 2, name: 'Medium', preview: '🧑' },
    { id: 3, name: 'Long', preview: '👩' },
    { id: 4, name: 'Ponytail', preview: '👱‍♀️' },
    { id: 5, name: 'Braids', preview: '👩‍🦱' }
  ],
  
  hairColors: [
    { id: 0, name: 'Black', color: '#2C1B18' },
    { id: 1, name: 'Brown', color: '#593428' },
    { id: 2, name: 'Blonde', color: '#DEBC88' },
    { id: 3, name: 'Red', color: '#B55239' },
    { id: 4, name: 'Auburn', color: '#874228' },
    { id: 5, name: 'Grey', color: '#9B9B9B' }
  ],
  
  clothingColors: [
    { id: 0, name: 'Red', color: '#DC143C' },
    { id: 1, name: 'Blue', color: '#4169E1' },
    { id: 2, name: 'Green', color: '#228B22' },
    { id: 3, name: 'Yellow', color: '#FFD700' },
    { id: 4, name: 'Purple', color: '#8A2BE2' },
    { id: 5, name: 'Orange', color: '#FF8C00' },
    { id: 6, name: 'Pink', color: '#FF69B4' },
    { id: 7, name: 'Black', color: '#2F2F2F' },
    { id: 8, name: 'White', color: '#F8F8FF' },
    { id: 9, name: 'Brown', color: '#8B4513' }
  ]
};

export const getDefaultAvatar = () => ({
  gender: 'male' as const,
  skinTone: 0,
  hairStyle: 1,
  hairColor: 1,
  topColor: 1,
  bottomColor: 2,
  shoeColor: 7
});