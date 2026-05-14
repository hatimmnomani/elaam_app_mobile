import type { Content, Block, InlineText } from './quizPreviewTypes';

/**
 * Converts quiz question text to rich text preview format
 * @param {string} questionText - The quiz question text
 * @param {string} committedValue - The user's answer (if any)
 * @param {string} questionType - Type of question (RADIO, CHECKBOX, TEXT)
 * @returns {Content} - Rich text content for preview
 */
export const convertQuizToRichText = (
  questionText: string,
  committedValue?: string,
  questionType?: string
): Content => {
  const blocks: Block[] = [];

  // Add question block
  if (questionText) {
    blocks.push({
      id: 'question-' + Date.now(),
      type: 'paragraph',
      style: { fontSize: 16, color: '#333', textAlign: 'left' },
      children: [{
        text: questionText,
        style: { bold: true }
      }]
    });
  }

  // Add answer block based on question type
  if (committedValue && questionType) {
    if (questionType === 'RADIO') {
      // Radio button answer (Yes/No)
      blocks.push({
        id: 'radio-answer-' + Date.now(),
        type: 'paragraph',
        style: { fontSize: 14, color: '#666', textAlign: 'left' },
        children: [{
          text: `Answer: ${committedValue === '1' ? 'Yes' : committedValue === '2' ? 'No' : committedValue}`,
          style: { color: '#4CAF50', bold: true }
        }]
      });
    } else if (questionType === 'CHECKBOX') {
      // Checkbox answer (Yes/No)
      blocks.push({
        id: 'checkbox-answer-' + Date.now(),
        type: 'paragraph',
        style: { fontSize: 14, color: '#666', textAlign: 'left' },
        children: [{
          text: `Answer: ${committedValue === '1' ? 'Yes' : committedValue === '2' ? 'No' : committedValue}`,
          style: { color: '#4CAF50', bold: true }
        }]
      });
    } else {
      // Text answer
      blocks.push({
        id: 'text-answer-' + Date.now(),
        type: 'paragraph',
        style: { fontSize: 14, color: '#666', textAlign: 'left' },
        children: [{
          text: `Answer: ${committedValue}`,
          style: { color: '#2196F3', italic: true }
        }]
      });
    }
  }

  return blocks;
};

/**
 * Creates a simple text preview for quiz questions
 * @param {string} questionText - The quiz question text
 * @param {string} committedValue - The user's answer
 * @returns {Content} - Simple rich text content
 */
export const createSimpleQuizPreview = (
  questionText: string,
  committedValue?: string
): Content => {
  const blocks: Block[] = [];

  // Add question
  blocks.push({
    id: 'question-' + Date.now(),
    type: 'paragraph',
    style: { fontSize: 16, color: '#333', textAlign: 'left' },
    children: [{
      text: `Q: ${questionText}`,
      style: { bold: true, color: '#333' }
    }]
  });

  // Add answer if available
  if (committedValue) {
    blocks.push({
      id: 'answer-' + Date.now(),
      type: 'paragraph',
      style: { fontSize: 14, color: '#666', textAlign: 'left' },
      children: [{
        text: `A: ${committedValue}`,
        style: { color: '#4CAF50' }
      }]
    });
  }

  return blocks;
};

/**
 * Converts API response data to rich text format
 * @param {Object} niyatData - Niyat data from API
 * @returns {Content} - Rich text content for preview
 */
export const convertNiyatDataToRichText = (niyatData: any): Content => {
  if (!niyatData) return [];

  const blocks: Block[] = [];

  // Add question
  if (niyatData.niyatQuestionEnglish) {
    blocks.push({
      id: 'question-' + Date.now(),
      type: 'heading',
      level: 2,
      style: { fontSize: 18, color: '#333', textAlign: 'left' },
      children: [{
        text: niyatData.niyatQuestionEnglish,
        style: { bold: true }
      }]
    });
  }

  // Add answer based on committed value and question type
  if (niyatData.commitedValue && niyatData.questType) {
    const answerText = niyatData.questType === 'RADIO' || niyatData.questType === 'CHECKBOX'
      ? (niyatData.commitedValue === '1' ? 'Yes' : niyatData.commitedValue === '2' ? 'No' : niyatData.commitedValue)
      : niyatData.commitedValue;

    blocks.push({
      id: 'answer-' + Date.now(),
      type: 'paragraph',
      style: { fontSize: 16, color: '#666', textAlign: 'left' },
      children: [{
        text: `Your Answer: ${answerText}`,
        style: { color: '#4CAF50', bold: true }
      }]
    });
  }

  // Add metadata
  const metadataItems: InlineText[] = [];

  if (niyatData.niyatDate) {
    metadataItems.push({
      text: `Date: ${new Date(niyatData.niyatDate).toLocaleDateString()}`,
      style: { color: '#666' }
    });
  }

  if (niyatData.trophiesAwarded) {
    metadataItems.push({
      text: `Trophies: ${niyatData.trophiesAwarded}`,
      style: { color: '#FF9800', bold: true }
    });
  }

  if (metadataItems.length > 0) {
    blocks.push({
      id: 'metadata-' + Date.now(),
      type: 'paragraph',
      style: { fontSize: 12, color: '#999', textAlign: 'right' },
      children: metadataItems
    });
  }

  return blocks;
};
