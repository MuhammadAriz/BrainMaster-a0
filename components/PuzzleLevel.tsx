import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface PuzzleLevelProps {
  level: number;
  question: string;
  hint: string;
  isComplete?: boolean;
  onComplete?: () => void;
  children: React.ReactNode;
}

export const PuzzleLevel: React.FC<PuzzleLevelProps> = ({
  level,
  question,
  hint,
  isComplete = false,
  onComplete,
  children
}) => {
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const handleHintPress = () => {
    setShowHint(true);
    setHintUsed(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.levelText}>Level {level}</Text>
        <Pressable onPress={handleHintPress} style={styles.hintButton}>
          <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#FFD700" />
        </Pressable>
      </View>
      
      <Text style={styles.question}>{question}</Text>
      
      <View style={styles.puzzleContainer}>
        {children}
      </View>

      {showHint && (
        <Animated.View 
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.hintContainer}
        >
          <BlurView intensity={90} style={styles.hintBlur}>
            <Text style={styles.hintText}>{hint}</Text>
            <Pressable onPress={() => setShowHint(false)} style={styles.closeHint}>
              <MaterialCommunityIcons name="close" size={24} color="#fff" />
            </Pressable>
          </BlurView>
        </Animated.View>
      )}

      {isComplete && (
        <Animated.View 
          entering={FadeIn}
          style={styles.completeBanner}
        >
          <Text style={styles.completeText}>Great job! 🎉</Text>
          {!hintUsed && (
            <Text style={styles.bonusText}>+Bonus: No hint used!</Text>
          )}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  hintButton: {
    padding: 10,
  },
  question: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  puzzleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hintBlur: {
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  hintText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeHint: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  completeBanner: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  completeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bonusText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
});