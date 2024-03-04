import * as React from 'react';

import FAIcon from 'react-native-vector-icons/FontAwesome5';

import {IconProps} from '@appTypes/propsType.type';

export function Icon({size = 20, ...props}: IconProps) {
  return <FAIcon style={{includeFontPadding: false}} size={size} {...props} />;
}
