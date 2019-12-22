import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
const uid = DeviceInfo.getUniqueId(); //ดึง id ของเครื่อง user มาใช้เป็น user id 
export default class AutoChatBot extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        photos: [], // set ของรูปในตอนแรกยังเป็น null
        isdisabled: true, bgColor: false, // ให้ปุ่ม view information ยังเป็นสีเทาหมายถึง้องเลือกรูปที่จำอัพโหลดก่อนถึงจะกดได้
    };
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
    componentDidMount() {//ดึงรูปมาจาก folder zooimage 1000 รูป แล้วนำไป set state 
        CameraRoll.getPhotos({
            first: 1000,
            assetType: 'Photos',
            Album: 'zooimage',
            groupName: 'zooimage'
        })
            .then(r => {
                this.setState({ photos: r.edges }); //set state ให้รูปทั้งหมด อยู่ในตัวแปร photo
            })
            .catch((err) => {
                //Error Loading Images
            });
    };
    UploadPhoto(selected_uri, filename) {
        const url = "https://zoochatbotpython.appspot.com/upload";  //url เชื่อม api กับ database
        const image = {
            uri: selected_uri,
            type: 'image/jpeg',
            name: filename
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
            .then(response => {
                console.log('response upload', response);
                alert("upload successful")  //เช็คสถานะการอัพโหลด หากสำเร็จให้ alert successful
                this.setState({ isdisabled: false, bgColor: true });    //เปลี่ยนstate ของปุ่ม view information เป็น disable และ เปลี่ยนปุ่มเป็นสีเขียว
            })
            .catch(error => {
                console.error(error);
                alert("upload failed")
            });
    }

    selectImage(uri, filename) {
        // function ที่ทำงานเมื่อกดที่รูปภาพ
        console.log('uri: ', uri);
        this.UploadPhoto(uri, filename); //เรียกใช้ function upload เพื่อส่งที่อยู่และชื่อรูปขึ้นไป predict บน cloud 
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
                        {this.state.photos.map((p, i) => { //นำ set ของรูปภาพใน state มา map แล้วทำการแยกแต่ละรูปโดยใช้ array i
                            return (
                                <TouchableOpacity key={i} onPress={() => this.selectImage(p.node.image.uri, p.node.image.filename)}>
                                    {/*นำรูปที่ map มาทำให้สัมผัสได้เพื่อใช้ในการ upload เมื่อแตะแล้วให้ส่ง uri และ filename ของภาพไปที่ function selectImage*/}
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
                        {/*สร้างปุ่ม view information เพื่อกดเข้าไปข้อมูลหลังจาก upload เสร็จ โดยให้ navigate ไปที่หน้า DataZoo*/}
                        <Text style={styles.fontTitle}>View Information</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: '7%',
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    justContain: {
        height: hp('15%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
    },
    menubtn: {
        margin: '7%',
        width: wp('50%'),
        height: hp('12%'),
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: wp('10%'),
        fontFamily: 'OpenSans_Light'
    },
    logo: {
        width: wp('30%'),
        height: hp('18%'),
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    imageSelect: {
        margin: '3%',
        width: wp('35%'),
        height: hp('20%'),
    },
    imageList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
        fontSize: hp('4%')
    }
})