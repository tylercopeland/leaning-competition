// Generate 5 Grade 6 Math Questions
export function generateGrade6MathQuestions() {
  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is 15 × 8?',
      options: ['100', '120', '130', '140'],
      correctAnswer: '120'
    },
    {
      id: 2,
      type: 'free-text',
      question: 'Solve: 3/4 + 1/2 = ?',
      correctAnswer: '1.25' // Accept multiple formats
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'What is the area of a rectangle with length 12 cm and width 8 cm?',
      options: ['80 cm²', '96 cm²', '100 cm²', '104 cm²'],
      correctAnswer: '96 cm²'
    },
    {
      id: 4,
      type: 'free-text',
      question: 'What is 25% of 80?',
      correctAnswer: '20'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: 'Which number is prime?',
      options: ['15', '17', '21', '25'],
      correctAnswer: '17'
    }
  ];

  return questions;
}

// Parse questions from text format (for backwards compatibility)
export function parseQuestions(text) {
  if (!text || !text.trim()) return [];
  
  // Try to parse as JSON first
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // Not JSON, continue with text parsing
  }

  // If text contains structured questions, parse them
  // Otherwise, generate default questions
  return generateGrade6MathQuestions();
}

