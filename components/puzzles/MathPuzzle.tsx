import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

interface MathPuzzleProps {
  onComplete: () => void;
}

export const MathPuzzle: React.FC<MathPuzzleProps> = ({ onComplete }) => {
  const [numbers, setNumbers] = useState([1, 3, 5, 7]);
  const [operations, setOperations] = useState<string[]>([]);
  const target = 10;

  const handleNumberPress = (index: number) => {
    const num = numbers[index];
    setOperations(prev => [...prev, num.toString()]);
  };

  const handleOperatorPress = (operator: string) => {
    setOperations(prev => [...prev, operator]);
  };

  const calculateResult = () => {
    try {
      const result = eval(operations.join(''));
      if (result === target) {
        onComplete();
      } else {
        toast.error('Try again!');
        setOperations([]);
      }
    } catch {
      toast.error('Invalid expression');
      setOperations([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.targetText}>Target: {target}</Text>
      <View style={styles.expression}>
        <Text style={styles.expressionText}>{operations.join(' ')}</Text>
      </View>
      <View style={styles.numbersContainer}>
        {numbers.map((num, index) => (
          <Pressable
            key={index}
            style={styles.numberButton}
            onPress={() => handleNumberPress(index)}
          >
            <Text style={styles.numberText}>{num}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.operatorsContainer}>
        {['+', '-', '*', '/'].map((op) => (
          <Pressable
            key={op}
            style={styles.operatorButton}
            onPress={() => handleOperatorPress(op)}
          >
            <Text style={styles.operatorText}>{op}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.equalButton} onPress={calculateResult}>
        <Text style={styles.equalText}>=</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    gap: 20,
  },
  targetText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  expression: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  expressionText: {
    color: '#fff',
    fontSize: 20,
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  numberButton: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  operatorsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  operatorButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF9800',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operatorText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  equalButton: {
    width: 60,
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  equalText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});