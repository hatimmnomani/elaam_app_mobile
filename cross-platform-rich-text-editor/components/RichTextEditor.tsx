import React, { useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import type { Block, Content, HeadingBlock, ListBlock, ListItem, ParagraphBlock, InlineText, InlineStyle } from '../types';
import { PlusIcon, TrashIcon } from './icons';

// --- UTILITY FUNCTIONS ---

const renderInline = (inline: InlineText, index: number) => {
  let element: React.ReactNode = inline.text;
  const style: React.CSSProperties = {};

  if (inline.style.bold) {
    element = <strong>{element}</strong>;
  }
  if (inline.style.italic) {
    element = <em>{element}</em>;
  }
  if (inline.style.underline) {
    element = <u>{element}</u>;
  }
  if (inline.style.strikethrough) {
    element = <s>{element}</s>;
  }
  if (inline.style.color) {
    style.color = inline.style.color;
  }
  if (inline.style.fontFamily) {
    style.fontFamily = inline.style.fontFamily;
  }

  if (Object.keys(style).length > 0) {
    return <span key={index} style={style}>{element}</span>;
  }

  return <React.Fragment key={index}>{element}</React.Fragment>;
};

function htmlToChildren(element: HTMLElement): InlineText[] {
    const children: InlineText[] = [];

    function processNode(node: Node, currentStyle: InlineStyle = {}) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent) {
                children.push({ text: node.textContent, style: currentStyle });
            }
            return;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            let newStyle = { ...currentStyle };
            const tagName = el.tagName.toUpperCase();

            if (tagName === 'B' || tagName === 'STRONG' || parseInt(el.style.fontWeight) >= 600) newStyle.bold = true;
            if (tagName === 'I' || tagName === 'EM' || el.style.fontStyle === 'italic') newStyle.italic = true;
            if (tagName === 'U' || el.style.textDecoration.includes('underline')) newStyle.underline = true;
            if (tagName === 'S' || tagName === 'STRIKE' || el.style.textDecoration.includes('line-through')) newStyle.strikethrough = true;
            
            // Unified style attribute checks
            if (el.style.color) newStyle.color = el.style.color;
            if (el.style.fontFamily) newStyle.fontFamily = el.style.fontFamily;
            
            // Add robust check for legacy <font> tags
            if (tagName === 'FONT') {
                const colorAttr = el.getAttribute('color');
                if (colorAttr) newStyle.color = colorAttr;
                
                const faceAttr = el.getAttribute('face');
                if (faceAttr) newStyle.fontFamily = faceAttr;
            }
            
            Array.from(el.childNodes).forEach(child => processNode(child, newStyle));
        }
    }

    Array.from(element.childNodes).forEach(child => processNode(child));
    
    if (children.length < 2) {
        return children.filter(c => c.text.length > 0);
    }

    const merged: InlineText[] = [];
    if(children.length > 0) {
        merged.push({ ...children[0] });
        for (let i = 1; i < children.length; i++) {
            const last = merged[merged.length - 1];
            const current = children[i];
            if (JSON.stringify(last.style) === JSON.stringify(current.style)) {
                last.text += current.text;
            } else {
                merged.push({ ...current });
            }
        }
    }
    
    return merged.filter(c => c.text.length > 0);
}


// --- COMPONENT ---

interface BlockEditorProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (block: Block) => void;
  onUpdateListItem: (blockId: string, itemId: string, children: InlineText[]) => void;
  onAddListItem: (blockId: string) => void;
  onDeleteListItem: (blockId: string, itemId: string) => void;
  onSelectionChange: () => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ block, isSelected, onSelect, onUpdate, onUpdateListItem, onAddListItem, onDeleteListItem, onSelectionChange }) => {
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      const newChildren = htmlToChildren(e.currentTarget);
      if (JSON.stringify(newChildren) !== JSON.stringify(block.children)) {
        onUpdate({ ...block, children: newChildren.length > 0 ? newChildren : [{ text: '', style: {} }] });
      }
    }
  };

  const handleListItemBlur = (e: React.FocusEvent<HTMLDivElement>, itemId: string) => {
    const newChildren = htmlToChildren(e.currentTarget);
    const listBlock = block as ListBlock;
    const currentItem = listBlock.items.find(i => i.id === itemId);
    if (currentItem && JSON.stringify(newChildren) !== JSON.stringify(currentItem.children)) {
        onUpdateListItem(block.id, itemId, newChildren.length > 0 ? newChildren : [{ text: '', style: {} }]);
    }
  };

  const renderEditableDiv = (children: InlineText[], placeholder: string, blockStyles: React.CSSProperties) => (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onFocus={onSelect}
      onKeyUp={onSelectionChange}
      onMouseUp={onSelectionChange}
      style={blockStyles}
      className="w-full bg-transparent focus:outline-none"
      data-placeholder={placeholder}
      dangerouslySetInnerHTML={{ __html: children.map((c, i) => ReactDOMServer.renderToStaticMarkup(renderInline(c, i))).join('') }}
    />
  );
  
  const renderListItem = (item: ListItem) => (
      <div key={item.id} className="flex items-start gap-2 group">
        <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleListItemBlur(e, item.id)}
            onFocus={onSelect}
            onKeyUp={onSelectionChange}
            onMouseUp={onSelectionChange}
            className="flex-grow bg-transparent focus:outline-none text-base leading-relaxed"
            data-placeholder="List item..."
            dangerouslySetInnerHTML={{ __html: item.children.map((c, i) => ReactDOMServer.renderToStaticMarkup(renderInline(c, i))).join('') }}
        />
        <button 
            onClick={() => onDeleteListItem(block.id, item.id)}
            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
            aria-label="Delete item"
        >
            <TrashIcon className="w-4 h-4" />
        </button>
      </div>
  );

  const blockContent = () => {
    const blockContainerStyle: React.CSSProperties = {
        textAlign: block.style.textAlign || 'left',
        direction: block.style.direction || 'ltr'
    };

    switch (block.type) {
      case 'heading':
        const headingStyles: React.CSSProperties = {
            ...blockContainerStyle,
            color: block.style.color,
            fontSize: block.level === 1 ? '2.25rem' : block.level === 2 ? '1.875rem' : '1.5rem',
            fontWeight: 'bold',
            lineHeight: 1.2,
        };
        return renderEditableDiv((block as HeadingBlock).children, `Heading ${block.level}...`, headingStyles);
      case 'paragraph':
         const paraStyles: React.CSSProperties = {
            ...blockContainerStyle,
            color: block.style.color,
            fontSize: '1rem',
            lineHeight: 1.7
        };
        return renderEditableDiv((block as ParagraphBlock).children, 'Type something...', paraStyles);
      case 'list-bullet':
        return (
            <div className="space-y-1" style={{ color: block.style.color, ...blockContainerStyle }}>
               {(block as ListBlock).items.map(item => 
                 <div key={item.id} className="flex gap-2">
                   <div className="pt-1.5"><span className="text-xl leading-none">•</span></div>
                   <div className="flex-grow">{renderListItem(item)}</div>
                 </div>
               )}
               <div className="pl-5">
                <button onClick={() => onAddListItem(block.id)} className="text-indigo-500 hover:text-indigo-700 flex items-center gap-1 text-sm"><PlusIcon className="w-4 h-4"/>Add item</button>
               </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-indigo-50/70' : 'hover:bg-slate-50'}`}>
      {blockContent()}
    </div>
  );
};

const areBlocksEqual = (prevProps: Readonly<BlockEditorProps>, nextProps: Readonly<BlockEditorProps>) => {
  return (
    prevProps.isSelected === nextProps.isSelected &&
    JSON.stringify(prevProps.block) === JSON.stringify(nextProps.block)
  );
};

const MemoizedBlockEditor = React.memo(BlockEditor, areBlocksEqual);


interface RichTextEditorProps {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
  selectedBlockIndex: number | null;
  setSelectedBlockIndex: (index: number | null) => void;
  onSelectionChange: () => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, setContent, selectedBlockIndex, setSelectedBlockIndex, onSelectionChange }) => {
    const handleUpdateBlock = useCallback((updatedBlock: Block) => {
        setContent(currentContent => currentContent.map(b => b.id === updatedBlock.id ? updatedBlock : b));
    }, [setContent]);

    const handleUpdateListItem = useCallback((blockId: string, itemId: string, children: InlineText[]) => {
        setContent(currentContent => currentContent.map(block => {
            if (block.id === blockId && (block.type === 'list-bullet' || block.type === 'list-numbered')) {
                const newItems = block.items.map(item => 
                    item.id === itemId ? { ...item, children } : item
                );
                return { ...block, items: newItems };
            }
            return block;
        }));
    }, [setContent]);

    const handleAddListItem = useCallback((blockId: string) => {
        setContent(currentContent => currentContent.map(block => {
            if (block.id === blockId && (block.type === 'list-bullet' || block.type === 'list-numbered')) {
                const newItem: ListItem = { id: crypto.randomUUID(), children: [{ text: '', style: {} }] };
                return { ...block, items: [...block.items, newItem] };
            }
            return block;
        }));
    }, [setContent]);

    const handleDeleteListItem = useCallback((blockId: string, itemId: string) => {
         setContent(currentContent => {
            const newContent = currentContent.map(block => {
                if (block.id === blockId && (block.type === 'list-bullet' || block.type === 'list-numbered')) {
                    const newItems = block.items.filter(item => item.id !== itemId);
                    return { ...block, items: newItems };
                }
                return block;
            });
            return newContent.filter(block => !((block.type === 'list-bullet' || block.type === 'list-numbered') && block.items.length === 0));
        });
    }, [setContent]);

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-4">
        {content.map((block, index) => (
            <MemoizedBlockEditor
              key={block.id}
              block={block}
              isSelected={index === selectedBlockIndex}
              onSelect={() => setSelectedBlockIndex(index)}
              onUpdate={handleUpdateBlock}
              onUpdateListItem={handleUpdateListItem}
              onAddListItem={handleAddListItem}
              onDeleteListItem={handleDeleteListItem}
              onSelectionChange={onSelectionChange}
            />
        ))}
        <style>{`
          [contentEditable][data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: #94a3b8; /* slate-400 */
            pointer-events: none;
            display: block;
          }
        `}</style>
        </div>
    );
};

export default RichTextEditor;