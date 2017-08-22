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

export default class SwipeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  componentWillMount() {
      this.handleAdd();
  }

  async handleAdd() {
    try {
      let response = await fetch('https://newsapi.org/v1/articles?source=techcrunch&apiKey=608bdc30ab01443daca0c1768e10127d');
      let result = await response.json();
      console.log(result)
      let resultKeyed = []
      for (var i = 0; i < result.articles.length; i++){
        result.articles[i].key = result.articles[i].url.replace(/[^\w]/g,'');
        resultKeyed.push(result.articles[i])
      }
      console.log(resultKeyed)
      this.setState({
        cards: resultKeyed
      });
      console.log(this.state.cards)
    } catch (err) {
      alert(JSON.stringify(err));
    }
    /*
    try {
      let response = await fetch('https://randomuser.me/api');
      let result = await response.json();
      result.results[0].key = result.results[0].login.username
      console.log(result)
      this.setState({
        cards: [result.results[0], ...this.state.cards],
      });
      console.log(this.state.cards)
    } catch (err) {
      alert(JSON.stringify(err));
    }*/
  };

  handleRemove = (index) => {
    let start = this.state.cards.slice(0, index);
    let end = this.state.cards.slice(index + 1);
    this.setState({
      cards: start.concat(end),
    });
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
        cardList={this.state.cards}
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
