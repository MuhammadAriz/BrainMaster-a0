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
  
  // Example unique levels (we'll create more variations)
  const levelTemplates = [
    {
      type: 'Logic',
      question: "Turn on the light! But remember... sometimes the obvious solution isn't the right one.",
      hint: "Try tapping the bulb multiple times to warm it up!",
      component: puzzleTypes.LIGHT
    },
    {
      type: 'Visual',
      question: "How many triangles can you find? Count carefully!",
      hint: "Don't forget to count the triangles formed by smaller ones!",
      component: puzzleTypes.COUNT
    },
    {
      type: 'Word',
      question: "Transform 'RATS' into 'STAR' by rotating only one letter!",
      hint: "One of these letters looks similar when rotated...",
      component: puzzleTypes.WORD
    },
    {
      type: 'Pattern',
      question: "Recreate the sequence shown briefly at the start",
      hint: "Pay attention to the order of highlighted cells",
      component: puzzleTypes.PATTERN
    },
    {
      type: 'Color',
      question: "Create the rainbow sequence using the given colors",
      hint: "Think about the natural order of rainbow colors",
      component: puzzleTypes.COLOR
    },
    {
      type: 'Math',
      question: "Use the numbers and operators to reach the target",
      hint: "Try different combinations of operations",
      component: puzzleTypes.MATH
    }
  ];

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