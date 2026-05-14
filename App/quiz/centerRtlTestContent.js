// Test content for center alignment with RTL
export const centerRtlTestContent = [
  {
    id: `heading-${Date.now()}-center-rtl`,
    type: 'heading',
    level: 1,
    style: {
      textAlign: 'center',
      direction: 'rtl',
    },
    children: [
      {
        text: 'اختبار المحاذاة المركزية مع النص العربي',
        style: { bold: true },
      },
    ],
  },
  {
    id: `paragraph-${Date.now()}-center-rtl`,
    type: 'paragraph',
    style: {
      textAlign: 'center',
      direction: 'rtl',
    },
    children: [
      {
        text: 'هذا النص يجب أن يكون محاذى إلى المنتصف مع دعم كامل للغة العربية.',
        style: {},
      },
    ],
  },
  {
    id: `list-${Date.now()}-center-rtl`,
    type: 'list-bullet',
    style: {
      direction: 'rtl',
      textAlign: 'center',
    },
    items: [
      {
        id: `item-${Date.now()}-center-1`,
        children: [
          {
            text: 'نقطة مركزية أولى',
            style: {},
          },
        ],
      },
      {
        id: `item-${Date.now()}-center-2`,
        children: [
          {
            text: 'نقطة مركزية ثانية مع نص أطول لاختبار التوزيع',
            style: { bold: true },
          },
        ],
      },
      {
        id: `item-${Date.now()}-center-3`,
        children: [
          {
            text: 'نقطة مركزية ثالثة',
            style: {},
          },
        ],
      },
    ],
  },
  {
    id: `paragraph-${Date.now()}-mixed-alignment`,
    type: 'paragraph',
    style: {
      textAlign: 'center',
      direction: 'rtl',
    },
    children: [
      {
        text: 'اختبار محاذاة مركزية مع ',
        style: {},
      },
      {
        text: 'نص عريض',
        style: { bold: true, color: '#e53e3e' },
      },
      {
        text: ' و ',
        style: {},
      },
      {
        text: 'نص مائل',
        style: { italic: true, color: '#3182ce' },
      },
      {
        text: ' في نفس السطر.',
        style: {},
      },
    ],
  },
];

// Test function to verify center alignment with RTL
export const testCenterAlignmentWithRtl = () => {
  console.log('=== Center Alignment with RTL Test ===');
  console.log('Testing center alignment with RTL direction...');
  console.log('Content structure:', JSON.stringify(centerRtlTestContent, null, 2));

  // Check if center alignment is preserved with RTL
  const listBlock = centerRtlTestContent.find(block => block.type === 'list-bullet');
  if (listBlock) {
    console.log('List block textAlign:', listBlock.style.textAlign);
    console.log('List block direction:', listBlock.style.direction);
    console.log('Center alignment with RTL:', listBlock.style.textAlign === 'center' && listBlock.style.direction === 'rtl');
  }

  return true;
};
