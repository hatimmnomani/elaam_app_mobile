import React from 'react';
import type { Content, Block, InlineText, ParagraphBlock, HeadingBlock, ListBlock, ListItem } from '../types';

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

const renderBlock = (block: Block, index: number) => {
  const blockStyle: React.CSSProperties = {
    fontSize: block.style.fontSize ? `${block.style.fontSize}px` : undefined,
    color: block.style.color,
    textAlign: block.style.textAlign,
    direction: block.style.direction,
  };

  if (block.type === 'heading') {
    blockStyle.fontWeight = 'bold';
  }

  switch (block.type) {
    case 'heading':
      const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag key={block.id || index} style={blockStyle}>
          {(block as HeadingBlock).children.map(renderInline)}
        </HeadingTag>
      );
    case 'paragraph':
      return (
        <p key={block.id || index} style={blockStyle}>
          {(block as ParagraphBlock).children.map(renderInline)}
        </p>
      );
    case 'list-bullet':
      return (
        <ul key={block.id || index} className="list-disc pl-5" style={blockStyle}>
          {(block as ListBlock).items.map((item, itemIndex) => (
            <li key={item.id || itemIndex}>{item.children.map(renderInline)}</li>
          ))}
        </ul>
      );
    case 'list-numbered':
       return (
        <ol key={block.id || index} className="list-decimal pl-5" style={blockStyle}>
          {(block as ListBlock).items.map((item, itemIndex) => (
            <li key={item.id || itemIndex}>{item.children.map(renderInline)}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
};

interface ContentRendererProps {
  content: Content;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default ContentRenderer;