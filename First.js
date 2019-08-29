import React, {Component} from 'react';
import {
  StatusBar,
  View,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  Text,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

import {getGames} from './src/redux/store';
import {connect} from 'react-redux';
import GameCard from './src/components/gameCard';

class First extends Component {
  static navigationOptions = ({navigation}) => {
    return {header: null};
  };
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    this.props.getGames();
  }

  renderSearchBar() {
    return (
      <View>
        <SearchBar
          clearIcon={false}
          cancelIcon={false}
          onChangeText={text => {
            this.searchGames(text);
          }}
          placeholder="Type Here..."
          value={this.state.search}
        />
      </View>
    );
  }

  searchGames(text) {
    this.setState({search: text});
    this.props.getGames({text: text});
  }

  render() {
    if (this.props.loading && !this.props.games) {
      return <ActivityIndicator />;
    }
    return (
      <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
        <StatusBar barStyle="default" />
        {this.renderSearchBar()}
        <FlatList
          data={this.props.games}
          renderItem={({item}) => {
            return (
              <GameCard
                title={item.name}
                backgroundImage={item.background_image}
                navigation={this.props.navigation}
                action={'storeData'}
                slug={item.slug}
                screenshots={item.short_screenshots}
                platforms={item.platforms}
                rating={item.rating}
                genres={item.genres}
                released={item.released}
                comments={item.comments_count}
                playtime={item.playtime}
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
  loading: state.loading,
});

const mapDispatchToProps = {
  getGames,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(First);
