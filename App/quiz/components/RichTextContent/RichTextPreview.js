import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { ContentRenderer, RichTextParser } from './RichTextContent';

/**
 * RichTextPreview - A utility component for previewing content with the editor parser
 * Uses the existing RichTextParser which is working correctly
 */
const RichTextPreview = () => {
  const [inputText, setInputText] = useState('');
  const [previewContent, setPreviewContent] = useState(RichTextParser.createSampleContent());

  const handlePreview = () => {
    if (!inputText.trim()) {
      Alert.alert('Input Required', 'Please enter some text to preview');
      return;
    }

    try {
      // Try to parse as JSON first (for structured content)
      const parsed = JSON.parse(inputText);
      if (Array.isArray(parsed)) {
        setPreviewContent(parsed);
        return;
      }
    } catch (e) {
      // Not JSON, try formatted text parsing
      try {
        const formattedContent = RichTextParser.parseFormattedText(inputText);
        if (formattedContent.length > 0) {
          setPreviewContent(formattedContent);
          return;
        }
      } catch (e) {
        // Fall back to plain text parsing
      }
    }

    // Parse as plain text using RichTextParser
    const content = RichTextParser.parseTextToContent(inputText);
    setPreviewContent(content);
  };

  const handleLoadSample = () => {
    const sampleContent = RichTextParser.createSampleContent();
    setPreviewContent(sampleContent);
    setInputText(RichTextParser.contentToJson(sampleContent));
  };

  const handleTestFont = () => {
    // Test the font loading with a simple content that uses fatemiregular
    const testContent = [
      {
        "id": "test-block",
        "type": "paragraph",
        "style": {
          "direction": "rtl",
          "textAlign": "center",
          "fontSize": 20
        },
        "children": [
          {
            "text": "سؤال نے Attempt كري نے جواب اٰپواني  كوشش كرو انے مولانا ط ع ني ايك نادر ذكر، ناياب تصوير سي بركة لئي نے Trophies حاصل كرو. الاستفادة العلمية نا اخر ما Total Trophy Count نا مطابق اپ نے جائزة ملسے",
            "style": {
              "color": "rgb(249, 115, 22)",
              "fontFamily": "fatemiregular"
            }
          }
        ]
      }
    ];
    setPreviewContent(testContent);
    setInputText(JSON.stringify(testContent, null, 2));
  };

  const handleClear = () => {
    setInputText('');
    setPreviewContent(RichTextParser.createSampleContent());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rich Text Content Preview</Text>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Input Content (JSON, Formatted Text, or Plain Text):</Text>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          multiline
          placeholder="Enter JSON, formatted text (**bold**, *italic*, etc.), or plain text here..."
          textAlignVertical="top"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
            <Text style={styles.buttonText}>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sampleButton} onPress={handleLoadSample}>
            <Text style={styles.buttonText}>Load Sample</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.testFontButton} onPress={handleTestFont}>
            <Text style={styles.buttonText}>Test Font</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.previewSection}>
        <Text style={styles.label}>Preview:</Text>
        <ScrollView style={styles.previewContainer}>
          <ContentRenderer
            content={previewContent}
            style={styles.contentRenderer}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e293b',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#ffffff',
    minHeight: 120,
    maxHeight: 200,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  previewButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 80,
  },
  sampleButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 80,
  },
  testFontButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 80,
  },
  clearButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 80,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  previewSection: {
    flex: 1,
  },
  previewContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    maxHeight: 300,
  },
  contentRenderer: {
    // ContentRenderer handles its own styling
  },
});

export default RichTextPreview;
