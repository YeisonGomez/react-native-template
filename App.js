import React, { useState, useRef, useEffect } from 'react';
import { YellowBox } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Provider, useDispatch } from 'react-redux';

import initStore from './store/Store';
import { Main } from './Main'

export const store = initStore();

YellowBox.ignoreWarnings(['Require cycle:']);
//YellowBox.ignoreWarnings();
console.error = (error) => error.apply;

export default function App(props){

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
          ...FontAwesome.font,
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