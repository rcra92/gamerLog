import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {Text} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import _ from 'lodash';

import {getDetails} from '../redux/actions';
import GameCard from '../components/gameCard';

const width = Dimensions.get('window').width;

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Details',
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerTitleStyle: {
        color: 'white',
      },
    };
  };
  componentDidMount() {
    this.props.getDetails(this.props.navigation.state.params.title);
  }

  renderItem(item) {
    return (
      <Image
        resizeMode="cover"
        source={{uri: item.image}}
        style={{width: '100%', height: 400}}
      />
    );
  }

  render() {
    if (this.props.loading || _.isEmpty(this.props.details)) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
    return (
      <ScrollView
        style={{flex: 1, height: '40%', backgroundColor: 'whitesmoke'}}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.navigation.state.params.screenshots}
          renderItem={({item}) => this.renderItem(item)}
          sliderWidth={width}
          itemWidth={width}
        />
        <View style={{paddingHorizontal: 20}}>
          <Text h3 h3Style={{textAlign: 'center'}}>
            {this.props.details[0].name}
          </Text>
          <Text h4>Description</Text>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            {this.props.details[0].description_raw}
          </Text>
          <Text h4>Related</Text>
        </View>
        <FlatList
          data={this.props.related}
          horizontal
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
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games,
  details: state.gameDetails,
  related: state.gameRelated,
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
