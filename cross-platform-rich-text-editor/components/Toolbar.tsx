import React, { useState, useRef, useEffect } from 'react';
import type { Block, Content, InlineStyle } from '../types';
import { Heading1Icon, Heading2Icon, PilcrowIcon, ListIcon, TrashIcon, PlusIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, LtrIcon, RtlIcon, ChevronDownIcon } from './icons';

const FONT_LIST = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Lora', value: 'Lora, serif' },
    { name: 'Arabic', value: "'Noto Sans Arabic', sans-serif" },
];

interface ToolbarProps {
  selectedBlock: Block | null;
  onAddBlock: (type: 'paragraph' | 'heading' | 'list-bullet') => void;
  onDeleteBlock: (id: string) => void;
  onUpdateBlock: (block: Block) => void;
  onApplyInlineStyle: (style: 'bold' | 'italic' | 'underline' | 'strikethrough') => void;
  onApplyInlineColor: (color: string) => void;
  onSetTextAlign: (align: 'left' | 'center' | 'right') => void;
  onApplyFontFamily: (font: string) => void;
  onSetDirection: (dir: 'ltr' | 'rtl') => void;
  activeStyles: InlineStyle;
}

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children, label, disabled, active }) => (
  <button
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    title={label}
    className={`p-2 rounded-md text-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${active ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200 hover:text-slate-900 disabled:hover:bg-transparent'}`}
  >
    {children}
  </button>
);

function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : null;
}


const Toolbar: React.FC<ToolbarProps> = ({ selectedBlock, onAddBlock, onDeleteBlock, onUpdateBlock, onApplyInlineStyle, onApplyInlineColor, onSetTextAlign, onApplyFontFamily, onSetDirection, activeStyles }) => {
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (fontMenuRef.current && !fontMenuRef.current.contains(event.target as Node)) {
            setIsFontMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTypeChange = (type: 'paragraph' | 'heading', level: 1 | 2 = 1) => {
    if (!selectedBlock) return;
    
    if (selectedBlock.type === 'paragraph' || selectedBlock.type === 'heading') {
        const baseProps = {
            id: selectedBlock.id,
            style: selectedBlock.style,
            children: selectedBlock.children,
        };

        if (type === 'heading') {
            onUpdateBlock({ ...baseProps, type: 'heading', level });
        } else {
            onUpdateBlock({ ...baseProps, type: 'paragraph' });
        }
    }
  };

  const colors = ['#334155', '#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6'];
  const textAlign = selectedBlock?.style.textAlign ?? 'left';
  const direction = selectedBlock?.style.direction ?? 'ltr';

  const currentFontName = (() => {
      if (!activeStyles.fontFamily) return 'Default';
      const normalizedFontFamily = activeStyles.fontFamily.replace(/['"]/g, '').split(',')[0].toLowerCase();
      const foundFont = FONT_LIST.find(f => f.value.toLowerCase().includes(normalizedFontFamily));
      return foundFont ? foundFont.name : 'Default';
  })();


  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg p-2 sticky top-4 z-10 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-slate-500 mr-2 pl-2">Add Block</span>
        <IconButton onClick={() => onAddBlock('paragraph')} label="Add Paragraph">
          <PilcrowIcon className="w-5 h-5" />
        </IconButton>
        <IconButton onClick={() => onAddBlock('heading')} label="Add Heading">
          <Heading1Icon className="w-5 h-5" />
        </IconButton>
        <IconButton onClick={() => onAddBlock('list-bullet')} label="Add Bullet List">
          <ListIcon className="w-5 h-5" />
        </IconButton>
      </div>

      {selectedBlock && (
        <div className="flex items-center gap-1 flex-wrap">
           <span className="text-sm font-semibold text-slate-500 mr-2">Style Block</span>
           <IconButton onClick={() => handleTypeChange('paragraph')} label="Change to Paragraph" disabled={selectedBlock.type === 'list-bullet' || selectedBlock.type === 'list-numbered'}>
              <PilcrowIcon className="w-5 h-5" />
           </IconButton>
           <IconButton onClick={() => handleTypeChange('heading', 1)} label="Change to H1" disabled={selectedBlock.type === 'list-bullet' || selectedBlock.type === 'list-numbered'}>
              <Heading1Icon className="w-5 h-5" />
           </IconButton>
           <IconButton onClick={() => handleTypeChange('heading', 2)} label="Change to H2" disabled={selectedBlock.type === 'list-bullet' || selectedBlock.type === 'list-numbered'}>
              <Heading2Icon className="w-5 h-5" />
           </IconButton>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <IconButton onClick={() => onSetDirection('ltr')} label="Left to Right" active={direction === 'ltr'}>
                <LtrIcon className="w-5 h-5" />
            </IconButton>
            <IconButton onClick={() => onSetDirection('rtl')} label="Right to Left" active={direction === 'rtl'}>
                <RtlIcon className="w-5 h-5" />
            </IconButton>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <IconButton onClick={() => onSetTextAlign('left')} label="Align Left" active={textAlign === 'left'}>
                <AlignLeftIcon className="w-5 h-5" />
            </IconButton>
            <IconButton onClick={() => onSetTextAlign('center')} label="Align Center" active={textAlign === 'center'}>
                <AlignCenterIcon className="w-5 h-5" />
            </IconButton>
            <IconButton onClick={() => onSetTextAlign('right')} label="Align Right" active={textAlign === 'right'}>
                <AlignRightIcon className="w-5 h-5" />
            </IconButton>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <div ref={fontMenuRef} className="relative">
                <button onMouseDown={e => e.preventDefault()} onClick={() => setIsFontMenuOpen(!isFontMenuOpen)} className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                    <span>{currentFontName}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                </button>
                {isFontMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-slate-200 z-20">
                        {FONT_LIST.map(font => (
                            <button key={font.name} onMouseDown={e => e.preventDefault()} onClick={() => { onApplyFontFamily(font.value); setIsFontMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50" style={{fontFamily: font.value}}>
                                {font.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <IconButton onClick={() => onApplyInlineStyle('bold')} label="Bold" active={activeStyles.bold}>
                <BoldIcon className="w-5 h-5" />
            </IconButton>
            <IconButton onClick={() => onApplyInlineStyle('italic')} label="Italic" active={activeStyles.italic}>
                <ItalicIcon className="w-5 h-5" />
            </IconButton>
            <IconButton onClick={() => onApplyInlineStyle('underline')} label="Underline" active={activeStyles.underline}>
                <UnderlineIcon className="w-5 h-5" />
            </IconButton>
             <IconButton onClick={() => onApplyInlineStyle('strikethrough')} label="Strikethrough" active={activeStyles.strikethrough}>
                <StrikethroughIcon className="w-5 h-5" />
            </IconButton>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-1.5" title="Change text color">
              {colors.map(color => (
                <button
                  key={color}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onApplyInlineColor(color)}
                  className={`w-5 h-5 rounded-full border-2 transition-transform transform hover:scale-110 ${activeStyles.color === hexToRgb(color) ? 'border-indigo-500' : 'border-white'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Set color to ${color}`}
                />
              ))}
            </div>
           <div className="w-px h-6 bg-slate-200 mx-2"></div>
           <IconButton onClick={() => onDeleteBlock(selectedBlock.id)} label="Delete Block">
              <TrashIcon className="w-5 h-5 text-red-500" />
           </IconButton>
        </div>
      )}
    </div>
  );
};

export default Toolbar;