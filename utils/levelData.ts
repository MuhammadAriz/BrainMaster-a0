import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LightBulbPuzzle } from '../components/puzzles/LightBulbPuzzle';
import { CountingPuzzle } from '../components/puzzles/CountingPuzzle';
import { WordPuzzle } from '../components/puzzles/WordPuzzle';
import { MathPuzzle } from '../components/puzzles/MathPuzzle';
import { PatternPuzzle } from '../components/puzzles/PatternPuzzle';
import { LogicPuzzle } from '../components/puzzles/LogicPuzzle';
import { ColorPuzzle } from '../components/puzzles/ColorPuzzle';

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
  // Math & Logic Puzzles (1-5)
  1: {
    id: 1,
    title: "Odd One Out",
    category: 'MATH',
    difficulty: 'easy',
    question: "Find the number that doesn't follow the pattern: 3, 5, 7, 9",
    hint: "Look at how the numbers increase between each value. Which number breaks the pattern?",
    component: LogicPuzzle,
    config: {
      numbers: [3, 5, 7, 9],
      answer: 5
    }
  },

  2: {
    id: 2,
    title: "Light the Bulb",
    category: 'LOGIC',
    difficulty: 'easy',
    question: "Turn on the light bulb. The switch might not work as expected...",
    hint: "Sometimes you need to warm up the bulb first. Try tapping it multiple times!",
    component: LightBulbPuzzle
  },

  3: {
    id: 3,
    title: "Count the Triangles",
    category: 'MATH',
    difficulty: 'easy',
    question: "How many triangles can you find in this figure?",
    hint: "Don't forget to count the triangles formed by smaller triangles!",
    component: CountingPuzzle
  },

  4: {
    id: 4,
    title: "Word Transform",
    category: 'LOGIC',
    difficulty: 'easy',
    question: "Transform 'RATS' into 'STAR'",
    hint: "You can rotate letters to make new ones. Try rotating 'S'!",
    component: WordPuzzle
  },

  5: {
    id: 5,
    title: "Simple Math",
    category: 'MATH',
    difficulty: 'easy',
    question: "Create an equation that equals 10 using the numbers provided",
    hint: "Try combining addition and multiplication",
    component: MathPuzzle,
    config: {
      numbers: [2, 3, 4, 5],
      target: 10
    }
  },

  // Pattern Recognition (6-10)
  6: {
    id: 6,
    title: "Color Sequence",
    category: 'LOGIC',
    difficulty: 'easy',
    question: "Repeat the color pattern shown",
    hint: "Pay attention to the order of colors!",
    component: ColorPuzzle,
    config: {
      sequence: ['red', 'blue', 'yellow']
    }
  },

  7: {
    id: 7,
    title: "Pattern Match",
    category: 'LOGIC',
    difficulty: 'easy',
    question: "Complete the pattern by selecting dots in the correct order",
    hint: "The pattern follows a clockwise direction",
    component: PatternPuzzle,
    config: {
      pattern: [0, 2, 1, 3]
    }
  },

  8: {
    id: 8,
    title: "Math Magic",
    category: 'MATH',
    difficulty: 'easy',
    question: "Make 15 using three numbers",
    hint: "Try using both addition and multiplication",
    component: MathPuzzle,
    config: {
      numbers: [3, 5, 7, 2],
      target: 15
    }
  },

  9: {
    id: 9,
    title: "Word Puzzle",
    category: 'LOGIC',
    difficulty: 'easy',
    question: "Make 'STOP' from 'POST'",
    hint: "Think about how letters can be rearranged",
    component: WordPuzzle,
    config: {
      word: 'POST',
      target: 'STOP'
    }
  },

  10: {
    id: 10,
    title: "Light Pattern",
    category: 'LOGIC',
    difficulty: 'medium',
    question: "Create a specific pattern of lights",
    hint: "The middle light needs to be activated last",
    component: LightBulbPuzzle,
    config: {
      pattern: true
    }
  }
};

// Helper function to get level data
export const getLevelData = (levelId: number): Level | null => {
  return levels[levelId] || null;
};
