declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.DC<SvgProps>;

  export default content
}