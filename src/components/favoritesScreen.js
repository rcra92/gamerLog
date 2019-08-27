import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StatusBar, View, FlatList, Text} from 'react-native';
import GameCard from './gameCard';

import {getData} from '../utils/AsyncStorage';

class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
    };
  }
  componentDidMount() {
    this.getFavorites();
  }

  async getFavorites() {
    try {
      const value = await getData();
      const responseJson = await JSON.parse(value);
      this.setState({favorites: responseJson});
    } catch (e) {
      // error reading value
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <StatusBar barStyle="default" />
        <FlatList
          data={this.state.favorites}
          ListEmptyComponent={() => <Text>Você não possui nenhum favorito</Text>}
          renderItem={({item}) => {
            return (
              <GameCard
                title={item.title}
                backgroundImage={item.backgroundImage}
                navigation={this.props.navigation}
                slug={item.slug}
                liked={1}
                screenshots={item.screenshots}
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games,
  details: state.gameDetails,
  loading: state.loading,
});

//Map your action creators to your props.
const mapDispatchToProps = {};

//export your list as a default export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritesScreen);
