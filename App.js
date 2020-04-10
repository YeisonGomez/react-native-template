import React, { useState, useRef, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import useLinking from './navigation/useLinking';
import initStore from './store/Store';
import { Main } from './Main'

export const store = initStore();
const Stack = createStackNavigator();

YellowBox.ignoreWarnings(['Require cycle:']);
console.error = (error) => error.apply;

export default function App(props){
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const { getInitialState } = useLinking(containerRef);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        setInitialNavigationState(await getInitialState());
        
        await Font.loadAsync({
          ...Ionicons.font,
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    )
  }
}