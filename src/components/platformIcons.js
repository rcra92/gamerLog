import React, {Component} from 'react';
import {TouchableNativeFeedback, View, Text} from 'react-native';
import {Card, Icon, Rating, Badge} from 'react-native-elements';

import LottieView from 'lottie-react-native';
import {storeData, removeValue} from '../utils/AsyncStorage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';

export default class PlatformIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      platforms: [],
    };
  }

  componentWillReceiveProps(props) {
    if (props.platforms) {
      this.formatPlatform(props.platforms);
    }
  }

  formatPlatform(platforms) {
    platforms.map(platform => {
      const {
        platform: {slug},
      } = platform;
      if (
        (slug.includes('playstation') || slug.includes('ps')) &&
        !this.state.platforms.includes('playstation')
      ) {
        this.state.platforms.push('playstation');
      } else if (
        slug.includes('xbox') &&
        !this.state.platforms.includes('xbox')
      ) {
        this.state.platforms.push('xbox');
      } else if (
        slug.includes('pc') &&
        !this.state.platforms.includes('windows')
      ) {
        this.state.platforms.push('windows');
      } else if (
        slug.includes('macos') &&
        !this.state.platforms.includes('apple')
      ) {
        this.state.platforms.push('apple');
      } else {
        return null;
      }
    });
  }

  render() {
    if (_.isEmpty(this.props.platforms)) {
      return <View />;
    }
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            {this.state.platforms.map((platform, index) => {
              return (
                <FontAwesome5
                  size={20}
                  style={{paddingRight: 10}}
                  name={platform}
                  brand
                />
              );
            })}
          </View>
          <Rating imageSize={20} readonly startingValue={this.props.rating} />
        </View>

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Release Date: </Text>
            <Text style={{color: '#1FB9ED'}}>{this.props.released}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5
              size={20}
              style={{paddingRight: 10, color: 'black'}}
              name={'comments'}
              brand
            />
            <Text>{this.props.comments}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 15,
          }}>
          {this.props.genres.map(genre => {
            return (
              <Badge
                value={genre.name}
                status="error"
                textStyle={{fontSize: 16}}
                badgeStyle={{marginRight: 15, padding: 5, height: 20}}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
