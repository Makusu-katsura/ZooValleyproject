import ViewPhotos from './ViewPhotos';
import React, { Component } from 'react'
import {
    Image,
    View,
    StyleSheet,
    Text,
    TouchableHighlight
  } from 'react-native';
export default class CameraScreen extends Component {

  state = {
    showPhotoGallery: false,
    photoArray: []
  }

  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 1000000 ,
        groupName: 'zooimage'})
      .then(res => {
        let photoArray = res.edges;
        this.setState({ showPhotoGallery: true, photoArray: photoArray })
      })
  }

  render() {
    if (this.state.showPhotoGallery) {
      return (
        <ViewPhotos
          photoArray={this.state.photoArray} />
      )
    }
    return (
      <View style={styles.container}>

        <TouchableHighlight
          onPress={() => this.getPhotosFromGallery()}>
          <Image
            source='zooimage' />
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      height: 300,
      width: 200
    }
  });