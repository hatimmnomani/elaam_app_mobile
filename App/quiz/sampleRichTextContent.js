import type { Content } from './components/RichTextContent/types';

export const sampleRichTextContent: Content = [
  {
    id: 'heading-1',
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
        text: 'شهادة الإنجاز',
        style: { bold: true },
      },
    ],
  },
  {
    id: 'paragraph-1',
    type: 'paragraph',
    style: {
      textAlign: 'right',
      direction: 'rtl',
      fontSize: 16,
    },
    children: [
      {
        text: 'بسم الله الرحمن الرحيم',
        style: { bold: true },
      },
    ],
  },
  {
    id: 'paragraph-2',
    type: 'paragraph',
    style: {
      textAlign: 'right',
      direction: 'rtl',
      fontSize: 16,
    },
    children: [
      {
        text: 'يسرنا أن نعلن أن ',
        style: {},
      },
      {
        text: userData?.name || 'المستخدم',
        style: { bold: true, color: '#E53E3E' },
      },
      {
        text: ' قد أكمل الاختبار بنجاح وحصل على درجة ',
        style: {},
      },
      {
        text: `${userData?.userScore || '0'}%`,
        style: { bold: true, color: '#38A169' },
      },
      {
        text: ' من الدرجة الكاملة.',
        style: {},
      },
    ],
  },
  {
    id: 'list-1',
    type: 'list-bullet',
    style: {
      textAlign: 'right',
      direction: 'rtl',
      fontSize: 16,
    },
    items: [
      {
        id: 'item-1',
        children: [
          {
            text: 'إجابة صحيحة على جميع الأسئلة',
            style: {},
          },
        ],
      },
      {
        id: 'item-2',
        children: [
          {
            text: 'فهم ممتاز للمحتوى الديني',
            style: {},
          },
        ],
      },
      {
        id: 'item-3',
        children: [
          {
            text: 'التزام بالقيم الإسلامية',
            style: {},
          },
        ],
      },
    ],
  },
  {
    id: 'paragraph-3',
    type: 'paragraph',
    style: {
      textAlign: 'center',
      direction: 'rtl',
      fontSize: 16,
    },
    children: [
      {
        text: 'بارك الله فيك وجزاك خيراً',
        style: { italic: true, color: '#805AD5' },
      },
    ],
  },
];
