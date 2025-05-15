import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LightBulbPuzzle } from '../components/puzzles/LightBulbPuzzle';
import { CountingPuzzle } from '../components/puzzles/CountingPuzzle';
import { WordPuzzle } from '../components/puzzles/WordPuzzle';
import { MathPuzzle } from '../components/puzzles/MathPuzzle';
import { PatternPuzzle } from '../components/puzzles/PatternPuzzle';
import { LogicPuzzle } from '../components/puzzles/LogicPuzzle';

export interface Level {
  id: number;
  title: string;
  category: 'MATH' | 'PHYSICS' | 'LOGIC' | 'KNOWLEDGE' | 'SORTING' | 'STRATEGY';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  hint: string;
  component: React.ComponentType<any>;
  config?: any;
}

const levels: Record<number, Level> = {
  1: {
    id: 1,
    title: "Odd One Out",
    category: 'LOGIC',
    difficulty: 'easy',
    question: "Find the number that doesn't follow the pattern: 3, 5, 7, 9",
    hint: "Look at how the numbers increase between each value",
    component: LogicPuzzle,
    config: {
      numbers: [3, 5, 7, 9],
      answer: 5
    }
  },

  2: {
    id: 2,
    title: "Pattern Recognition",
    category: 'LOGIC',
    difficulty: 'easy',
    question: "Complete the sequence by selecting the correct pattern",
    hint: "Watch how the pattern moves clockwise",
    component: PatternPuzzle,
    config: {
      sequence: [1, 2, 3, 1]
    }
  },

  3: {
    id: 3,
    title: "Math Magic",
    category: 'MATH',
    difficulty: 'easy',
    question: "Find the equation that equals 10",
    hint: "Try combining addition and multiplication",
    component: MathPuzzle,
    config: {
      target: 10,
      numbers: [2, 3, 4, 5]
    }
  }
};

export const getLevelData = (levelId: number): Level | null => {
  return levels[levelId] || null;
};