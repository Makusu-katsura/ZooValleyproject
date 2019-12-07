import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { Button } from 'native-base';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
const uid = DeviceInfo.getUniqueId();
export default class AutoChatBot extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        selected: '',
        photos: [],
        isdisabled: true, bgColor: false,
        fileName: ''
    };
    bgColor1(bgColor) {
        console.log("bgColor:",bgColor)
        if(this.state.bgColor==true){
            return styles.dataButton;
        }
        else{
            return styles.dataDefault;
        }
    }
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
    UploadPhoto() {
        const url = "https://zoochatbotpython.appspot.com/upload";
        console.log('hi:', this.state.selected);
        const image = {
            uri: this.state.selected,
            type: 'image/jpeg',
            name: this.state.fileName

        }
        const imgBody = new FormData();
        imgBody.append('file', image);
        imgBody.append('userid', uid);
        console.log('imgBody:', imgBody);

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: imgBody
        })
            .then(response => {
                console.log('response upload', response);

                alert("upload successful")
                this.setState({ isdisabled: false, bgColor: true });

            })
            .catch(error => {
                console.error(error);
                alert("upload failed")
                this.setState({ photo: null });
            });
    }

    selectImage(uri, filename) {
        // define whatever you want to happen when an image is selected here
        this.setState({
            selected: uri,
            fileName: filename
            // showSelectedPhoto: true,

        });
        //if(this.state.selected!=null)
        this.UploadPhoto();   


        console.log('Selected image: ', this.state.selected);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (

            <ImageBackground source={require('./Image/bg1.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.justContain}>
                        <Image source={require('./Image/album1.png')} style={styles.logo}></Image>
                        <Text style={styles.menubtn}><Text> ALBUM </Text></Text>

                    </View>

                    <ScrollView><View style={styles.imageList}>

                        {this.state.photos.map((p, i) => {

                            return (

                                <TouchableOpacity key={i}
                                    onPress={() => this.selectImage(p.node.image.uri, p.node.image.fileName)}
                                >

                                    <Image
                                        key={i}
                                        style={styles.imageSelect}
                                        source={{ uri: p.node.image.uri }}

                                    /></TouchableOpacity>

                            );

                        })}
                       
                    </View>
                    </ScrollView>
                    <TouchableOpacity disabled={this.state.isdisabled} onPress={() => navigate('Data', { name: 'user' })} style={this.bgColor1()}>
                            <Text style={styles.fontTitle}>View Information</Text>
                        </TouchableOpacity>
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
    },
    dataDefault: {
        marginTop: 10,
        width: '100%',
        height: 60,
        backgroundColor: '#636465',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 45,
        fontFamily: 'OpenSans_Light',
        alignItems: 'center',
        color:'#A5A6A7'
    },
})