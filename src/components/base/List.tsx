import React from 'react';
import {FlatList, FlatListProps, View} from 'react-native';

type FlatListP<T> = {dClassName?: string} & FlatListProps<T>;

export function List<T>(p: FlatListP<T>) {
  const {numColumns: col = 1, data, dClassName, renderItem, ...rest} = p;

  const listData = (data ?? []) as T[];
  const totalData = listData?.length ?? 0;
  const mod = totalData % col;
  const length = col - mod;
  const fillEmpty = Array.from({length}).fill(null);

  const list = (mod === 0 ? listData : [...listData, ...fillEmpty]) as T[];

  return (
    <FlatList
      {...rest}
      data={list}
      numColumns={col}
      className={classNames('-m-1', dClassName)}
      renderItem={item => {
        if (!item.item) return <View className="flex-1 p-1" />;
        return <View className="flex-1 p-1">{renderItem?.(item)}</View>;
      }}
    />
  );
}
