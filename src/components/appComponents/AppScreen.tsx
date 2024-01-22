import React, {ReactNode} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Spacer} from '@components';

type Props = {
  children: ReactNode | JSX.Element[];
  scrollable?: boolean;
};

export default function AppScreen({children, scrollable}: Props) {
  const isArray = Array.isArray(children);

  const ViewRenderer = scrollable ? ScrollView : View;

  return (
    <SafeAreaView className="flex-1 flex-col">
      <ViewRenderer className="flex-1 p-4">
        {isArray
          ? children.mmap(({item, isLast}) => {
              return (
                <>
                  {item}
                  {!isLast && <Spacer />}
                </>
              );
            })
          : children}
      </ViewRenderer>
    </SafeAreaView>
  );
}
