import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from './style'
import AwesomeAlert from 'react-native-awesome-alerts';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';

const uid = DeviceInfo.getUniqueId();
export default class TakePhoto extends React.Component {
    static navigationOptions = {
        header: null,
        headerMode: 'none'
    }
    constructor(props) {
        super(props);
       
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.state = { showAlert: true, avatarSource: null, photo: null, isdisabled:true, bgColor:false};
    }
    bgColor1(bgColor) {
        console.log("bgColor:",bgColor)
        if(this.state.bgColor==true){
            return styles.dataButton;
        }
        else{
            return styles.dataDefault;
        }
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
        console.log('id', uid);
        const url = "https://zoochatbotpython.appspot.com/upload";  
        const image = {
          uri: this.state.photo.uri,
          type: 'image/jpeg',
          name: this.state.photo.fileName
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
        .then((response) =>{
          console.log('response upload',response);
          alert("อัพโหลดเสร็จเรียบร้อย")
          this.setState({ isdisabled:false, bgColor:true });
        })
        .catch((error) => {
          console.error(error);
          alert("เกิดความผิดพลาด")
          this.setState({ photo: null });
        });
      }
    selectPhotoTapped() {
        const options = {
            rotation:0,
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
            <ImageBackground source={require('./Image/bg1.png')} style={style.backgroundImage}>

                <View style={styles.container}>

                    <View style={style.justContain}>
                        <Image source={require('./Image/takepic1.png')} style={styles.logo}></Image>
                        <Text style={styles.menubtn}><Text> TAKE PICTURE </Text></Text>
                    </View>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                        <View
                            style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ? (

                                <Text style={styles.styleIm}>กดตรงนี้เพื่อถ่ายรูปครับ !</Text>

                            ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  disabled={this.state.isdisabled} onPress={() => navigate('Data', { name: 'user' })} style={this.bgColor1()}>
                        <Text style={styles.fontTitle}>View Information</Text>
                    </TouchableOpacity>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Zoo Notify"
                        message="คลิ๊ก ! พื้นที่สีเทาเพื่อทำการถ่ายรูป. โปรดถ่ายรูปให้เห็นหน้าสัตว์ด้วยครับ เมื่อถ่ายรูปเสร็จแล้วต้องรอจนกว่าจะขึ้นอัพโหลดเสร็จเรียบร้อยแล้วจึงกด View Information เพื่อดูข้อมูลสัตว์ได้ครับ"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="รับทราบ"
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
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'stretch'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
        fontSize: 30
    },
    styleIm:{
        fontSize:20,
    }
});