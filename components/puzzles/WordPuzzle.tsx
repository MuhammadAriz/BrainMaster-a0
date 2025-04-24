import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface WordPuzzleProps {
  onComplete: () => void;
}

export const WordPuzzle: React.FC<WordPuzzleProps> = ({ onComplete }) => {
  const [letters, setLetters] = useState(['R', 'A', 'T', 'S']);
  const [rotations, setRotations] = useState([0, 0, 0, 0]);
  const [solved, setSolved] = useState(false);

  const handleLetterPress = (index: number) => {
    const newRotations = [...rotations];
    newRotations[index] = rotations[index] + 180;
    setRotations(newRotations);

    // Check if we've made "STAR"
    const currentWord = letters.join('');
    if (currentWord === 'STAR' && !solved) {
      setSolved(true);
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        {letters.map((letter, index) => (
          <Pressable key={index} onPress={() => handleLetterPress(index)}>
            <Animated.View
              style={[
                styles.letter,
                {
                  transform: [
                    { rotate: `${rotations[index]}deg` },
                    { scale: withSpring(1) },
                  ],
                },
              ]}
            >
              <Text style={styles.letterText}>{letter}</Text>
            </Animated.View>
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
  wordContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  letter: {
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});