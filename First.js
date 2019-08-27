import React, {Component} from 'react';
import {StatusBar, View, FlatList, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';

import {getGames} from './src/redux/store';
import {connect} from 'react-redux';
import GameCard from './src/components/gameCard';

class First extends Component {
  componentDidMount() {
    this.props.getGames();
  }
  render() {
    if (this.props.loading && !this.props.games) return <ActivityIndicator />;
    return (
      <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
        <StatusBar barStyle="default" />
        <FlatList
          data={this.props.games}
          renderItem={({item}) => {
            return (
              <GameCard
                title={item.name}
                backgroundImage={item.background_image}
                navigation={this.props.navigation}
                slug={item.slug}
                screenshots={item.short_screenshots}
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
