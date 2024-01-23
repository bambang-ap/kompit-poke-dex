import 'global-methods';

import React from 'react';
import {StatusBar} from 'react-native';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from 'react-native-recoil-persist';
import {RecoilRoot} from 'recoil';

import RootStackNavigator from './navigators';

function App() {
  const ref = useNavigationContainerRef();

  const [initialState] = React.useState();
  const [queryClient] = React.useState(new QueryClient());

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
            <NavigationContainer initialState={initialState} ref={ref}>
              <RootStackNavigator />
            </NavigationContainer>
          </ReactNativeRecoilPersistGate>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
