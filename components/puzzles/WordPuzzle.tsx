import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface WordPuzzleProps {
  onComplete: () => void;
  config?: {
    word?: string;
    target?: string;
    type?: 'anagram' | 'wordsearch';
    grid?: string[][];
  };
}

export const WordPuzzle: React.FC<WordPuzzleProps> = ({ onComplete, config }) => {
  const startWord = config?.word || 'RATS';
  const targetWord = config?.target || 'STAR';
  const puzzleType = config?.type || 'anagram';
  
  const [currentWord, setCurrentWord] = useState(startWord.split(''));
  const [steps, setSteps] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  
  // Animation values
  const rotation = useSharedValue(0);
  
  // Check if the word matches the target
  useEffect(() => {
    if (currentWord.join('') === targetWord) {
      toast.success('Great job! You transformed the word!');
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentWord]);

  // Handle letter tap
  const handleLetterPress = (index: number) => {
    if (selectedIndices.length === 0) {
      // First selection
      setSelectedIndices([index]);
    } else if (selectedIndices.length === 1) {
      // Second selection - swap letters
      const firstIndex = selectedIndices[0];
      
      if (firstIndex === index) {
        // Deselect if tapping the same letter
        setSelectedIndices([]);
        return;
      }
      
      // Swap the letters
      const newWord = [...currentWord];
      const temp = newWord[firstIndex];
      newWord[firstIndex] = newWord[index];
      newWord[index] = temp;
      
      // Update state
      setCurrentWord(newWord);
      setSelectedIndices([]);
      setSteps(prev => prev + 1);
      
      // Animate rotation
      rotation.value = withSpring(rotation.value + 360, { damping: 10 });
    }
  };

  // Animated style for letter rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  // Render anagram puzzle
  const renderAnagramPuzzle = () => (
    <View style={styles.wordContainer}>
      {currentWord.map((letter, index) => (
        <Pressable
          key={index}
          style={[
            styles.letterBox,
            selectedIndices.includes(index) && styles.selectedLetter
          ]}
          onPress={() => handleLetterPress(index)}
        >
          <Animated.Text 
            style={[styles.letterText, animatedStyle]}
          >
            {letter}
          </Animated.Text>
        </Pressable>
      ))}
    </View>
  );

  // Render word search puzzle
  const renderWordSearchPuzzle = () => {
    if (!config?.grid) return null;
    
    return (
      <View style={styles.gridContainer}>
        {config.grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.gridRow}>
            {row.map((letter, colIndex) => (
              <Pressable
                key={`${rowIndex}-${colIndex}`}
                style={styles.gridCell}
                onPress={() => {/* Handle grid cell press */}}
              >
                <Text style={styles.gridCellText}>{letter}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <Animated.View 
      entering={FadeIn}
      style={styles.container}
    >
      <Text style={styles.instruction}>
        Transform "{startWord}" into "{targetWord}"
      </Text>
      <Text style={styles.subInstruction}>
        Tap two letters to swap their positions
      </Text>
      
      {puzzleType === 'anagram' ? renderAnagramPuzzle() : renderWordSearchPuzzle()}
      
      <View style={styles.infoContainer}>
        <Text style={styles.stepsText}>Steps: {steps}</Text>
        <Text style={styles.targetText}>Target: {targetWord}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subInstruction: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  letterBox: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  selectedLetter: {
    borderColor: '#4CAF50',
    backgroundColor: '#444',
  },
  letterText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  stepsText: {
    color: '#aaa',
    fontSize: 16,
  },
  targetText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridContainer: {
    marginVertical: 20,
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  gridCellText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});