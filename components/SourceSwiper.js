'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet
} from 'react-native';
import flattenStyle from 'flattenStyle';
import CardStack from 'react-native-card-stack';

export default class SourceSwiper extends Component {

  static navigationOptions = {
    title: 'Sources'
  }

  constructor(props) {
    super(props);
    this.state = {
      allCards: [],
      displayedCards: [],
    };
  }

  componentWillMount() {
    this.pullSources();
  }

  async pullSources() {
    try {
      let response = await fetch('https://newsapi.org/v1/sources');
      let result = await response.json();
      console.log(result)
      let resultKeyed = []
      for (var i = 0; i < result.sources.length; i++){
        result.sources[i].key = result.sources[i].id.replace(/[^\w]/g,'');
        resultKeyed.push(result.sources[i])
      }
      console.log(resultKeyed)
      this.setState({
        allCards: resultKeyed
      });
      console.log(this.state.allCards)
      let selection = []
      for (var i = 0; i < 3; i++){
        selection.push(this.state.allCards.shift(i))
      }
      this.setState({
        allCards: this.state.allCards,
        displayedCards: selection.reverse()
      });
      console.log(this.state.displayedCards)
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  handleAdd() {
    if (this.state.allCards.length > 0) {
      let newCard = this.state.allCards.shift(0)
      console.log(newCard)
      this.setState({
        displayedCards: [newCard, ...this.state.displayedCards]
      });
    }
  };

  handleRemove = (index) => {
    this.state.displayedCards.pop()
    this.setState({
      displayedCards: this.state.displayedCards
    });
    this.handleAdd();
  };

  renderCard(cardObject) {
    return(
      <View style={Styles.card}>
        <ImageBackground source={{uri: cardObject.urlsToLogos.large}} style={Styles.cardImage}>
          <View style={Styles.cardText}>
            <Text style={Styles.cardTextMain}>{cardObject.name}</Text>
            <Text style={Styles.cardTextSecondary}>{cardObject.description}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }

  render() {
    return (
      <CardStack
        cardList={this.state.displayedCards}
        renderCard={this.renderCard}
        cardHeight={flattenStyle(Styles.card).height}
        cardWidth={flattenStyle(Styles.card).width}
        cardRotation={20}
        cardOpacity={0.5}
        onSwipeRight={this.handleRemove}
        onSwipeLeft={this.handleRemove}
        onSwipeUp={this.handleRemove}
        onSwipeDown={this.handleRemove}
        leftSwipeThreshold={-150}
        rightSwipeThreshold={150}
        upSwipeThreshold={-150}
        downSwipeThreshold={150}
      />
    );
  }
}

const Styles = StyleSheet.create({
  card: {
    height: 500,
    width: 350,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  cardImage: {
    flex: 1,
    backgroundColor: '#1E90FF'
  },
  cardText: {
    position: 'absolute',
    bottom: 0,
    width: 350,
    padding: 20,
    backgroundColor: ['transparent', 'rgba(0, 0, 0, 0.5)']
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 20,
    color: '#F9F9F9',
    backgroundColor: 'transparent'
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 15,
    color: 'grey',
    backgroundColor: 'transparent'
  }
});
