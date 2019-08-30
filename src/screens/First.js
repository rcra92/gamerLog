import React, {Component} from 'react';
import {StatusBar, View, FlatList, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getGames} from '../redux/actions';
import GameCard from '../components/gameCard';

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
          containerStyle={{backgroundColor: 'tomato'}}
          inputContainerStyle={{backgroundColor: '#FF917E'}}
          inputStyle={{color: 'white'}}
          placeholderTextColor={'white'}
          onChangeText={text => this.searchGames(text)}
          placeholder="Search games"
          value={this.state.search}
        />
      </View>
    );
  }

  searchGames(text) {
    this.setState({search: text});
    setTimeout(() => {
      this.props.getGames({text: text});
    }, 300);
  }

  render() {
    if (_.isEmpty(this.props.games)) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      );
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
                liked={item.liked}
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
