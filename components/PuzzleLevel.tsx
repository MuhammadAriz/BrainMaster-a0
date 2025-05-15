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
  onComplete: () => void;
  onSkip: () => void;
  onGoHome: () => void;
  children: React.ReactNode;
}

export const PuzzleLevel: React.FC<PuzzleLevelProps> = ({
  level,
  question,
  hint,
  isComplete = false,
  onComplete,
  onSkip,
  onGoHome,
  children
}) => {  const [bulbs, setBulbs] = useState(5); // Start with 5 bulbs  const [bulbs, setBulbs] = useState(5);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('bulbs').then(stored => {
      if (stored) setBulbs(parseInt(stored));
    });
  }, []);

  const saveBulbs = async (count: number) => {
    await AsyncStorage.setItem('bulbs', count.toString());
    setBulbs(count);
  };

  const handleHintPress = () => {
    if (bulbs > 0) {
      setBulbs(prev => prev - 1);
      setShowHint(true);
      setHintUsed(true);
      setCurrentHintIndex(prev => prev + 1);
    } else {
      toast.error('No bulbs left! Complete more levels to earn bulbs.');
    }
  };

  const handleSkip = () => {
    if (bulbs >= 3) {
      setBulbs(prev => prev - 3);
      onSkip();
    } else {
      toast.error('Need 3 bulbs to skip! Complete more levels to earn bulbs.');
    }
  };  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable 
            onPress={onGoHome} 
            style={styles.iconButton}
            accessibilityLabel="Go to home screen"
          >
            <MaterialCommunityIcons name="home" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.levelText}>Level {level}</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable 
            onPress={handleHintPress} 
            style={styles.iconButton}
            accessibilityLabel="Show hint"
          >
            <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#FFD700" />
          </Pressable>
          <Pressable 
            onPress={onSkip} 
            style={styles.iconButton}
            accessibilityLabel="Skip level"
          >
            <MaterialCommunityIcons name="skip-next" size={24} color="#fff" />
          </Pressable>
        </View>
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
  },  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 8,
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