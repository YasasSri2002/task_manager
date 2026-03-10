// components/DynamicIcon.tsx
import React from 'react';
import { IconType } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as GiIcons from "react-icons/gi";
import * as MdIcons from 'react-icons/md';
import * as TbIcons from "react-icons/tb";
import * as HiIcons from "react-icons/hi";
import * as CiIcons from "react-icons/ci";
import * as ioIcons from "react-icons/io";
import * as fiIcons from "react-icons/fi";
import * as GoIcons from "react-icons/go";
import * as PiIcons from "react-icons/pi";
import * as BiIcons from "react-icons/bi";
import * as RxIcons from 'react-icons/rx';
import * as Hi2Icons from 'react-icons/hi2'
import * as Io5Icons from 'react-icons/io5';

type IconLibrary = {
  [key: string]: IconType;
};

const ICON_LIBRARY: IconLibrary = {
  ...FaIcons,
  ...MdIcons,
  ...FcIcons,
  ...GiIcons,
  ...TbIcons,
  ...HiIcons,
  ...CiIcons,
  ...ioIcons,
  ...fiIcons,
  ...GoIcons,
  ...PiIcons,
  ...BiIcons,
  ...RxIcons,
  ...Hi2Icons,
  ...Io5Icons,

};

interface DynamicIconProps extends React.SVGAttributes<SVGElement> {
  name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = ICON_LIBRARY[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;