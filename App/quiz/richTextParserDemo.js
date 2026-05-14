// RichTextParser Demo - Showcases all parsing capabilities
import { RichTextParser } from './components/RichTextContent/parser';
import { ContentRenderer } from './components/RichTextContent/ContentRenderer';

// Demo 1: Plain text parsing
const plainText = "This is a simple paragraph.\n\nThis is a second paragraph.";
const plainContent = RichTextParser.parseTextToContent(plainText);
console.log('Plain Text Content:', JSON.stringify(plainContent, null, 2));

// Demo 2: Formatted text parsing
const formattedText = `
This is **bold text** and this is *italic text*.

Here is __underlined text__ and ~strikethrough text~.

You can mix **bold with *italic*** and even add __**bold underline**__.
`;
const formattedContent = RichTextParser.parseFormattedText(formattedText);
console.log('Formatted Text Content:', JSON.stringify(formattedContent, null, 2));

// Demo 3: JSON content parsing
const jsonContent = `[
  {
    "id": "heading-1",
    "type": "heading",
    "level": 1,
    "style": {
      "direction": "rtl",
      "textAlign": "center"
    },
    "children": [
      {
        "text": "عنوان رئيسي",
        "style": { "bold": true }
      }
    ]
  },
  {
    "id": "paragraph-1",
    "type": "paragraph",
    "style": {
      "direction": "rtl",
      "textAlign": "right"
    },
    "children": [
      {
        "text": "هذا نص تجريبي باللغة العربية مع ",
        "style": {}
      },
      {
        "text": "تنسيق غني",
        "style": { "color": "#e53e3e", "bold": true }
      },
      {
        "text": " و ",
        "style": {}
      },
      {
        "text": "خطوط مائلة",
        "style": { "italic": true, "color": "#3182ce" }
      }
    ]
  }
]`;
const parsedJsonContent = RichTextParser.jsonToContent(jsonContent);
console.log('Parsed JSON Content:', JSON.stringify(parsedJsonContent, null, 2));

// Demo 4: Sample content generation
const sampleContent = RichTextParser.createSampleContent();
console.log('Sample Content:', JSON.stringify(sampleContent, null, 2));

// Demo 5: Content to JSON conversion
const jsonFromContent = RichTextParser.contentToJson(sampleContent);
console.log('Content to JSON:', jsonFromContent);

// Demo 6: Using in React components
const DemoComponent = () => {
  return (
    <View>
      {/* Plain text */}
      <ContentRenderer content={plainContent} />

      {/* Formatted text */}
      <ContentRenderer content={formattedContent} />

      {/* JSON content */}
      <ContentRenderer content={parsedJsonContent} />

      {/* Sample content */}
      <ContentRenderer content={sampleContent} />
    </View>
  );
};

export {
  plainText,
  plainContent,
  formattedText,
  formattedContent,
  jsonContent,
  parsedJsonContent,
  sampleContent,
  jsonFromContent,
  DemoComponent
};
