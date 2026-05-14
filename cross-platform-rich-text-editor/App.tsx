import React, { useState, useCallback } from 'react';
import RichTextEditor from './components/RichTextEditor';
import PreviewModal from './components/PreviewModal';
import Toolbar from './components/Toolbar';
import type { Content, Block, ListItem, ParagraphBlock, HeadingBlock, ListBlock, InlineStyle } from './types';
import { PilcrowIcon } from './components/icons';

const initialContent: Content = [
  {
    id: crypto.randomUUID(),
    type: 'heading',
    level: 1,
    style: { textAlign: 'center' },
    children: [{ text: 'Welcome to the Cross-Platform Editor', style: {} }],
  },
  {
    id: crypto.randomUUID(),
    type: 'paragraph',
    style: {},
    children: [
      { text: 'This is a demo of a rich text editor built in React. It uses a structured ', style: {} },
      { text: 'JSON', style: { bold: true } },
      { text: ' data model to separate content from presentation.', style: {} },
    ],
  },
    {
    id: crypto.randomUUID(),
    type: 'paragraph',
    style: { },
    children: [
      { text: 'Select text to see formatting options like ', style: {} },
      { text: 'bold', style: { bold: true } },
      { text: ', ', style: {} },
      { text: 'italic', style: { italic: true } },
      { text: ', ', style: {} },
      { text: 'underline', style: { underline: true } },
      { text: ', and even ', style: {} },
      { text: 'colors', style: { color: '#8b5cf6' } },
      { text: '!', style: {} },
    ],
  },
  {
    id: crypto.randomUUID(),
    type: 'list-bullet',
    style: {},
    items: [
      { id: crypto.randomUUID(), children: [{ text: 'First bullet point.', style: {} }] },
      { id: crypto.randomUUID(), children: [{ text: 'Second point, but this one is ', style: {} }, {text: 'colored!', style: {color: '#ef4444', bold: true}}] },
      { id: crypto.randomUUID(), children: [{ text: 'Third and final point.', style: {} }] },
    ],
  },
  {
    id: crypto.randomUUID(),
    type: 'paragraph',
    style: { direction: 'rtl', textAlign: 'right' },
    children: [
      { text: 'يدعم هذا المحرر أيضًا النص من اليمين إلى اليسار للغات مثل اللغة العربية.', style: { fontFamily: "'Noto Sans Arabic', sans-serif" } },
    ],
  },
];


function App() {
  const [content, setContent] = useState<Content>(initialContent);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [activeStyles, setActiveStyles] = useState<InlineStyle>({});
  const [copyButtonText, setCopyButtonText] = useState('Copy Raw JSON');
  
  const checkSelectionStyle = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setActiveStyles({});
      return;
    }

    let container = selection.getRangeAt(0).commonAncestorContainer;
    if (container.nodeType !== Node.ELEMENT_NODE) {
      container = container.parentNode!;
    }
    if (!(container as HTMLElement)?.closest('[contenteditable="true"]')) {
      return; 
    }
    
    const newStyles: InlineStyle = {};

    newStyles.bold = document.queryCommandState('bold');
    newStyles.italic = document.queryCommandState('italic');
    newStyles.underline = document.queryCommandState('underline');
    newStyles.strikethrough = document.queryCommandState('strikeThrough');

    const color = document.queryCommandValue('foreColor');
    if (color) {
      newStyles.color = color;
    }
    const fontName = document.queryCommandValue('fontName');
    if (fontName) {
      newStyles.fontFamily = fontName;
    }

    setActiveStyles(currentStyles => {
        if (JSON.stringify(newStyles) !== JSON.stringify(currentStyles)) {
            return newStyles;
        }
        return currentStyles;
    });
  }, []);

  const selectedBlock = selectedBlockIndex !== null ? content[selectedBlockIndex] : null;

  const handleAddBlock = useCallback((type: 'paragraph' | 'heading' | 'list-bullet') => {
    let newBlock: Block;
    const newId = crypto.randomUUID();

    switch (type) {
      case 'paragraph':
        newBlock = { id: newId, type: 'paragraph', style: {}, children: [{ text: '', style: {} }] };
        break;
      case 'heading':
        newBlock = { id: newId, type: 'heading', level: 1, style: {}, children: [{ text: '', style: {} }] };
        break;
      case 'list-bullet':
        newBlock = { id: newId, type: 'list-bullet', style: {}, items: [{ id: crypto.randomUUID(), children: [{ text: '', style: {} }] }] };
        break;
    }
    
    const newIndex = selectedBlockIndex !== null ? selectedBlockIndex + 1 : content.length;
    setContent(currentContent => {
        const newContent = [...currentContent];
        newContent.splice(newIndex, 0, newBlock);
        return newContent;
    });
    setSelectedBlockIndex(newIndex);
  }, [selectedBlockIndex, content.length]);

  const handleDeleteBlock = useCallback((id: string) => {
    setContent(currentContent => currentContent.filter(b => b.id !== id));
    setSelectedBlockIndex(null);
  }, []);

  const handleUpdateBlock = useCallback((updatedBlock: Block) => {
    setContent(currentContent => currentContent.map(b => b.id === updatedBlock.id ? updatedBlock : b));
  }, []);
  
  const handleApplyInlineStyle = (style: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
      const command = style === 'strikethrough' ? 'strikeThrough' : style;
      document.execCommand(command, false);
      setTimeout(checkSelectionStyle, 0);
  };
  
  const handleApplyInlineColor = (color: string) => {
      document.execCommand('foreColor', false, color);
      setTimeout(checkSelectionStyle, 0);
  };

  const handleApplyFontFamily = (font: string) => {
      document.execCommand('fontName', false, font);
      setTimeout(checkSelectionStyle, 0);
  }

  const handleSetTextAlign = (align: 'left' | 'center' | 'right') => {
      if (!selectedBlock) return;
      const newBlock = { ...selectedBlock, style: { ...selectedBlock.style, textAlign: align }};
      handleUpdateBlock(newBlock);
  };

  const handleSetDirection = (dir: 'ltr' | 'rtl') => {
      if (!selectedBlock) return;
      const newBlock = { ...selectedBlock, style: { ...selectedBlock.style, direction: dir }};
      handleUpdateBlock(newBlock);
  };

  const handleCopyJson = () => {
    const jsonString = JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy Raw JSON'), 2000);
    }).catch(err => {
        console.error('Failed to copy JSON: ', err);
        setCopyButtonText('Copy Failed');
        setTimeout(() => setCopyButtonText('Copy Raw JSON'), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Cross-Platform Rich Text Editor</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Edit content in a block-based editor and see how the structured JSON data renders in real-time.
          </p>
        </header>

        <Toolbar
          selectedBlock={selectedBlock}
          onAddBlock={handleAddBlock}
          onDeleteBlock={handleDeleteBlock}
          onUpdateBlock={handleUpdateBlock}
          onApplyInlineStyle={handleApplyInlineStyle}
          onApplyInlineColor={handleApplyInlineColor}
          onSetTextAlign={handleSetTextAlign}
          onApplyFontFamily={handleApplyFontFamily}
          onSetDirection={handleSetDirection}
          activeStyles={activeStyles}
        />

        <main>
           {content.length > 0 ? (
            <RichTextEditor
                content={content}
                setContent={setContent}
                selectedBlockIndex={selectedBlockIndex}
                setSelectedBlockIndex={setSelectedBlockIndex}
                onSelectionChange={checkSelectionStyle}
            />
            ) : (
                <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-slate-200 text-slate-500">
                    <PilcrowIcon className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <h3 className="text-xl font-semibold mb-2">Editor is empty</h3>
                    <p>Click an "Add Block" button in the toolbar to get started.</p>
                </div>
            )}
        </main>

        <footer className="text-center pt-4">
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
            >
              Show Preview
            </button>
            <button
              onClick={handleCopyJson}
              className="bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105 disabled:opacity-70"
            >
              {copyButtonText}
            </button>
          </div>
        </footer>
      </div>

      <PreviewModal
        content={content}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}

export default App;
