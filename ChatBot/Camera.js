import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from './style'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';

const uid = DeviceInfo.getUniqueId();
// More info on all the options is below in the API Reference... just some common use cases shown here
export default class TakePhoto extends React.Component {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    static navigationOptions = {
        header: null,
        headerMode: 'none'
    }
    constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.state = { showAlert: true, avatarSource: null, photo: null };
    }
    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };
    UploadPhoto() {
        const url = "https://zoochatbotpython.appspot.com/upload";  
        const image = {
            uri: this.state.photo.uri,
            type: 'image/jpeg',
            name: this.state.photo.fileName
        }
        const imgBody = new FormData();
        imgBody.append('file', image);
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
                this.postId(image);
                alert("upload successful")
            })
            .catch(error => {
                console.error(error);
                alert("upload failed")
                this.setState({ photo: null });
            });
    }
    postId(image){
        const url = "https://zoochatbotpython.appspot.com/uploadimage/database";
        axios.post(url, {
          imgUri: image,
          userid: uid
        })
        .then(response =>{
          console.log('upload id,uri response =>',response);
        })
        .catch(err =>{
          console.log('upload id,uri error =>',err);
        })
      }
    selectPhotoTapped() {
        const options = {
            //quality: 1.0,
            storageOptions: {
                skipBackup: true,
                path: './zooimage',
            },
        };

        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({ photo: response });
                console.log("response", response);
                console.log("uri:", response.uri.replace('file://', ''));
                this.UploadPhoto();
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    render() {

        const { navigate } = this.props.navigation;
        const { showAlert } = this.state;
        return (
            //<Image source={this.state.avatarSource} style={styles.uploadAvatar} />
            <ImageBackground source={require('./Image/bg1.png')} style={style.backgroundImage}>

                <View style={styles.container}>

                    <View style={style.justContain}>
                        <Image source={require('./Image/zoo4.png')} style={styles.logo}></Image>
                        <Text style={styles.menubtn}><Text> TAKE PICTURE </Text></Text>
                    </View>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                        <View
                            style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ? (

                                <Text>คลิ๊กตรงนี้เพื่อถ่ายรูปครับ !</Text>

                            ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dataButton} onPress={() => navigate('Data', { name: 'user' })}>
                        <Text style={styles.fontTitle}>View Information</Text>
                    </TouchableOpacity>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="ZooImage"
                        message="คลิ๊ก ! พื้นที่สีเทาเพื่อทำการถ่ายรูป. โปรดถ่ายรูปให้เห็นหน้าสัตว์ด้วยครับ"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="Ok, got it."
                        confirmButtonColor="#2DCD87"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                </View>
            </ImageBackground>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        margin: 30,
        flex: 1,
        alignItems: 'center',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        //borderRadius: 75,
        width: 350,
        height: 400,
        backgroundColor: '#E8ECF0',
        //opacity: 0.9,
    },
    menubtn: {
        marginLeft: 20,
        width: '65%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 40,
        fontFamily: 'OpenSans_Light'
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
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'stretch'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
        fontSize: 30
    }
});