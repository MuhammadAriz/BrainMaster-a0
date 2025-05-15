import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

interface LogicPuzzleProps {
  onComplete: () => void;
  config?: any;
}

export const LogicPuzzle: React.FC<LogicPuzzleProps> = ({ onComplete, config }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const options = [
    { id: 1, value: 3 },
    { id: 2, value: 5 },
    { id: 3, value: 7 },
    { id: 4, value: 9 }
  ];

  const handleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }

    // Check if the correct items are selected
    if (id === 2) {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Find the odd one out:</Text>
      <View style={styles.grid}>
        {options.map((option) => (
          <Pressable
            key={option.id}
            style={[
              styles.option,
              selected.includes(option.id) && styles.selectedOption
            ]}
            onPress={() => handleSelect(option.id)}
          >
            <Text style={styles.optionText}>{option.value}</Text>
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
  instruction: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'center',
  },
  option: {
    width: 70,
    height: 70,
    backgroundColor: '#333',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#fff',
  },
  optionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});