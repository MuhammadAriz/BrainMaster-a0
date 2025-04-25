import { LightBulbPuzzle } from '../components/puzzles/LightBulbPuzzle';
import { CountingPuzzle } from '../components/puzzles/CountingPuzzle';
import { WordPuzzle } from '../components/puzzles/WordPuzzle';

export const getLevelData = (levelId: number) => {
  // This will contain all 100 levels with their specific data
  const levels: Record<number, any> = {
    1: {
      type: 'Logic',
      question: "Turn on the light! But remember... sometimes the obvious solution isn't the right one.",
      hint: "Try tapping the bulb multiple times to warm it up!",
      component: LightBulbPuzzle,
      difficulty: 'easy'
    },
    2: {
      type: 'Visual',
      question: "How many triangles can you find? Count carefully!",
      hint: "Don't forget to count the triangles formed by smaller ones!",
      component: CountingPuzzle,
      difficulty: 'easy'
    },
    3: {
      type: 'Word',
      question: "Transform 'RATS' into 'STAR' by rotating only one letter!",
      hint: "One of these letters looks similar when rotated...",
      component: WordPuzzle,
      difficulty: 'easy'
    }
  };

  // Generate remaining levels programmatically
  for (let i = 4; i <= 100; i++) {
    const puzzleType = i % 3; // Alternate between puzzle types for now
    levels[i] = {
      type: ['Logic', 'Visual', 'Word'][puzzleType],
      question: getPuzzleQuestion(i, puzzleType),
      hint: getPuzzleHint(i, puzzleType),
      component: [LightBulbPuzzle, CountingPuzzle, WordPuzzle][puzzleType],
      difficulty: i <= 33 ? 'easy' : i <= 66 ? 'medium' : 'hard'
    };
  }

  return levels[levelId] || null;
};

function getPuzzleQuestion(level: number, type: number): string {
  const questions = [
    [
      "Find a way to illuminate the darkness!",
      "Power up the circuit to proceed!",
      "Light up the room using your creativity!",
      "Find the hidden switch mechanism!",
      "Activate the ancient light source!"
    ],
    [
      "Count all the shapes you can find!",
      "How many patterns can you spot?",
      "Find the total number of geometric forms!",
      "Calculate the sum of all visible figures!",
      "Count every shape, even the hidden ones!"
    ],
    [
      "Rearrange the letters to find the solution!",
      "Transform this word into another!",
      "Solve this letter puzzle!",
      "Find the hidden word by rotating letters!",
      "Make a new word from these letters!"
    ]
  ];

  return questions[type][level % 5];
}

function getPuzzleHint(level: number, type: number): string {
  const hints = [
    [
      "Try interacting with different parts of the puzzle!",
      "Some elements might need multiple interactions!",
      "Think about how real lights work!",
      "Look for patterns in the behavior!",
      "Try a different approach than the obvious one!"
    ],
    [
      "Remember to look for overlapping shapes!",
      "Don't forget to count combinations!",
      "Break down the pattern into smaller parts!",
      "Look for shapes within shapes!",
      "Consider all possible formations!"
    ],
    [
      "Some letters might look different when rotated!",
      "Try rotating each letter to see what happens!",
      "Think about symmetry in letters!",
      "One rotation might be all you need!",
      "Look for letters that could become others!"
    ]
  ];

  return hints[type][level % 5];
}