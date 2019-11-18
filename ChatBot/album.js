import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";

import SelectedPhoto from './SelectedPhoto';
import { Button } from 'native-base';

export default class AutoChatBot extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        selected: '',
        photos: [],
        showSelectedPhoto: false,
        uri: ''
    };

    componentDidMount() {

        CameraRoll.getPhotos({
            first: 10,
            assetType: 'Photos',
            Album: 'zooimage',
            groupName: 'zooimage'
        })
            .then(r => {
                this.setState({ photos: r.edges });

            })
            .catch((err) => {
                //Error Loading Images
            });
    };
    selectImage(uri) {
        // define whatever you want to happen when an image is selected here
        this.setState({
            selected: uri,
            showSelectedPhoto: true,
            uri: uri
        });

        console.log('Selected image: ', uri);
    }
    render() {
        const { navigate } = this.props.navigation;
        const { showSelectedPhoto, uri } = this.state;
        if (showSelectedPhoto) {
            /*this.props.navigation.navigate('SelectedPhoto',{ name: 'user' })
            const {uri}=this.state.uri;*/
           return (
                <View>
                    <SelectedPhoto
                        uri={uri}
                         />
                    
                </View>
           )
        }
        return (

            <ImageBackground source={require('./Image/bg1.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.justContain}>
                        <Image source={require('./Image/zoo4.png')} style={styles.logo}></Image>
                        <Text style={styles.menubtn}><Text> ALBUM </Text></Text>

                    </View>

                    <ScrollView><View style={styles.imageList}>

                        {this.state.photos.map((p, i) => {

                            return (

                                <TouchableOpacity key={i} onPress={() => navigate('Data', { name: 'user' })} >

                                    <Image
                                        key={i}
                                        style={styles.imageSelect}
                                        source={{ uri: p.node.image.uri }}

                                    /></TouchableOpacity>

                            );

                        })}

                    </View>
                    </ScrollView>

                </View>

            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    fontS: {
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: 'AbrilFatface'
    },
    container: {
        margin: 30,
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    justContain: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
    },
    menubtn: {
        margin: 10,
        width: '60%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 55,
        fontFamily: 'OpenSans_Light'
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    imageSelect: {
        margin: 10,
        width: 150,
        height: 160,
    },
    imageList: {
        margin: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    dataButton: {
        marginTop: 10,
        width: '100%',
        height: 60,
        backgroundColor: '#2DCD87',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 45,
        fontFamily: 'OpenSans_Light',
        alignItems: 'center'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
    }
})