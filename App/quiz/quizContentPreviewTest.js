// Test content for quiz description and question content preview
// Using RichTextParser methods for proper parsing
import { RichTextParser } from './components/RichTextContent/parser';

export const quizPreviewTestContent = {
  quizDescription: RichTextParser.contentToJson([
    {
      id: `quiz-desc-${Date.now()}`,
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'right'
      },
      children: [
        {
          text: 'سؤال تجريبي لاختبار عرض المحتوى المنسق',
          style: {}
        }
      ]
    }
  ]),

  questionTitle: RichTextParser.contentToJson([
    {
      id: `question-${Date.now()}`,
      type: 'heading',
      level: 1,
      style: {
        direction: 'rtl',
        textAlign: 'center'
      },
      children: [
        {
          text: 'ما هي الإجابة الصحيحة؟',
          style: { bold: true }
        }
      ]
    }
  ]),

  questionDescription: RichTextParser.contentToJson([
    {
      id: `question-content-${Date.now()}`,
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'right'
      },
      children: [
        {
          text: 'اختر الإجابة الصحيحة من بين الخيارات التالية:',
          style: {}
        }
      ]
    }
  ])
};

// Test function to verify quiz content preview using RichTextParser
export const testQuizContentPreview = () => {
  console.log('=== Quiz Content Preview Test ===');
  console.log('Testing RichTextParser integration...');

  try {
    // Test JSON parsing
    const parsedDesc = RichTextParser.jsonToContent(quizPreviewTestContent.quizDescription);
    const parsedQuestion = RichTextParser.jsonToContent(quizPreviewTestContent.questionTitle);
    const parsedContent = RichTextParser.jsonToContent(quizPreviewTestContent.questionDescription);

    console.log('✅ JSON parsing successful');
    console.log('Quiz Description Type:', parsedDesc[0]?.type);
    console.log('Question Title Type:', parsedQuestion[0]?.type);
    console.log('Question Content Type:', parsedContent[0]?.type);

    // Test content structure
    const hasValidStructure = (
      parsedDesc.length > 0 &&
      parsedQuestion.length > 0 &&
      parsedContent.length > 0
    );

    console.log('✅ Content structure valid:', hasValidStructure);

    // Test sample content generation
    const sampleContent = RichTextParser.createSampleContent();
    console.log('✅ Sample content generated:', sampleContent.length, 'blocks');

    return {
      quizDescription: parsedDesc,
      questionTitle: parsedQuestion,
      questionDescription: parsedContent,
      sampleContent,
      success: hasValidStructure
    };
  } catch (error) {
    console.error('❌ Error in quiz content preview test:', error);
    return null;
  }
};

// Test formatted text parsing
export const testFormattedTextParsing = () => {
  console.log('=== Formatted Text Parsing Test ===');

  const testTexts = [
    "Simple text",
    "**Bold text** and *italic text*",
    "__Underlined__ and ~strikethrough~",
    "Mix **bold with *italic*** and __**underline**__"
  ];

  testTexts.forEach((text, index) => {
    try {
      const parsed = RichTextParser.parseFormattedText(text);
      console.log(`✅ Test ${index + 1}: "${text}" -> ${parsed.length} blocks`);
    } catch (error) {
      console.log(`❌ Test ${index + 1}: "${text}" -> Error:`, error.message);
    }
  });
};

// Test plain text parsing
export const testPlainTextParsing = () => {
  console.log('=== Plain Text Parsing Test ===');

  const testTexts = [
    "Single line",
    "Multi\nline\ntext",
    "Text with    spaces",
    ""
  ];

  testTexts.forEach((text, index) => {
    try {
      const parsed = RichTextParser.parseTextToContent(text);
      console.log(`✅ Test ${index + 1}: "${text}" -> ${parsed.length} paragraphs`);
    } catch (error) {
      console.log(`❌ Test ${index + 1}: "${text}" -> Error:`, error.message);
    }
  });
};
