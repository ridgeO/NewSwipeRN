import React from 'react';
import { View, FlatList, Button, Dimensions } from 'react-native';
import Card from './Card.js';

const DIMENSIONS = Dimensions.get('window');

export default class CardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  handleAdd = async () => {
    try {
      const res = await fetch('https://newsapi.org/v1/articles?source=techcrunch&apiKey=608bdc30ab01443daca0c1768e10127d');
      const result = await res.json();
      console.log(result.articles)
      this.setState({
        articles: [result.articles, ...this.state.articles],
      });
      console.log(this.state.articles)
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  handleRemove = (index) => {
    const start = this.state.articles.slice(0, index);
    const end = this.state.articles.slice(index + 1);
    this.setState({
      articles: start.concat(end),
    });
  };

  componentWillMount() {
    this.handleAdd();
  }

  render() {
    return (
      <View>
        <FlatList
          style={{ marginTop: 20, height: DIMENSIONS.height, width: DIMENSIONS.width }}
          contentContainerStyle={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: 'red', borderWidth: 1}}
          data={this.state.articles[0]}
          renderItem={({ item, index }) => (
            <Card
              {...item}
              index={index}
              onSwipe={this.handleRemove}
            />
          )}
          keyExtractor={(item) => item.url}
          scrollEnabled={false}
        />
        <Button
          title={'powered by NewsAPI.org'}
          onPress={''}
        />
      </View>
    );
  }
}
