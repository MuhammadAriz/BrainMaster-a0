import { LightBulbPuzzle } from '../components/puzzles/LightBulbPuzzle';
import { CountingPuzzle } from '../components/puzzles/CountingPuzzle';
import { WordPuzzle } from '../components/puzzles/WordPuzzle';
import { MatchPuzzle } from '../components/puzzles/MatchPuzzle';
import { SequencePuzzle } from '../components/puzzles/SequencePuzzle';
import { MathPuzzle } from '../components/puzzles/MathPuzzle';
import { PatternPuzzle } from '../components/puzzles/PatternPuzzle';
import { MemoryPuzzle } from '../components/puzzles/MemoryPuzzle';
import { LogicPuzzle } from '../components/puzzles/LogicPuzzle';
import { ColorPuzzle } from '../components/puzzles/ColorPuzzle';

export const getLevelData = (levelId: number) => {
  // This will contain all 100 levels with their specific data
  const levels = {
    1: {
      type: 'Logic',
      question: "Turn on the light! But remember... sometimes the obvious solution isn't the right one.",
      hint: "What if the bulb isn't the only thing you can interact with?",
      component: LightBulbPuzzle,
      difficulty: 'easy'
    },
    2: {
      type: 'Visual',
      question: "How many triangles can you find? Tap the correct number!",
      hint: "Look carefully! Some triangles might be formed by smaller ones.",
      component: CountingPuzzle,
      difficulty: 'easy'
    },
    3: {
      type: 'Word',
      question: "Transform 'RATS' into 'STAR' by moving only ONE letter",
      hint: "Think about how letters can be rotated...",
      component: WordPuzzle,
      difficulty: 'easy'
    },
    // ... Add more levels here
  };

  return levels[levelId] || null;
};