import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PuzzleLevel } from '../components/PuzzleLevel';
import { LightBulbPuzzle } from '../components/puzzles/LightBulbPuzzle';
import { CountingPuzzle } from '../components/puzzles/CountingPuzzle';
import { WordPuzzle } from '../components/puzzles/WordPuzzle';

export default function HomeScreen() {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const handleLevelComplete = (level: number) => {
    if (!completedLevels.includes(level)) {
      setCompletedLevels([...completedLevels, level]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PuzzleLevel
        level={1}
        question="Turn on the light! But remember... sometimes the obvious solution isn't the right one."
        hint="What if the bulb isn't the only thing you can interact with?"
        isComplete={completedLevels.includes(1)}
        onComplete={() => handleLevelComplete(1)}
      >
        <LightBulbPuzzle onComplete={() => handleLevelComplete(1)} />
      </PuzzleLevel>

      {completedLevels.includes(1) && (
        <PuzzleLevel
          level={2}
          question="How many triangles do you see? Tap the correct number!"
          hint="Look carefully! Some triangles might be formed by smaller ones."
          isComplete={completedLevels.includes(2)}
          onComplete={() => handleLevelComplete(2)}
        >
          <CountingPuzzle onComplete={() => handleLevelComplete(2)} />
        </PuzzleLevel>
      )}

      {completedLevels.includes(2) && (
        <PuzzleLevel
          level={3}
          question="Make the word 'STAR' by moving only ONE letter"
          hint="Think about how letters can be rotated..."
          isComplete={completedLevels.includes(3)}
          onComplete={() => handleLevelComplete(3)}
        >
          <WordPuzzle onComplete={() => handleLevelComplete(3)} />
        </PuzzleLevel>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});