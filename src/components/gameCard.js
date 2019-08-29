import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {Card, Icon, Badge} from 'react-native-elements';

import LottieView from 'lottie-react-native';
import {storeData, removeValue} from '../utils/AsyncStorage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PlatformIcons from './platformIcons';
import LinearGradient from 'react-native-linear-gradient';

export default class GameCard extends Component {
  render() {
    const actions = {
      storeData: () => storeData(this.props, () => this.animation.play()),
      removeValue: () => removeValue(this.props),
    };
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Details', {
            title: this.props.slug,
            screenshots: this.props.screenshots,
          });
        }}
        containerStyle={{height: 500}}
        style={{flex: 1, backgroundColor: 'red'}}>
        <Card>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, .2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <ImageBackground
            source={{uri: this.props.backgroundImage}}
            style={{height: 300, width: '100%'}}>
            <TouchableOpacity
              onPress={() => {
                actions[this.props.action]();
              }}
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, .2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  zIndex: 100,
                  position: 'absolute',
                  bottom: '50%',
                  left: '55%',
                  color: 'white',
                  height: 100,
                  width: 100,
                }}
                progress={this.props.liked || 0}
                source={require('../assets/heart.json')}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginBottom: 8,
                  color: 'white',
                  fontWeight: '800',
                }}>
                {this.props.title}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
          <PlatformIcons
            platforms={this.props.platforms}
            rating={this.props.rating}
            playtime={this.props.playtime}
            comments={this.props.comments_count}
            released={this.props.released}
            genres={this.props.genres}
          />
        </Card>
      </TouchableOpacity>
    );
  }
}
