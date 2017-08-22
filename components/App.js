import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ArticleSwiper from './ArticleSwiper.js';
import SourceSwiper from './SourceSwiper.js';

const StackNav = StackNavigator({
  SourceSelector: { screen: SourceSwiper, name: 'SourceSwiper' },
  ArticleSelector: { screen: ArticleSwiper, name: 'ArticleSwiper' }
});

export default class NewSwipeRN extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StackNav/>
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
