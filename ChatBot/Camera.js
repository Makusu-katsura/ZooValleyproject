import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from './style'
import AwesomeAlert from 'react-native-awesome-alerts';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const uid = DeviceInfo.getUniqueId();   //ดึง id ของเครื่อง user มาใช้เป็น user id 
export default class TakePhoto extends React.Component {
    static navigationOptions = {
        header: null,
        headerMode: 'none'
    }
    constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.state = { showAlert: true, avatarSource: null, photo: null, isdisabled: true, bgColor: false };
    }
    bgColor1(bgColor) { //เป็นการแสดงปุ่มของการแสดงข้อมูล โดยถ้าหากยังไม่ทำการอัพโหลดข้อมูล ตัว stage จะแสดงปุ่มเป็นสีเทา ถ้าหากอัพโหลดแล้วจะเป็น สีเขียว
        console.log("bgColor:",bgColor)
        console.log("bgColor:", bgColor)
        if (this.state.bgColor == true) {
            return styles.dataButton;
        }
        else {
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
        const url = "https://zoochatbotpython.appspot.com/upload";  //url เชื่อม api กับ database
        const image = {
            uri: this.state.photo.uri,
            type: 'image/jpeg',
            name: this.state.photo.fileName
        }   //dict รูปภาพ ประกอบไปด้วย ตำแหน่งของรูป,ชนิดของไฟล์,ชื่อไฟล์
        const imgBody = new FormData(); //form ในการส่งรูปประกอบไปด้วย รูป และ user id 
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
        }) //ติดต่อ api ส่งรูปภาพไปยัง cloud ซึ่งดึงได้แค่ทีละรูป จึงต้องสร้าง form เพื่อใช้เป็น pattern ในการส่งรูป
            .then((response) => {
                console.log('response upload', response);
                alert("อัพโหลดเสร็จเรียบร้อย")  //เช็คสถานะการอัพโหลด หากสำเร็จให้ alert successful
                this.setState({ isdisabled: false, bgColor: true });
            })
            .catch((error) => {
                console.error(error);
                alert("เกิดความผิดพลาด")
                this.setState({ photo: null });
            });
    }
    selectPhotoTapped() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: './zooimage', //แก้ที่อยู่ของรูปภาพที่ถ่ายให้ไปอยู่ใน folder zooimage ที่สร้างเพิ่มในมือถือ เมื่อใช้งานกล้องครั้งแรก 

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
                let source = { uri: response.uri }; //เมื่อถ่ายภาพเสร็จจะให้ตัวแปร source เก็บ path ของรูปเอาไว้
                this.setState({ photo: response }); // set ให้ตัวแปร photo มีค่าเป็นรูปภาพที่ถ่ายมา
                console.log("response", response);
                console.log("uri:", response.uri.replace('file://', ''));
                this.UploadPhoto(); //เรียกใช้ function upload เพื่อส่งที่อยู่และชื่อรูปขึ้นไป predict บน cloud 
                this.setState({
                    avatarSource: source,   //นำ path ของรูปมา set state เพื่อแสดงในกรอบสี่เหลี่ยม
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
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>  {/*เมื่อกดที่ช่องสี่เหลี่ยมจะเข้ากล้องเพื่อใช้ถ่ายภาพ */}
                        <View
                            style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ? (   //ให้ช่องสำหรับถ่ายภาพตอนแรกเป็น null
                                <Text style={styles.styleIm}>กดตรงนี้เพื่อถ่ายรูปครับ !</Text>
                            ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />//เมื่อถ่ายภาพเสร็จจะเปลี่ยนจาก null เป็นภาพที่ set state เอาไว้
                                )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.isdisabled} onPress={() => navigate('Data', { name: 'user' })} style={this.bgColor1()}>
                        <Text style={styles.fontTitle}>View Information</Text>
                        {/*สร้างปุ่ม view information เพื่อกดเข้าไปข้อมูลหลังจาก upload เสร็จ โดยให้ navigate ไปที่หน้า DataZoo*/}
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
        margin: hp('4%'),
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
        width: wp('85%'),
        height: hp('55%'),
        backgroundColor: '#E8ECF0'
    },
    menubtn: {
        marginLeft: 20,
        width: wp('50%'),
        height: hp('13%'),
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4.7%'),
        fontFamily: 'OpenSans_Light'
    },
    dataButton: {
        marginTop: '3%',
        width: wp('85%'),
        height: hp('8%'),
        backgroundColor: '#2DCD87',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4%'),
        fontFamily: 'OpenSans_Light',
        alignItems: 'center'
    },
    dataDefault: {
        marginTop: '3%',
        width: wp('85%'),
        height: hp('8%'),
        backgroundColor: '#636465',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4%'),
        fontFamily: 'OpenSans_Light',
        alignItems: 'center',
        color: '#A5A6A7'
    },
    logo: {
        width: wp('35%'),
        height: hp('20%'),
        resizeMode: 'stretch'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
        fontSize: hp('4%')
    },
    styleIm: {
        fontSize: hp('2.5%'),
    }
});