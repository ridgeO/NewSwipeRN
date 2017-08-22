import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ArticleSwiper from './ArticleSwiper.js';

export default class NewSwipeRN extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ArticleSwiper/>
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
