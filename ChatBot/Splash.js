import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated, Image, StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = { timer: 0 }
  }
  render() {
    return (
      <View style={styles.viewset}>
        <StatusBar hidden />
        <ImageLoder source={require('./Image/zoo3.png')} style={styles.logo}></ImageLoder>
        <Text style={styles.container}> created by Information Engineering KMITL</Text>
      </View>
    )
  }
}
export class ImageLoder extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black',
  },
  logo: {
    width: wp('85%'),
    height: hp('50%'),
    resizeMode: 'stretch',
  },
  viewset: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})