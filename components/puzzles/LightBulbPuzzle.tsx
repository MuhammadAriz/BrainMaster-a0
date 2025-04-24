import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  interpolateColor
} from 'react-native-reanimated';

interface LightBulbPuzzleProps {
  onComplete: () => void;
}

export const LightBulbPuzzle: React.FC<LightBulbPuzzleProps> = ({ onComplete }) => {
  const [switchOn, setSwitchOn] = useState(false);
  const [bulbPressed, setBulbPressed] = useState(0);
  
  const bulbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(switchOn ? 1.2 : 1) }],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      switchOn ? 1 : 0,
      [0, 1],
      ['#1a1a1a', '#FFD700']
    );
    return { backgroundColor };
  });

  const handleBulbPress = () => {
    setBulbPressed(prev => prev + 1);
    if (bulbPressed >= 2) {
      setSwitchOn(true);
      onComplete();
    }
  };

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <Pressable onPress={handleBulbPress}>
        <Animated.View style={[styles.bulb, bulbStyle]}>
          <MaterialCommunityIcons 
            name={switchOn ? 'lightbulb-on' : 'lightbulb-outline'} 
            size={100} 
            color={switchOn ? '#FFD700' : '#666'} 
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  bulb: {
    padding: 20,
  },
});