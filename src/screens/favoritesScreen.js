import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StatusBar, View, FlatList, Text} from 'react-native';
import GameCard from '../components/gameCard';

import {getData} from '../utils/AsyncStorage';

class FavoritesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Favorites',
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerTitleStyle: {
        color: 'white',
      },
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
    };
  }
  componentDidMount() {
    this.sub = this.props.navigation.addListener('willFocus', () => {
      this.getFavorites();
    });
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
      <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
        <StatusBar barStyle="default" />
        <FlatList
          data={this.state.favorites}
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Você não possui nenhum favorito</Text>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <GameCard
                title={item.title}
                backgroundImage={item.backgroundImage}
                navigation={this.props.navigation}
                action={'removeValue'}
                slug={item.slug}
                screenshots={item.screenshots}
                platforms={item.platforms}
                rating={item.rating}
                genres={item.genres}
                released={item.released}
                comments={item.comments_count}
                playtime={item.playtime}
                liked={1}
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
