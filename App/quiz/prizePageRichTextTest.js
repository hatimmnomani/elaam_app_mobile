// Test for PrizePageScreen RichTextParser integration
import { RichTextParser } from './components/RichTextContent/parser';

// Test data for trophy description parsing
export const prizePageTestData = {
  // Test case 1: JSON content (structured from editor)
  jsonDescription: RichTextParser.contentToJson([
    {
      id: 'prize-desc-1',
      type: 'heading',
      level: 1,
      style: {
        direction: 'rtl',
        textAlign: 'center'
      },
      children: [
        {
          text: 'تهانينا!',
          style: { color: '#10b981', bold: true }
        }
      ]
    },
    {
      id: 'prize-desc-2',
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'right'
      },
      children: [
        {
          text: 'لقد فزت بجائزة خاصة لإجابتك الصحيحة.',
          style: {}
        }
      ]
    }
  ]),

  // Test case 2: Formatted text
  formattedDescription: '**تهانينا!** لقد فزت بجائزة *خاصة* لإجابتك الصحيحة.',

  // Test case 3: Plain text
  plainDescription: 'تهانينا! لقد فزت بجائزة خاصة لإجابتك الصحيحة.',

  // Test case 4: Already structured content
  structuredDescription: [
    {
      id: 'structured-1',
      type: 'paragraph',
      style: {
        direction: 'rtl',
        textAlign: 'center'
      },
      children: [
        {
          text: 'جائزة خاصة',
          style: { bold: true, color: '#f59e0b' }
        }
      ]
    }
  ]
};

// Test function to verify PrizePageScreen parsing logic
export const testPrizePageParsing = () => {
  console.log('=== PrizePageScreen Parsing Test ===');

  const testCases = [
    { name: 'JSON Content', data: prizePageTestData.jsonDescription },
    { name: 'Formatted Text', data: prizePageTestData.formattedDescription },
    { name: 'Plain Text', data: prizePageTestData.plainDescription },
    { name: 'Structured Content', data: prizePageTestData.structuredDescription }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`\n--- Test Case ${index + 1}: ${testCase.name} ---`);

    try {
      let result;

      if (Array.isArray(testCase.data)) {
        // Already structured content
        result = testCase.data;
        console.log('✅ Already structured content - using directly');
      } else if (typeof testCase.data === 'string') {
        // String content - try parsing
        try {
          const parsed = JSON.parse(testCase.data);
          if (Array.isArray(parsed)) {
            result = parsed;
            console.log('✅ Parsed as JSON content');
          } else {
            result = RichTextParser.parseTextToContent(testCase.data);
            console.log('✅ Parsed as plain text');
          }
        } catch (e) {
          try {
            const formatted = RichTextParser.parseFormattedText(testCase.data);
            if (formatted.length > 0) {
              result = formatted;
              console.log('✅ Parsed as formatted text');
            } else {
              result = RichTextParser.parseTextToContent(testCase.data);
              console.log('✅ Parsed as plain text (fallback)');
            }
          } catch (e) {
            result = RichTextParser.parseTextToContent(testCase.data);
            console.log('✅ Parsed as plain text (final fallback)');
          }
        }
      } else {
        result = testCase.data;
        console.log('✅ Object content - using directly');
      }

      console.log(`Result: ${result.length} blocks`);
      console.log(`First block type: ${result[0]?.type || 'N/A'}`);

      return {
        testCase: testCase.name,
        success: result.length > 0,
        result
      };

    } catch (error) {
      console.log(`❌ Error in ${testCase.name}:`, error.message);
      return {
        testCase: testCase.name,
        success: false,
        error: error.message
      };
    }
  });
};

// Test the actual parsing logic used in PrizePageScreen
export const testPrizePageSmartParsing = () => {
  console.log('=== PrizePageScreen Smart Parsing Test ===');

  const testData = prizePageTestData;

  // Simulate the useMemo logic from PrizePageScreen
  const parseDescription = (description) => {
    if (!description) return [];

    // If description is already structured content (array), use it directly
    if (Array.isArray(description)) {
      return description;
    }

    // If description is an object, use as-is
    if (description && typeof description === 'object') {
      return description;
    }

    // If description is a string, try to parse it
    if (typeof description === 'string') {
      try {
        const parsed = JSON.parse(description);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch (e) {
        // Try formatted text parsing
        try {
          const formatted = RichTextParser.parseFormattedText(description);
          if (formatted.length > 0) {
            return formatted;
          }
        } catch (e) {
          // Fall back to plain text
        }
      }

      // Convert plain text to structured content
      return RichTextParser.parseTextToContent(description);
    }

    return [];
  };

  // Test all cases
  const results = Object.entries(testData).map(([key, value]) => {
    const result = parseDescription(value);
    return {
      testCase: key,
      inputType: Array.isArray(value) ? 'array' : typeof value,
      outputBlocks: result.length,
      success: result.length > 0
    };
  });

  console.log('Results:');
  results.forEach(result => {
    console.log(`- ${result.testCase}: ${result.inputType} → ${result.outputBlocks} blocks (${result.success ? '✅' : '❌'})`);
  });

  return results;
};
