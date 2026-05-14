# Rich Text Content System for Quiz Flow

This directory contains a React Native compatible rich text rendering and editing system that perfectly matches the cross-platform-rich-text-editor structure and functionality.

## Components

### ContentRenderer
A React Native component that renders structured content with support for:
- Headings (H1, H2, H3)
- Paragraphs with inline formatting
- Bullet and numbered lists
- RTL (Right-to-Left) text direction
- Inline styles (bold, italic, underline, strikethrough, colors)

### ContentEditor
A React Native component for editing structured content:
- Edit existing blocks inline
- Add new blocks (paragraphs, headings, lists)
- Delete blocks
- Real-time content updates
- Touch-based editing interface

### RichTextParser
A utility class that handles content parsing and conversion:
- `parseTextToContent()`: Converts plain text to structured format
- `parseFormattedText()`: Parses text with markdown-like formatting
- `createSampleContent()`: Creates sample content matching web editor
- `contentToJson()`: Converts content to JSON string
- `jsonToContent()`: Parses JSON string to content
- `createBlock()`: Creates new blocks with exact web editor structure

## Usage

### Basic Rendering
```javascript
import { ContentRenderer, RichTextParser } from './components/RichTextContent';

// Use content from cross-platform-rich-text-editor
<ContentRenderer
  content={crossPlatformCompatibleContent}
  style={{ paddingHorizontal: 20, marginVertical: 10 }}
/>
```

### Content Editing
```javascript
import { ContentEditor } from './components/RichTextContent';

const [content, setContent] = useState(RichTextParser.createSampleContent());

<ContentEditor
  content={content}
  onContentChange={setContent}
/>
```

### Converting Between Formats
```javascript
// Text to structured content
const structured = RichTextParser.parseTextToContent("Your text here");

// JSON string to content
const content = RichTextParser.jsonToContent(jsonString);

// Content to JSON string
const json = RichTextParser.contentToJson(content);
```

## Cross-Platform Compatibility

This system is designed to work seamlessly with the cross-platform-rich-text-editor:

### ✅ **Exact Structure Match**
- Same TypeScript interfaces
- Identical JSON structure
- Compatible block types and properties
- Same inline text formatting options

### ✅ **RichTextParser Integration**
- **parseTextToContent()**: Converts plain text to structured content
- **parseFormattedText()**: Parses text with **bold**, *italic*, __underline__, ~strikethrough~
- **jsonToContent()**: Parses JSON content from web editor
- **createSampleContent()**: Generates sample content for testing
- **contentToJson()**: Converts content back to JSON format

### ✅ **Smart Content Parsing**
```javascript
// Automatic parsing with fallback chain:
// 1. Try JSON parsing first (structured content)
// 2. Try formatted text parsing (markdown-like syntax)
// 3. Fall back to plain text parsing

const content = RichTextParser.parseTextToContent(text);
const formattedContent = RichTextParser.parseFormattedText("**bold** *italic* text");
const jsonContent = RichTextParser.jsonToContent(jsonString);
```

### ✅ **RTL Center Alignment Example**
```javascript
// Center-aligned RTL content
{
  id: "list-center-rtl",
  type: "list-bullet",
  style: {
    direction: "rtl",        // RTL text direction
    textAlign: "center"      // Center alignment respected
  },
  items: [
    {
      id: "item-1",
      children: [{ text: "نقطة مركزية", style: {} }]
    }
  ]
}
```

### ✅ **Data Interchange**
- Import content from web editor JSON
- Export content compatible with web editor
- Same ID generation patterns
- Consistent styling properties

## Content Structure

The system uses the exact same structured content format as the cross-platform-rich-text-editor:

```typescript
interface Content {
  id: string;
  type: 'heading' | 'paragraph' | 'list-bullet' | 'list-numbered';
  style: {
    textAlign?: 'left' | 'center' | 'right';
    direction?: 'ltr' | 'rtl';
    color?: string;
    fontSize?: number;
  };
  children: InlineText[];
  // Additional properties based on type
}
```

## Features

- ✅ **Perfect Web Compatibility**: Exact same JSON structure as cross-platform-rich-text-editor
- ✅ **RTL Support**: Full Arabic/Urdu text rendering with proper direction
- ✅ **Rich Formatting**: All text styles and colors supported
- ✅ **Block Editing**: Add, edit, and delete content blocks
- ✅ **Structured Data**: Clean separation of content and presentation
- ✅ **TypeScript Support**: Full type safety and IntelliSense
- ✅ **React Native Optimized**: Touch-friendly editing interface

### RichTextPreview
A utility component for previewing and testing content with the editor parser:
- **Input Testing**: Test JSON or plain text input
- **Live Preview**: See how content renders in real-time
- **Sample Content**: Load sample content for testing
- **Error Handling**: Graceful fallback for invalid content

## Integration with Quiz Flow

The system is fully integrated into the quiz flow:

### ✅ **QuizDescriptionPage Integration**
- Replaced `ArabicTextContent` with `ContentRenderer`
- Supports both structured JSON and plain text content
- Automatic conversion using `RichTextParser`
- Maintains existing styling and layout

### ✅ **PrizePageScreen Integration**
- **Trophy Description**: Dynamic content from `trophy.description` parsed with RichTextParser
- **Smart Parsing**: Handles JSON, formatted text, and plain text content
- **Fallback Chain**: JSON → Formatted Text → Plain Text parsing
- **Dynamic Content**: Supports real-time content updates from quiz results

### ✅ **Image Fallback Implementation**
```javascript
// PrizePageScreen with smart image fallback:
const displayImage = image && typeof image === 'string' && image.trim() !== '' && image !== 'null' && image !== 'undefined'
  ? { uri: image }
  : mockPrizePageData.gatheringImage;

// ReligiousGatheringImage with error handling:
const ReligiousGatheringImage = ({ imageSource }) => {
  const [imageError, setImageError] = useState(false);
  const actualImageSource = imageError || !imageSource ? defaultImage : imageSource;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={actualImageSource}
        onError={() => setImageError(true)}
        // ... other props
      />
      {imageError && (
        <View style={styles.errorContainer}>
          <Text>Image not available</Text>
          <Text>Using default image</Text>
        </View>
      )}
    </View>
  );
};
```

### ✅ **Rich Text Answer Feedback**
```javascript
// QuizResultScreen now supports rich text in answer descriptions:
const correctAnswerContent = RichTextParser.jsonToContent(submissionResult.correctAnswerDesc);
const wrongAnswerContent = RichTextParser.parseFormattedText(submissionResult.wrongAnswerDesc);

// InfoSection displays rich text content:
<ContentRenderer content={correctAnswerContent} />
```

### ✅ **Enhanced Image Handling**
- **Smart Image Fallback**: Automatic fallback to default image for invalid URIs
- **Error Recovery**: Graceful handling of failed image loads
- **User Feedback**: Visual indicators when fallback images are used
- **Performance**: Optimized image loading with error states

### ✅ **Content Preview Functionality**
```javascript
// QuizDescriptionPage now supports:
const content = RichTextParser.parseTextToContent(quizDescription);
<ContentRenderer content={content} />

// QuestionContent now supports:
const content = RichTextParser.parseTextToContent(questionDescription);
<ContentRenderer content={content} />

// RichTextPreview uses RichTextParser methods:
const content = RichTextParser.parseFormattedText("**bold** *italic* text");
const jsonContent = RichTextParser.jsonToContent(jsonString);
```

## Testing

Use the provided test content to verify compatibility:

import { crossPlatformCompatibleContent } from './crossPlatformTestContent';
import { centerRtlTestContent, testCenterAlignmentWithRtl } from './centerRtlTestContent';
import { quizPreviewTestContent, testQuizContentPreview } from '../quizContentPreviewTest';
import { quizResultTestData, testQuizResultRichText, testInfoSectionRichText } from '../quizResultRichTextTest';
import { prizePageTestData, testPrizePageParsing, testPrizePageSmartParsing } from '../prizePageRichTextTest';
import { imageFallbackTestCases, testImageFallbackLogic, ImageFallbackTestComponent } from '../imageFallbackTest';

// Test compatibility
testCrossPlatformCompatibility();

// Test center alignment with RTL
testCenterAlignmentWithRtl();

// Test quiz content preview
testQuizContentPreview();

// Test quiz result rich text integration
testQuizResultRichText();

// Test InfoSection rich text integration
testInfoSectionRichText();

// Test PrizePageScreen parsing
testPrizePageParsing();

// Test PrizePageScreen smart parsing
testPrizePageSmartParsing();

// Test image fallback logic
testImageFallbackLogic();

### 🧪 **RichTextPreview Component**
```javascript
import { RichTextPreview } from './RichTextPreview';

// Interactive preview component
<RichTextPreview />
```

This component allows you to:
- Test any JSON or plain text content
- See live preview of how it renders
- Load sample content for testing
- Verify compatibility with the editor parser

### 🎯 **RichTextParser Capabilities**

**Text Parsing Methods:**
- `parseTextToContent(text: string)` - Plain text to structured content
- `parseFormattedText(text: string)` - Markdown-like formatting support
- `jsonToContent(jsonString: string)` - Parse JSON content from web editor
- `createSampleContent()` - Generate comprehensive sample content
- `contentToJson(content)` - Convert content back to JSON

**Supported Formatting:**
- `**bold**` - Bold text
- `*italic*` - Italic text
- `__underline__` - Underlined text
- `~strikethrough~` - Strikethrough text
- Color support: `{ color: '#ff0000' }`
- Font family support: `{ fontFamily: 'custom-font' }`

**Parsing Priority:**
1. **JSON Content** (structured from web editor)
2. **Formatted Text** (markdown-like syntax)
3. **Plain Text** (fallback to paragraph blocks)

This ensures maximum compatibility with various content sources! 🎉
