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

export default class ArticleSwiper extends Component {

  static navigationOptions = {
    title: 'Articles'
  }

  constructor(props) {
    super(props);
    this.state = {
      allCards: [],
      displayedCards: [],
    };
  }

  componentWillMount() {
    this.pullarticles();
  }

  async pullarticles() {
    try {
      let response = await fetch('https://newsapi.org/v1/articles?source=bbc-news&apiKey=608bdc30ab01443daca0c1768e10127d');
      let result = await response.json();
      let resultKeyed = []
      for (var i = 0; i < result.articles.length; i++){
        result.articles[i].key = result.articles[i].url.replace(/[^\w]/g,'');
        resultKeyed.push(result.articles[i])
      }
      this.setState({
        allCards: resultKeyed
      });
      let selection = []
      for (var i = 0; i < 3; i++){
        selection.push(this.state.allCards.shift(i))
      }
      this.setState({
        allCards: this.state.allCards,
        displayedCards: selection.reverse()
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  handleAdd() {
    if (this.state.allCards.length > 0) {
      let newCard = this.state.allCards.shift()
      console.log('new')
      console.log(newCard)
      this.setState({
        displayedCards: [newCard, ...this.state.displayedCards]
      });
    }
  };

  handleRemove = (index) => {
    this.state.displayedCards.pop();
    this.setState({
      displayedCards: this.state.displayedCards
    });
    this.handleAdd();
  };

  renderCard(cardObject) {
    return(
      <View style={Styles.card}>
        <ImageBackground source={{uri: cardObject.urlToImage}} style={Styles.cardImage}>
          <View style={Styles.cardText}>
            <Text style={Styles.cardTextMain}>{cardObject.title}</Text>
            <Text style={Styles.cardTextSecondary}>{cardObject.author}</Text>
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
