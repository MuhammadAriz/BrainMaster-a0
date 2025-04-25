import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

interface ColorPuzzleProps {
  onComplete: () => void;
}

export const ColorPuzzle: React.FC<ColorPuzzleProps> = ({ onComplete }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
  const correctSequence = ['#FF0000', '#0000FF', '#FFFF00'];

  const handleColorPress = (color: string) => {
    const newColors = [...selectedColors, color];
    setSelectedColors(newColors);

    if (newColors.length === correctSequence.length) {
      if (newColors.every((c, i) => c === correctSequence[i])) {
        onComplete();
      } else {
        toast.error('Wrong sequence! Try again');
        setSelectedColors([]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedColors}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.colorSlot,
              selectedColors[i] && { backgroundColor: selectedColors[i] }
            ]}
          />
        ))}
      </View>
      <View style={styles.colorPicker}>
        {colors.map((color) => (
          <Pressable
            key={color}
            style={[styles.colorButton, { backgroundColor: color }]}
            onPress={() => handleColorPress(color)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    gap: 40,
  },
  selectedColors: {
    flexDirection: 'row',
    gap: 10,
  },
  colorSlot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#fff',
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 15,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
});