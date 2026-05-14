import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import type { Block, Content, HeadingBlock, ListBlock, ListItem, InlineText, InlineStyle } from './types';

interface BlockEditorProps {
  block: Block;
  onUpdate: (block: Block) => void;
  onDelete: (blockId: string) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ block, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  const handleStartEdit = () => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      const text = (block as HeadingBlock | any).children.map((c: InlineText) => c.text).join('');
      setEditText(text);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      const newChildren: InlineText[] = [{ text: editText, style: {} }];
      const updatedBlock = { ...block, children: newChildren };
      onUpdate(updatedBlock);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText('');
  };

  const handleTextChange = (text: string) => {
    setEditText(text);
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'heading':
        const headingBlock = block as HeadingBlock;
        const headingText = headingBlock.children.map(c => c.text).join('');

        if (isEditing) {
          return (
            <View style={styles.editContainer}>
              <TextInput
                style={[styles.textInput, { fontSize: headingBlock.level === 1 ? 24 : headingBlock.level === 2 ? 20 : 18, fontWeight: 'bold' }]}
                value={editText}
                onChangeText={handleTextChange}
                multiline
                placeholder={`Heading ${headingBlock.level}...`}
              />
              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }

        return (
          <TouchableOpacity onPress={handleStartEdit} style={styles.editableContainer}>
            <Text style={[
              styles.headingText,
              {
                fontSize: headingBlock.level === 1 ? 24 : headingBlock.level === 2 ? 20 : 18,
                fontWeight: 'bold',
                textAlign: headingBlock.style.textAlign || 'left',
                writingDirection: headingBlock.style.direction === 'rtl' ? 'rtl' : 'ltr',
              }
            ]}>
              {headingText}
            </Text>
          </TouchableOpacity>
        );

      case 'paragraph':
        const paragraphText = block.children.map(c => c.text).join('');

        if (isEditing) {
          return (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.textInput}
                value={editText}
                onChangeText={handleTextChange}
                multiline
                placeholder="Type something..."
              />
              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }

        return (
          <TouchableOpacity onPress={handleStartEdit} style={styles.editableContainer}>
            <Text style={[
              styles.paragraphText,
              {
                textAlign: block.style.textAlign || 'left',
                writingDirection: block.style.direction === 'rtl' ? 'rtl' : 'ltr',
              }
            ]}>
              {paragraphText}
            </Text>
          </TouchableOpacity>
        );

      case 'list-bullet':
        const listBlock = block as ListBlock;
        return (
          <View style={styles.listContainer}>
            {listBlock.items.map((item, index) => (
              <View key={item.id} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[
                  styles.listItemText,
                  {
                    textAlign: block.style.textAlign || 'left',
                    writingDirection: block.style.direction === 'rtl' ? 'rtl' : 'ltr',
                  }
                ]}>
                  {item.children.map(c => c.text).join('')}
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.blockContainer, { backgroundColor: isEditing ? '#f0f9ff' : 'transparent' }]}>
      {renderBlockContent()}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(block.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

interface ContentEditorProps {
  content: Content;
  onContentChange: (content: Content) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ content, onContentChange }) => {
  const handleUpdateBlock = useCallback((updatedBlock: Block) => {
    const newContent = content.map(b => b.id === updatedBlock.id ? updatedBlock : b);
    onContentChange(newContent);
  }, [content, onContentChange]);

  const handleDeleteBlock = useCallback((blockId: string) => {
    const newContent = content.filter(b => b.id !== blockId);
    onContentChange(newContent);
  }, [content, onContentChange]);

  const handleAddBlock = useCallback((type: 'paragraph' | 'heading' | 'list-bullet') => {
    const newId = `block-${Date.now()}`;
    let newBlock: Block;

    switch (type) {
      case 'paragraph':
        newBlock = {
          id: newId,
          type: 'paragraph',
          style: { textAlign: 'left', direction: 'ltr' },
          children: [{ text: '', style: {} }]
        };
        break;
      case 'heading':
        newBlock = {
          id: newId,
          type: 'heading',
          level: 1,
          style: { textAlign: 'left', direction: 'ltr' },
          children: [{ text: '', style: {} }]
        };
        break;
      case 'list-bullet':
        newBlock = {
          id: newId,
          type: 'list-bullet',
          style: { textAlign: 'left', direction: 'ltr' },
          items: [{ id: `item-${Date.now()}`, children: [{ text: '', style: {} }] }]
        };
        break;
    }

    onContentChange([...content, newBlock]);
  }, [content, onContentChange]);

  return (
    <View style={styles.container}>
      {content.map((block) => (
        <BlockEditor
          key={block.id}
          block={block}
          onUpdate={handleUpdateBlock}
          onDelete={handleDeleteBlock}
        />
      ))}

      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddBlock('paragraph')}
        >
          <Text style={styles.addButtonText}>+ Paragraph</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddBlock('heading')}
        >
          <Text style={styles.addButtonText}>+ Heading</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddBlock('list-bullet')}
        >
          <Text style={styles.addButtonText}>+ List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 8,
  },
  blockContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  editableContainer: {
    minHeight: 40,
  },
  headingText: {
    fontWeight: 'bold',
    lineHeight: 32,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
  },
  editContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    minHeight: 60,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  listContainer: {
    paddingLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ContentEditor;
