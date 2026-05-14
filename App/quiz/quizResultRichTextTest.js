// Test for QuizResultScreen RichTextParser integration
import { RichTextParser } from './components/RichTextContent/parser';

// Test data for answer descriptions (JSON from editor)
export const quizResultTestData = {
  correctAnswerDesc: RichTextParser.contentToJson([
    {
      id: `correct-desc-${Date.now()}`,
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'center'
      },
      children: [
        {
          text: 'إجابة صحيحة! أحسنت في اختيار الإجابة الصحيحة.',
          style: { color: '#10b981', bold: true }
        }
      ]
    },
    {
      id: `explanation-${Date.now()}`,
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'right'
      },
      children: [
        {
          text: 'التفسير: هذه الإجابة صحيحة لأنها تتوافق مع المعلومات المقدمة في النص.',
          style: {}
        }
      ]
    }
  ]),

  wrongAnswerDesc: RichTextParser.contentToJson([
    {
      id: `wrong-desc-${Date.now()}`,
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'center'
      },
      children: [
        {
          text: 'إجابة خاطئة. للأسف، هذه ليست الإجابة الصحيحة.',
          style: { color: '#ef4444', bold: true }
        }
      ]
    },
    {
      id: `wrong-explanation-${Date.now()}`,
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'right'
      },
      children: [
        {
          text: 'التفسير: الإجابة الصحيحة مختلفة. يرجى مراجعة المحتوى مرة أخرى.',
          style: {}
        }
      ]
    }
  ])
};

// Test function to verify RichTextParser integration in QuizResultScreen
export const testQuizResultRichText = () => {
  console.log('=== QuizResult RichTextParser Integration Test ===');

  try {
    // Test parsing correct answer description
    const correctContent = RichTextParser.jsonToContent(quizResultTestData.correctAnswerDesc);
    console.log('✅ Correct answer description parsed:', correctContent.length, 'blocks');
    console.log('Correct answer content type:', correctContent[0]?.type);
    console.log('Correct answer direction:', correctContent[0]?.style?.direction);

    // Test parsing wrong answer description
    const wrongContent = RichTextParser.jsonToContent(quizResultTestData.wrongAnswerDesc);
    console.log('✅ Wrong answer description parsed:', wrongContent.length, 'blocks');
    console.log('Wrong answer content type:', wrongContent[0]?.type);
    console.log('Wrong answer direction:', wrongContent[0]?.style?.direction);

    // Test formatted text fallback
    const formattedText = "**Bold text** and *italic text* for answers";
    const formattedContent = RichTextParser.parseFormattedText(formattedText);
    console.log('✅ Formatted text fallback works:', formattedContent.length, 'blocks');

    // Test plain text fallback
    const plainText = "This is a plain text answer description.";
    const plainContent = RichTextParser.parseTextToContent(plainText);
    console.log('✅ Plain text fallback works:', plainContent.length, 'paragraphs');

    const success = (
      correctContent.length > 0 &&
      wrongContent.length > 0 &&
      formattedContent.length > 0 &&
      plainContent.length > 0
    );

    console.log('✅ QuizResult RichTextParser integration test:', success ? 'PASSED' : 'FAILED');

    return {
      correctContent,
      wrongContent,
      formattedContent,
      plainContent,
      success
    };
  } catch (error) {
    console.error('❌ Error in QuizResult RichTextParser test:', error);
    return null;
  }
};

// Test InfoSection integration
export const testInfoSectionRichText = () => {
  console.log('=== InfoSection RichTextParser Integration Test ===');

  const testContent = [
    quizResultTestData.correctAnswerDesc, // JSON content
    "**Bold formatted** *text*", // Formatted text
    "Plain text content", // Plain text
    RichTextParser.createSampleContent() // Sample content
  ];

  try {
    const parsedContent = testContent.map((item, index) => {
      if (typeof item === 'string') {
        try {
          const parsed = JSON.parse(item);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        } catch (e) {
          // Try formatted text parsing
          try {
            const formatted = RichTextParser.parseFormattedText(item);
            if (formatted.length > 0) {
              return formatted;
            }
          } catch (e) {
            // Fall back to plain text
          }
        }
        return RichTextParser.parseTextToContent(item);
      }
      return item;
    }).filter(content => content && content.length > 0);

    console.log('✅ InfoSection parsed content:', parsedContent.length, 'items');
    console.log('All content types supported:', parsedContent.length === 4 ? 'YES' : 'NO');

    return {
      parsedContent,
      success: parsedContent.length === 4
    };
  } catch (error) {
    console.error('❌ Error in InfoSection test:', error);
    return null;
  }
};
