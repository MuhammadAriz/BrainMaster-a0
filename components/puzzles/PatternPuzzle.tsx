import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { withSpring } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PatternPuzzleProps {
  onComplete: () => void;
}

export const PatternPuzzle: React.FC<PatternPuzzleProps> = ({ onComplete }) => {
  const [pattern, setPattern] = useState<number[]>([]);
  const correctPattern = [0, 2, 1, 3];

  const handlePress = (index: number) => {
    const newPattern = [...pattern, index];
    setPattern(newPattern);

    if (newPattern.length === correctPattern.length) {
      if (newPattern.every((val, i) => val === correctPattern[i])) {
        onComplete();
      } else {
        setPattern([]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Pressable
            key={index}
            style={[
              styles.cell,
              pattern.includes(index) && styles.selectedCell
            ]}
            onPress={() => handlePress(index)}
          >
            <MaterialCommunityIcons
              name={pattern.includes(index) ? 'check' : 'circle-outline'}
              size={30}
              color="#fff"
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200,
    gap: 10,
  },
  cell: {
    width: 90,
    height: 90,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCell: {
    backgroundColor: '#4CAF50',
  },
});