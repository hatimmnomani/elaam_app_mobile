// Mock data for QuizResultScreen with RichTextParser integration
import { RichTextParser } from '../components/RichTextContent/parser';

// Sample submission result with rich text answer descriptions
export const mockQuizResultData = {
  headerText: 'Quiz Result',
  correctAnswerText: 'Your answer is correct!',
  sectionTitle: 'Quiz Feedback',
  mainTitle: 'Learn More About Your Answer',
  websiteUrl: 'https://example.com',
  prizeDescription:
    'حضوراعلى  ني ناياب تصوير انے ذكراٰپنـے جائزة نا طور  پر فضل تهئي چھے',
  prizeButtonText: 'اٰپنو جائزة  (Prize) حاصل كرئيے ',
  didYouKnowTitle: 'Did You Know?',
  statistics: [
    { label: 'Questions Answered', value: '15' },
    { label: 'Correct Answers', value: '12' },
    { label: 'Accuracy', value: '80%' },
  ],
};

// Sample submission result data with rich text descriptions
export const sampleSubmissionResult = {
  isCorrect: true,
  correctAnswer: 'الإجابة الصحيحة',
  submittedAnswer: 'الإجابة المختارة',
  correctAnswerDesc: RichTextParser.contentToJson([
    {
      id: 'correct-feedback',
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'center',
      },
      children: [
        {
          text: 'إجابة صحيحة! أحسنت في اختيار الإجابة الصحيحة.',
          style: { color: '#10b981', bold: true },
        },
      ],
    },
    {
      id: 'correct-explanation',
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'right',
      },
      children: [
        {
          text: 'التفسير: هذه الإجابة صحيحة لأنها تتوافق مع المعلومات المقدمة في النص الأصلي.',
          style: {},
        },
      ],
    },
    {
      id: 'additional-info',
      type: 'list-bullet',
      style: {
        direction: 'rtl',
        textAlign: 'right',
      },
      items: [
        {
          id: 'info-1',
          children: [
            {
              text: 'النقطة الأولى: دراسة المحتوى بعناية',
              style: {},
            },
          ],
        },
        {
          id: 'info-2',
          children: [
            {
              text: 'النقطة الثانية: فهم السؤال بشكل صحيح',
              style: { italic: true },
            },
          ],
        },
      ],
    },
  ]),

  wrongAnswerDesc: RichTextParser.contentToJson([
    {
      id: 'wrong-feedback',
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'center',
      },
      children: [
        {
          text: 'إجابة خاطئة. للأسف، هذه ليست الإجابة الصحيحة.',
          style: { color: '#ef4444', bold: true },
        },
      ],
    },
    {
      id: 'wrong-explanation',
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'right',
      },
      children: [
        {
          text: 'التفسير: الإجابة الصحيحة مختلفة. يرجى مراجعة المحتوى مرة أخرى.',
          style: {},
        },
      ],
    },
    {
      id: 'learning-points',
      type: 'heading',
      level: 2,
      style: {
        direction: 'rtl',
        textAlign: 'right',
      },
      children: [
        {
          text: 'نقاط التعلم:',
          style: { underline: true },
        },
      ],
    },
    {
      id: 'learning-list',
      type: 'list-numbered',
      style: {
        direction: 'rtl',
        textAlign: 'right',
      },
      items: [
        {
          id: 'learn-1',
          children: [
            {
              text: 'اقرأ السؤال بعناية قبل الإجابة',
              style: {},
            },
          ],
        },
        {
          id: 'learn-2',
          children: [
            {
              text: 'راجع جميع الخيارات المتاحة',
              style: { bold: true },
            },
          ],
        },
        {
          id: 'learn-3',
          children: [
            {
              text: 'استشر المراجع إذا لزم الأمر',
              style: {},
            },
          ],
        },
      ],
    },
  ]),
};

// Test function to validate the mock data
export const validateQuizResultMockData = () => {
  console.log('=== QuizResult Mock Data Validation ===');

  try {
    // Test correct answer description parsing
    const correctContent = RichTextParser.jsonToContent(
      sampleSubmissionResult.correctAnswerDesc,
    );
    console.log(
      '✅ Correct answer description:',
      correctContent.length,
      'blocks',
    );

    // Test wrong answer description parsing
    const wrongContent = RichTextParser.jsonToContent(
      sampleSubmissionResult.wrongAnswerDesc,
    );
    console.log('✅ Wrong answer description:', wrongContent.length, 'blocks');

    // Test content structure
    const hasValidStructure =
      correctContent.length >= 3 && // Should have at least 3 blocks
      wrongContent.length >= 4 && // Should have at least 4 blocks
      correctContent.some(block => block.type === 'paragraph') &&
      wrongContent.some(block => block.type === 'list-numbered');

    console.log('✅ Mock data structure valid:', hasValidStructure);

    return {
      correctContent,
      wrongContent,
      isValid: hasValidStructure,
    };
  } catch (error) {
    console.error('❌ Error validating mock data:', error);
    return null;
  }
};
