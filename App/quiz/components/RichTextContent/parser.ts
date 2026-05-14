import type {
  Content,
  Block,
  InlineText,
  ParagraphBlock,
  HeadingBlock,
  ListBlock,
  ListItem,
} from './types';

export class RichTextParser {
  /**
   * Parse plain text into structured content format matching cross-platform-rich-text-editor
   */
  static parseTextToContent(text: string): Content {
    if (!text || text?.trim?.() === '') {
      return [];
    }

    // Split text by newlines and create paragraphs
    const paragraphs = text
      .split('\n')
      .filter(paragraph => paragraph?.trim?.() !== '');

    return paragraphs.map((paragraph, index) => ({
      id: `paragraph-${Date.now()}-${index}`,
      type: 'paragraph' as const,
      style: {
        textAlign: 'left',
        direction: 'ltr',
      },
      children: [
        {
          text: paragraph?.trim?.(),
          style: {},
        },
      ],
    }));
  }

  /**
   * Parse text with basic markdown-like formatting
   * Supports: **bold**, *italic*, __underline__, ~strikethrough~
   */
  static parseFormattedText(text: string): Content {
    if (!text || text?.trim?.() === '') {
      return [];
    }

    const paragraphs = text
      .split('\n')
      .filter(paragraph => paragraph?.trim?.() !== '');

    return paragraphs.map((paragraph, index) => {
      const inlineElements = this.parseInlineFormatting(paragraph?.trim?.());

      return {
        id: `paragraph-${Date.now()}-${index}`,
        type: 'paragraph' as const,
        style: {
          textAlign: 'left',
          direction: 'ltr',
        },
        children: inlineElements,
      };
    });
  }

  private static parseInlineFormatting(text: string): InlineText[] {
    const elements: InlineText[] = [];
    let currentText = '';
    let currentStyle: any = {};
    let i = 0;

    while (i < text.length) {
      const char = text[i];
      const remaining = text.slice(i);

      // Check for formatting markers
      if (remaining.startsWith('**') && text.slice(i + 2).includes('**')) {
        // Bold text
        if (currentText) {
          elements.push({ text: currentText, style: { ...currentStyle } });
          currentText = '';
        }
        const endIndex = text.indexOf('**', i + 2);
        if (endIndex !== -1) {
          const boldText = text.slice(i + 2, endIndex);
          elements.push({
            text: boldText,
            style: { ...currentStyle, bold: true },
          });
          i = endIndex + 2;
          continue;
        }
      } else if (
        remaining.startsWith('*') &&
        text.slice(i + 1).includes('*') &&
        !remaining.startsWith('**')
      ) {
        // Italic text
        if (currentText) {
          elements.push({ text: currentText, style: { ...currentStyle } });
          currentText = '';
        }
        const endIndex = text.indexOf('*', i + 1);
        if (endIndex !== -1) {
          const italicText = text.slice(i + 1, endIndex);
          elements.push({
            text: italicText,
            style: { ...currentStyle, italic: true },
          });
          i = endIndex + 1;
          continue;
        }
      } else if (
        remaining.startsWith('__') &&
        text.slice(i + 2).includes('__')
      ) {
        // Underline text
        if (currentText) {
          elements.push({ text: currentText, style: { ...currentStyle } });
          currentText = '';
        }
        const endIndex = text.indexOf('__', i + 2);
        if (endIndex !== -1) {
          const underlineText = text.slice(i + 2, endIndex);
          elements.push({
            text: underlineText,
            style: { ...currentStyle, underline: true },
          });
          i = endIndex + 2;
          continue;
        }
      } else if (remaining.startsWith('~') && text.slice(i + 1).includes('~')) {
        // Strikethrough text
        if (currentText) {
          elements.push({ text: currentText, style: { ...currentStyle } });
          currentText = '';
        }
        const endIndex = text.indexOf('~', i + 1);
        if (endIndex !== -1) {
          const strikeText = text.slice(i + 1, endIndex);
          elements.push({
            text: strikeText,
            style: { ...currentStyle, strikethrough: true },
          });
          i = endIndex + 1;
          continue;
        }
      }

      currentText += char;
      i++;
    }

    // Add any remaining text
    if (currentText) {
      elements.push({ text: currentText, style: currentStyle });
    }

    return elements;
  }

  /**
   * Create sample content matching the cross-platform-rich-text-editor structure exactly
   */
  static createSampleContent(): Content {
    return [
      {
        id: `heading-${Date.now()}-1`,
        type: 'heading',
        level: 1,
        style: {
          textAlign: 'center',
          direction: 'ltr',
        },
        children: [
          {
            text: 'Welcome to the Cross-Platform Editor',
            style: {},
          },
        ],
      },
      {
        id: `paragraph-${Date.now()}-1`,
        type: 'paragraph',
        style: {
          textAlign: 'left',
          direction: 'ltr',
        },
        children: [
          {
            text: 'This is a ',
            style: {},
          },
          {
            text: 'demo',
            style: { color: '#f97316' },
          },
          {
            text: ' of a rich text editor built in React. It uses a structured ',
            style: {},
          },
          {
            text: 'JSON',
            style: { bold: true },
          },
          {
            text: ' data model to separate content from presentation.',
            style: {},
          },
        ],
      },
      {
        id: `paragraph-${Date.now()}-2`,
        type: 'paragraph',
        style: {
          textAlign: 'left',
          direction: 'ltr',
        },
        children: [
          {
            text: 'Select text to see formatting options like ',
            style: {},
          },
          {
            text: 'bold',
            style: { bold: true },
          },
          {
            text: ', ',
            style: {},
          },
          {
            text: 'italic',
            style: { italic: true },
          },
          {
            text: ', ',
            style: {},
          },
          {
            text: 'underline',
            style: { underline: true },
          },
          {
            text: ', and even ',
            style: {},
          },
          {
            text: 'colors',
            style: { color: 'rgb(139, 92, 246)' },
          },
          {
            text: '!',
            style: {},
          },
        ],
      },
      {
        id: `list-${Date.now()}-1`,
        type: 'list-bullet',
        style: {
          textAlign: 'left',
          direction: 'ltr',
        },
        items: [
          {
            id: `item-${Date.now()}-1`,
            children: [
              {
                text: 'First bullet point.',
                style: {},
              },
            ],
          },
          {
            id: `item-${Date.now()}-2`,
            children: [
              {
                text: 'Second point, but this one is ',
                style: {},
              },
              {
                text: 'colored!',
                style: { color: 'rgb(239, 68, 68)', bold: true },
              },
            ],
          },
          {
            id: `item-${Date.now()}-3`,
            children: [
              {
                text: 'Third and final point.',
                style: {},
              },
            ],
          },
        ],
      },
      {
        id: `paragraph-${Date.now()}-3`,
        type: 'paragraph',
        style: {
          direction: 'rtl',
          textAlign: 'right',
        },
        children: [
          {
            text: 'يدعم هذا المحرر أيضًا النص من اليمين إلى اليسار للغات مثل اللغة العربية.',
            style: { fontFamily: "'Noto Sans Arabic', sans-serif" },
          },
        ],
      },
    ];
  }

  /**
   * Convert content to JSON string matching the cross-platform-rich-text-editor format
   */
  static contentToJson(content: Content): string {
    return JSON.stringify(content, null, 2);
  }

  /**
   * Parse JSON string to content matching the cross-platform-rich-text-editor format
   */
  static jsonToContent(jsonString: string): Content {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed as Content;
      }
      throw new Error('Invalid content format');
    } catch (error) {
      console.error('Error parsing JSON content:', error);
      return [];
    }
  }

  /**
   * Generate unique ID like the web version
   */
  static generateId(): string {
    return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create a new block with the exact structure as the web version
   */
  static createBlock(
    type: 'paragraph' | 'heading' | 'list-bullet',
    level?: number,
  ): Block {
    const id = this.generateId();

    switch (type) {
      case 'paragraph':
        return {
          id,
          type: 'paragraph',
          style: { textAlign: 'left', direction: 'ltr' },
          children: [{ text: '', style: {} }],
        };
      case 'heading':
        return {
          id,
          type: 'heading',
          level: (level && [1, 2, 3].includes(level) ? level : 1) as 1 | 2 | 3,
          style: { textAlign: 'left', direction: 'ltr' },
          children: [{ text: '', style: {} }],
        };
      case 'list-bullet':
        return {
          id,
          type: 'list-bullet',
          style: { textAlign: 'left', direction: 'ltr' },
          items: [
            { id: this.generateId(), children: [{ text: '', style: {} }] },
          ],
        };
      default:
        throw new Error(`Unsupported block type: ${type}`);
    }
  }
}
