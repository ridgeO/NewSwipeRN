import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ArticleSwiper from './ArticleSwiper.js';
import SourceSwiper from './SourceSwiper.js';

export default class NewSwipeRN extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SourceSwiper/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      },
});

AppRegistry.registerComponent('NewSwipeRN', () => NewSwipeRN);
