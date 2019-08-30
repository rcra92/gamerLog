import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import LottieView from 'lottie-react-native';

import {storeData, removeValue} from '../utils/AsyncStorage';
import PlatformIcons from './platformIcons';

export default class GameCard extends Component {
  renderHeart() {
    return (
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        style={styles.lottie}
        progress={this.props.liked || 0}
        source={require('../assets/heart.json')}
      />
    );
  }

  render() {
    const actions = {
      storeData: () => storeData(this.props, () => this.animation.play()),
      removeValue: () => removeValue(this.props),
    };

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push('Details', {
            title: this.props.slug,
            screenshots: this.props.screenshots,
          });
        }}
        containerStyle={styles.cardHeight}
        style={styles.cardStyle}>
        <Card>
          <View style={styles.imageContainer} />
          <ImageBackground
            source={{uri: this.props.backgroundImage}}
            style={styles.imageBackground}>
            <View style={styles.maskView}>
              <Button
                containerStyle={styles.containerButton}
                buttonStyle={styles.buttonStyle}
                onPress={() => {
                  actions[this.props.action]();
                }}
                icon={this.renderHeart()}
              />
              <Text style={styles.titleStyle}>{this.props.title}</Text>
            </View>
          </ImageBackground>
          <PlatformIcons
            platforms={this.props.platforms}
            rating={this.props.rating}
            playtime={this.props.playtime}
            comments={this.props.comments}
            released={this.props.released}
            genres={this.props.genres}
          />
        </Card>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  lottie: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    bottom: '75%',
    left: '80%',
    position: 'absolute',
  },
  buttonStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'whitesmoke',
  },
  titleStyle: {
    fontSize: 24,
    marginBottom: 8,
    color: 'white',
    fontWeight: '800',
  },
  imageBackground: {
    height: 300,
    width: null,
    margin: -15,
    marginBottom: 30,
  },
  cardStyle: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  cardHeight: {
    height: 500,
  },
});
