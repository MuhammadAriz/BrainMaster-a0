import { LightBulbPuzzle } from '../components/puzzles/LightBulbPuzzle';
import { CountingPuzzle } from '../components/puzzles/CountingPuzzle';
import { WordPuzzle } from '../components/puzzles/WordPuzzle';
import { PatternPuzzle } from '../components/puzzles/PatternPuzzle';
import { ColorPuzzle } from '../components/puzzles/ColorPuzzle';
import { MathPuzzle } from '../components/puzzles/MathPuzzle';

const puzzleTypes = {
  LIGHT: LightBulbPuzzle,
  COUNT: CountingPuzzle,
  WORD: WordPuzzle,
  PATTERN: PatternPuzzle,
  COLOR: ColorPuzzle,
  MATH: MathPuzzle,
};

const generateUniqueLevels = () => {
  const levels: Record<number, any> = {};
  
  // Categories of puzzles with unique challenges
  const puzzleCategories = {
    MATH: [
      {
        question: "Find the missing number in the sequence: 2, 6, 12, 20, ?",
        hints: [
          "Look at how much the difference increases each time",
          "The difference increases by 2 each time: 4, 6, 8...",
          "Add 10 to 20"
        ],
        answer: 30,
        component: puzzleTypes.MATH
      },
      {
        question: "Solve: If 5 cats catch 5 mice in 5 minutes, how many cats catch 100 mice in 100 minutes?",
        hints: [
          "Start by finding how many mice one cat catches in 5 minutes",
          "Then calculate how many mice one cat catches in 100 minutes",
          "Finally, solve for the number of cats needed"
        ],
        answer: 5,
        component: puzzleTypes.MATH
      }
    ],
    PHYSICS: [
      {
        question: "A ball is dropped from 100m. If gravity is 10 m/s², how long will it take to reach the ground?",
        hints: [
          "Use the formula: distance = (1/2) × gravity × time²",
          "Rearrange the formula to solve for time",
          "Square root of (2 × distance / gravity)"
        ],
        answer: "4.47 seconds",
        component: puzzleTypes.MATH
      }
    ],
    LOGIC: [
      {
        question: "Arrange 6 matchsticks to make 4 equilateral triangles",
        hints: [
          "Think in three dimensions",
          "Consider making a pyramid",
          "Three matchsticks at the base, three meeting at a point above"
        ],
        component: puzzleTypes.PATTERN
      }
    ],
    COLOR: [
      {
        question: "Mix primary colors to create secondary colors. What makes purple?",
        hints: [
          "Primary colors are Red, Blue, and Yellow",
          "You need two primary colors",
          "Red + Blue = Purple"
        ],
        component: puzzleTypes.COLOR
      }
    ],
    MEMORY: [
      {
        question: "Remember the sequence of symbols: ★ ◆ ● ▲ ■",
        hints: [
          "Group the symbols into pairs",
          "Create a story with the shapes",
          "Star-Diamond, Circle-Triangle, Square"
        ],
        component: puzzleTypes.PATTERN
      }
    ],
    GENERAL_KNOWLEDGE: [
      {
        question: "Arrange these planets in order from closest to farthest from the Sun",
        hints: [
          "Mercury is closest to the Sun",
          "Earth is the third planet",
          "Mars is between Earth and Jupiter"
        ],
        component: puzzleTypes.PATTERN
      }
    ]
  };

  // Generate 100 unique levels
  let levelCount = 1;
  for (const category in puzzleCategories) {
    const puzzles = puzzleCategories[category];
    for (const puzzle of puzzles) {
      if (levelCount <= 100) {
        levels[levelCount] = {
          ...puzzle,
          type: category,
          difficulty: levelCount <= 33 ? 'easy' : 
                     levelCount <= 66 ? 'medium' : 'hard'
        };
        levelCount++;
      }
    }
  }

  // Generate 100 unique levels with variations
  for (let i = 1; i <= 100; i++) {
    const baseTemplate = levelTemplates[Math.floor(Math.random() * levelTemplates.length)];
    const difficulty = i <= 33 ? 'easy' : i <= 66 ? 'medium' : 'hard';
    
    // Create unique variations based on level number
    const variations = {
      Logic: [
        "Find the hidden switch in darkness",
        "Power up the ancient mechanism",
        "Light up the path in sequence",
        "Balance the energy flow",
        "Synchronize the light patterns"
      ],
      Visual: [
        "Count the overlapping shapes",
        "Find all hidden patterns",
        "Identify the correct sequence",
        "Match the mirror images",
        "Spot the differences"
      ],
      Word: [
        "Rearrange letters to form a new word",
        "Complete the missing sequence",
        "Transform one word into another",
        "Find the hidden message",
        "Decode the ancient text"
      ],
      Pattern: [
        "Reproduce the shifting pattern",
        "Complete the geometric sequence",
        "Match the dynamic shapes",
        "Follow the color code",
        "Align the sacred symbols"
      ],
      Color: [
        "Mix the primary colors",
        "Create the perfect blend",
        "Match the color sequence",
        "Balance the spectrum",
        "Find the complementary pairs"
      ],
      Math: [
        "Solve the number puzzle",
        "Balance the equation",
        "Find the missing value",
        "Complete the sequence",
        "Calculate the perfect combination"
      ]
    };

    const questionVariations = variations[baseTemplate.type as keyof typeof variations];
    const randomVariation = questionVariations[Math.floor(Math.random() * questionVariations.length)];

    levels[i] = {
      ...baseTemplate,
      question: randomVariation,
      hint: `${difficulty === 'hard' ? 'Challenging: ' : ''}${baseTemplate.hint}`,
      difficulty
    };
  }

  return levels;
};

const levels = generateUniqueLevels();

export const getLevelData = (levelId: number) => {
  return levels[levelId] || null;
};