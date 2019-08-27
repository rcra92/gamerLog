import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {getDetails} from '../redux/store';

const width = Dimensions.get('window').width;

class DetailsScreen extends React.Component {
  componentDidMount() {
    this.props.getDetails(this.props.navigation.state.params.title);
  }

  renderItem(item) {
    return (
      <Image
        resizeMode="cover"
        source={{uri: item.image}}
        style={{width: '100%', height: '100%'}}
      />
    );
  }

  render() {
    if (!this.props.details) return <View />;
    return (
      <View style={{flex: 1, height: '40%'}}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.navigation.state.params.screenshots}
          renderItem={({item}) => this.renderItem(item)}
          sliderWidth={width}
          itemWidth={width}
        />
        <Text>{this.props.details[0].description_raw}</Text>
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
const mapDispatchToProps = {
  getDetails,
};

//export your list as a default export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsScreen);
