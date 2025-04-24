import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { toast } from 'sonner-native';

interface CountingPuzzleProps {
  onComplete: () => void;
}

export const CountingPuzzle: React.FC<CountingPuzzleProps> = ({ onComplete }) => {
  const [attempts, setAttempts] = useState(0);
  const correctAnswer = 13;

  const numbers = [8, 10, 13, 15, 18];

  const handleNumberPress = (number: number) => {
    setAttempts(prev => prev + 1);
    if (number === correctAnswer) {
      onComplete();
    } else {
      toast.error('Try again! Look more carefully...');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.triangleContainer}>
        <Svg height="200" width="200" viewBox="0 0 100 100">
          <Path
            d="M10,90 L50,10 L90,90 Z M30,60 L50,30 L70,60 Z"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <Path
            d="M20,75 L50,20 L80,75 Z"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
          />
        </Svg>
      </View>

      <View style={styles.numbersContainer}>
        {numbers.map((number) => (
          <Pressable
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={styles.numberText}>{number}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  triangleContainer: {
    marginBottom: 40,
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  numberButton: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numberText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});