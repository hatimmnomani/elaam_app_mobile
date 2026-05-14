import type { Content } from './components/RichTextContent/types';

export const rtlTestContent: Content = [
  {
    id: 'rtl-heading',
    type: 'heading',
    level: 1,
    style: {
      textAlign: 'center',
      direction: 'rtl',
      fontSize: 24,
      color: '#2E4F82',
    },
    children: [
      {
        text: 'اختبار دعم النص العربي',
        style: { bold: true },
      },
    ],
  },
  {
    id: 'rtl-paragraph',
    type: 'paragraph',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontSize: 16,
    },
    children: [
      {
        text: 'هذا النص يجب أن يظهر من اليمين إلى اليسار مع دعم كامل للغة العربية.',
        style: {},
      },
    ],
  },
  {
    id: 'rtl-list',
    type: 'list-bullet',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontSize: 16,
    },
    items: [
      {
        id: 'rtl-item-1',
        children: [
          {
            text: 'نقطة أولى في القائمة',
            style: {},
          },
        ],
      },
      {
        id: 'rtl-item-2',
        children: [
          {
            text: 'نقطة ثانية مع ',
            style: {},
          },
          {
            text: 'نص عريض',
            style: { bold: true, color: '#E53E3E' },
          },
        ],
      },
    ],
  },
  {
    id: 'rtl-colored-text',
    type: 'paragraph',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontSize: 16,
    },
    children: [
      {
        text: 'نص ',
        style: {},
      },
      {
        text: 'ملون',
        style: { color: '#38A169', bold: true },
      },
      {
        text: ' و ',
        style: {},
      },
      {
        text: 'مائل',
        style: { italic: true, color: '#805AD5' },
      },
      {
        text: ' لاختبار التنسيق.',
        style: {},
      },
    ],
  },
];
