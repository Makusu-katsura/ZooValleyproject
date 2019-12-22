import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native'
import axios from 'axios';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import ImageZoom from 'react-native-image-pan-zoom';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const uid = DeviceInfo.getUniqueId();   //ดึง id ของเครื่อง user มาใช้เป็น user id 
export default class DataZoo extends Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        info: null,
        class: null
    };
    constructor(props) {
        super(props)
        this.getAnimalClass()//เรียกใช้ function getAnimalClas เมื่อเข้ามาถึงหน้านี้ทันที
        console.log("stateClass:", this.state.class)
    }

    getAnimalClass() { // get class ของ animal มาเพื่อ reference ว่าเป็นสัตว์ตัวไหน
        const iduser = uid;
        const url = `https://zoochatbotpython.appspot.com/getbyuser/animal/${iduser}`;   //url เชื่อม api กับ database โดยเพิ่ม user id ต่อท้ายเพื่อระบุตัวตน
        console.log("coming:", url);
        const urll = url;
        axios.get(urll)
            .then((Data) => {
                console.log("Aniclass:", Data.data.animal);
                const animalClass = Data.data.animal; //ให้ animalClass มีค่าเป็นข้อมูล class สัตว์ที่ดึงมาจาก api
                console.log("animalClass:", animalClass);
                this.setState({ class: animalClass }); //set state ให้ class  มีค่าเป็นข้อมูลที่ดึงมาจาก api
                console.log("classFix:", this.state.class)
                console.log("finished!");
                const aniclass = this.state.class;
                console.log("aniRe:", aniclass);//check ค่าใน state
                this.getAnimalInfo(aniclass);//นำค่าใน state ไปเรียกใช้ function 
            })
            .catch((err) => {
                console.log('aniclass error', err);
            })
    }
    getAnimalInfo(animalClass) { //นำ class ที่ได้มาไป get ข้อมูลของสัตว์ตัวนั้น
        const url = `https://zoochatbotpython.appspot.com/getanimalinfo/${animalClass}`;//url เชื่อม api กับ database โดยเพิ่ม animalClass ต่อท้ายเพื่อระบุสัตว์ที่จะดึงข้อมูล
        const url2 = url;
        axios.get(url2)
            .then((Data) => {
                console.log("Animal:", Data.data.info);
                const animalInfo = Data.data.info;//ให้ animalClass มีค่าเป็นข้อมูลของสัตว์ที่ดึงมาจาก api
                console.log("animalInfo:", animalInfo);
                this.setState({ info: animalInfo });//set state ให้ info มีค่าเป็นข้อมูลที่ดึงมาจาก api
            })
            .catch(err => {
                console.log('Animal error', err);
            });
    }
    render() {
        return (
            <ImageBackground source={require('./Image/bg1.png')} style={styles.backgroundImage}>

                <ImageZoom style={styles.dataGet}
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={Dimensions.get('window').height * 9 / 10}
                >
                    <Image source={{ uri: this.state.info }} style={{
                        width: wp('100%'),
                        height: hp('90%')
                    }}></Image>
                </ImageZoom>{/*นำรูปข้อมูลสัตว์มาใส่ libary ImageZoom เพื่อให้ย่อ/ขยายได้*/}
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
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    showPic: {
        marginTop: 10,
        width: '48%',
        height: '89%',
        backgroundColor: 'white',
        borderRadius: 6,
    },
    justPic: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    justWord: {
        width: '98%',
        height: '80%',
    },
    showWord: {
        width: '100%',
        height: '65%',
        backgroundColor: 'white',
        borderRadius: 6,
    },
    dataGet: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})