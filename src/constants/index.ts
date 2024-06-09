import { MdDateRange, MdEmail, MdImage, MdTextFields } from 'react-icons/md';
import { RxSwitch } from 'react-icons/rx';
import { TbSquareNumber1Filled } from 'react-icons/tb';

export const fields = [
  {
    id: 1,
    name: 'Text',
    icon: MdTextFields,
  },
  {
    id: 2,
    name: 'Boolean',
    icon: RxSwitch,
  },
  {
    id: 3,
    name: 'Rich Text',
    icon: MdTextFields,
  },
  {
    id: 4,
    name: 'Number',
    icon: TbSquareNumber1Filled,
  },
  {
    id: 5,
    name: 'Email',
    icon: MdEmail,
  },
  {
    id: 6,
    name: 'Date',
    icon: MdDateRange,
  },
  {
    id: 7,
    name: 'Image',
    icon: MdImage,
  },
];
