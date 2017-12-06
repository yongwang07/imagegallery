/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/createStore';

import ImageGrid from './src/components/ImageGrid';
import ImageTitle from './src/components/ImageTitle';
import ImageDetail from './src/components/ImageDetail';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ImageTitle />
          <ImageGrid />
          <ImageDetail />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 20
  }
});
