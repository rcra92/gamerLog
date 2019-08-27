import React, {Component} from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {Card} from 'react-native-elements';

import LottieView from 'lottie-react-native';
import {storeData} from '../utils/AsyncStorage';

export default class GameCard extends Component {
  render() {
    console.log(this);
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.navigation.navigate('Details', {
            title: this.props.slug,
            screenshots: this.props.screenshots,
          });
        }}
        containerStyle={{height: 500}}
        style={{flex: 1}}>
        <Card
          image={{uri: this.props.backgroundImage}}
          featuredTitle={this.props.title}>
          <TouchableNativeFeedback
            onPress={() => {
              storeData(this.props, () => this.animation.play());
            }}
            style={{flex: 1}}>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              style={{height: 100, width: 100}}
              progress={this.props.liked || 0}
              source={require('../assets/heart.json')}
            />
          </TouchableNativeFeedback>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}
