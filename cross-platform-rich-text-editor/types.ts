export interface InlineStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  color?: string;
  fontFamily?: string;
}

export interface InlineText {
  text: string;
  style: InlineStyle;
}

export interface BlockStyle {
  fontSize?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  direction?: 'ltr' | 'rtl';
}

export interface BaseBlock {
  id: string;
  style: BlockStyle;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  children: InlineText[];
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level: 1 | 2 | 3;
  children: InlineText[];
}

export interface ListItem {
  id: string;
  children: InlineText[];
}

export interface ListBlock extends BaseBlock {
  type: 'list-bullet' | 'list-numbered';
  items: ListItem[];
}

export type Block = ParagraphBlock | HeadingBlock | ListBlock;

export type Content = Block[];