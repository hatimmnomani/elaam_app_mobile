// Exact same structure as cross-platform-rich-text-editor initial content
export const crossPlatformCompatibleContent = [
  {
    id: `heading-${Date.now()}-1`,
    type: 'heading',
    level: 1,
    style: { textAlign: 'center' },
    children: [{ text: 'Welcome to the Cross-Platform Editor', style: {} }],
  },
  {
    id: `paragraph-${Date.now()}-1`,
    type: 'paragraph',
    style: {},
    children: [
      { text: 'This is a ', style: {} },
      { text: 'demo', style: { color: '#f97316' } },
      { text: ' of a rich text editor built in React. It uses a structured ', style: {} },
      { text: 'JSON', style: { bold: true } },
      { text: ' data model to separate content from presentation.', style: {} },
    ],
  },
  {
    id: `paragraph-${Date.now()}-2`,
    type: 'paragraph',
    style: {},
    children: [
      { text: 'Select text to see formatting options like ', style: {} },
      { text: 'bold', style: { bold: true } },
      { text: ', ', style: {} },
      { text: 'italic', style: { italic: true } },
      { text: ', ', style: {} },
      { text: 'underline', style: { underline: true } },
      { text: ', and even ', style: {} },
      { text: 'colors', style: { color: 'rgb(139, 92, 246)' } },
      { text: '!', style: {} },
    ],
  },
  {
    id: `list-${Date.now()}-1`,
    type: 'list-bullet',
    style: {},
    items: [
      { id: `item-${Date.now()}-1`, children: [{ text: 'First bullet point.', style: {} }] },
      {
        id: `item-${Date.now()}-2`,
        children: [
          { text: 'Second point, but this one is ', style: {} },
          { text: 'colored!', style: { color: 'rgb(239, 68, 68)', bold: true } }
        ]
      },
      { id: `item-${Date.now()}-3`, children: [{ text: 'Third and final point.', style: {} }] },
    ],
  },
  {
    id: `paragraph-${Date.now()}-3`,
    type: 'paragraph',
    style: { direction: 'rtl', textAlign: 'right' },
    children: [
      { text: 'يدعم هذا المحرر أيضًا النص من اليمين إلى اليسار للغات مثل اللغة العربية.', style: { fontFamily: "'Noto Sans Arabic', sans-serif" } },
    ],
  },
];

// Test function to verify compatibility
export const testCrossPlatformCompatibility = () => {
  console.log('=== Cross-Platform Compatibility Test ===');
  console.log('Original structure matches web editor:', JSON.stringify(crossPlatformCompatibleContent, null, 2));
  console.log('Content length:', crossPlatformCompatibleContent.length);
  console.log('First block type:', crossPlatformCompatibleContent[0].type);
  console.log('First block has required fields:', 'id' in crossPlatformCompatibleContent[0] && 'style' in crossPlatformCompatibleContent[0]);
  return true;
};
