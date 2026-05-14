// Validation script for QuizResultScreen imports
console.log('=== QuizResultScreen Import Validation ===');

// Test 1: Test RichTextParser import
try {
  const { RichTextParser } = require('./App/quiz/components/RichTextContent/parser.ts');
  console.log('✅ RichTextParser import: SUCCESS');

  // Test basic functionality
  const sampleContent = RichTextParser.createSampleContent();
  console.log('✅ RichTextParser.createSampleContent(): SUCCESS');

  const jsonContent = RichTextParser.contentToJson(sampleContent);
  console.log('✅ RichTextParser.contentToJson(): SUCCESS');

  const parsedContent = RichTextParser.jsonToContent(jsonContent);
  console.log('✅ RichTextParser.jsonToContent(): SUCCESS');

} catch (error) {
  console.log('❌ RichTextParser import: FAILED', error.message);
}

// Test 2: Test mock data import
try {
  const { mockQuizResultData } = require('./App/quiz/mockData/quizResultMockData.js');
  console.log('✅ mockQuizResultData import: SUCCESS');
  console.log('Mock data keys:', Object.keys(mockQuizResultData));
} catch (error) {
  console.log('❌ mockQuizResultData import: FAILED', error.message);
}

// Test 3: Test component imports
const components = [
  'SuccessHeader',
  'InfoSection',
  'PrizeButton',
  'BackNavigationButton',
  'SecureScreen'
];

components.forEach(componentName => {
  try {
    require(`./App/quiz/components/${componentName}.js`);
    console.log(`✅ ${componentName} import: SUCCESS`);
  } catch (error) {
    console.log(`❌ ${componentName} import: FAILED`, error.message);
  }
});

console.log('=== Import Validation Complete ===');
