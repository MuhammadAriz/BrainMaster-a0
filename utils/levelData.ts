import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LightBulbPuzzle } from '../components/puzzles/LightBulbPuzzle';
import { CountingPuzzle } from '../components/puzzles/CountingPuzzle';
import { WordPuzzle } from '../components/puzzles/WordPuzzle';
import { MathPuzzle } from '../components/puzzles/MathPuzzle';
import { PhysicsPuzzle } from '../components/puzzles/PhysicsPuzzle';
import { MemoryPuzzle } from '../components/puzzles/MemoryPuzzle';
import { LogicPuzzle } from '../components/puzzles/LogicPuzzle';
import { KnowledgePuzzle } from '../components/puzzles/KnowledgePuzzle';
import { SortingPuzzle } from '../components/puzzles/SortingPuzzle';
import { StrategyPuzzle } from '../components/puzzles/StrategyPuzzle';

export interface Level {
  id: number;
  title: string;
  category: 'MATH' | 'PHYSICS' | 'KNOWLEDGE' | 'SORTING' | 'LOGIC';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  hints: string[];
  component: React.ComponentType<any>;
  config?: any;
}

const levels: Record<number, Level> = {
  // Math & Logic (1-20)
  1: {
    id: 1,
    title: "Odd One Out",
    category: 'MATH',
    difficulty: 'easy',
    question: "Which number doesn't belong in the sequence: 2, 4, 7, 8, 10?",
    hints: [
      "Look for a pattern in the numbers",
      "Most numbers follow a specific rule",
      "One number breaks the even pattern"
    ],
    component: MathPuzzle,
    config: {
      type: 'sequence',
      numbers: [2, 4, 7, 8, 10],
      answer: 7
    }
  },
  // ... continuing with more levels

  // Physics & Gravity (21-40)
  21: {
    id: 21,
    title: "Gravity Drop",
    category: 'PHYSICS',
    difficulty: 'medium',
    question: "Predict where the ball will land when dropped from this height",
    hints: [
      "Consider the gravitational force",
      "Watch for obstacles in the path",
      "Calculate the time it takes to fall"
    ],
    component: PhysicsPuzzle,
    config: {
      type: 'gravity',
      height: 100,
      obstacles: []
    }
  },
  // ... continuing with more levels

  // General Knowledge & Trivia (41-60)
  41: {
    id: 41,
    title: "Capital Match",
    category: 'KNOWLEDGE',
    difficulty: 'medium',
    question: "Match these countries to their capitals",
    hints: [
      "Start with the ones you're sure about",
      "Some capitals share similar names with their countries",
      "Use process of elimination"
    ],
    component: KnowledgePuzzle,
    config: {
      type: 'matching',
      pairs: [
        ['France', 'Paris'],
        ['Japan', 'Tokyo'],
        ['Egypt', 'Cairo']
      ]
    }
  },
  // ... continuing with more levels

  // Sorting & Memory Games (61-80)
  61: {
    id: 61,
    title: "Color Order",
    category: 'SORTING',
    difficulty: 'easy',
    question: "Arrange the colors in rainbow order",
    hints: [
      "Remember ROY G BIV",
      "Red always comes first",
      "Violet is at the end"
    ],
    component: SortingPuzzle,
    config: {
      type: 'color',
      items: ['blue', 'red', 'yellow', 'green', 'violet', 'orange']
    }
  },
  // ... continuing with more levels

  // Logic, Strategy & Creativity (81-97)
  81: {
    id: 81,
    title: "Maze Builder",
    category: 'LOGIC',
    difficulty: 'hard',
    question: "Build a path from start to finish with limited moves",
    hints: [
      "Plan your route before placing tiles",
      "You can't cross paths",
      "Use all available moves"
    ],
    component: StrategyPuzzle,
    config: {
      type: 'maze',
      gridSize: 5,
      moves: 8
    }
  }
  // ... continuing with remaining levels
};

export const getLevelData = (levelId: number): Level | null => {
  return levels[levelId] || null;
};