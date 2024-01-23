import React, {Fragment, ReactNode} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Spacer} from '@components';

type Props = {
  scrollable?: boolean;
  children: ReactNode | JSX.Element[];
};

export default function AppScreen({children, scrollable}: Props) {
  const isArray = Array.isArray(children);

  const ViewRenderer = scrollable ? ScrollView : View;

  return (
    <SafeAreaView className="flex-1 flex-col">
      <ViewRenderer className="flex-1 p-4">
        {isArray
          ? children.mmap(({item, isLast}, index) => {
              return (
                <Fragment key={index.toString()}>
                  {item}
                  {!isLast && <Spacer />}
                </Fragment>
              );
            })
          : children}
      </ViewRenderer>
    </SafeAreaView>
  );
}
