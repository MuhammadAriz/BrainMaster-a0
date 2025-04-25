import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PuzzleLevel } from '../components/PuzzleLevel';
import { getLevelData } from '../utils/levelData';

export default function GameLevelScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const levelId = route.params?.levelId;
  const [levelData, setLevelData] = useState(null);

  useEffect(() => {
    const levelInfo = getLevelData(levelId);
    setLevelData(levelInfo);

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [levelId]);

  const handleLevelComplete = async (stars: number) => {
    try {
      const progress = await AsyncStorage.getItem('levelProgress');
      const savedProgress = progress ? JSON.parse(progress) : {};
      
      savedProgress[levelId] = {
        completed: true,
        stars: stars,
        completedAt: new Date().toISOString()
      };

      await AsyncStorage.setItem('levelProgress', JSON.stringify(savedProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (!levelData) return null;

  return (
    <View style={styles.container}>      <PuzzleLevel
        level={levelId}
        question={levelData.question}
        hint={levelData.hint}
        onComplete={() => handleLevelComplete(3)} // Default to 3 stars for now
        onSkip={() => navigation.navigate('LevelSelect')}
        onGoHome={() => navigation.navigate('Home')}
      >
        {React.createElement(levelData.component, {
          onComplete: () => handleLevelComplete(3)
        })}
      </PuzzleLevel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});