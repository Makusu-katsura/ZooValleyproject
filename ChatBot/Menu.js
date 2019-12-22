import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Alert, StatusBar, TouchableOpacity } from 'react-native'
import { ImageBackground, Image, TouchableHighlight } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AutoChatBot from './Chat'
import PhotoAlbum from './album'
import style from './style'
import TakePhoto from './Camera'
import DataZoo from './DataZoo'

export class Menu extends Component {

    static navigationOptions = {    //เป็นการประกาศตัวแปรสำหรับการตั้งค่าของ body navigationOption
        header: null,
        headerMode: 'none'
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('./Image/bg1.png')} style={style.backgroundImage}>
                <View><StatusBar hidden /></View>
                <View style={style.container}>
                    <View style={style.justContain}>
                        <Image source={require('./Image/zoo4.png')} style={style.logo}></Image>
                        <Text style={style.menubtn}><Text> Hi, Everyone my name is Chibaku. Welcome to our zoo land. If you have a question. You can ask ZooChat and ZooImage</Text></Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate('Auto', { name: 'user' })}>{/* เป็นปุ่มสำหรับการเปลี่ยนแปลงไปยังหน้าของตัว chatbot สำหรับการสอบถามต่างๆ */}
                        <Image source={require('./Image/button.png')} style={style.btnimg}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Take', { name: 'user' })}>{/* เป็นปุ่มสำหรับการเปลี่ยนแปลงไปยังหน้าของ camera 
                    ไว้สำหรับการถ่ายรูปแล้วไปทำการทำนายสัตว์ */}
                        <Image source={require('./Image/buttonim.png')} style={style.btnimg}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Album', { name: 'user' })} >{/* เป็นปุ่มสำหรับการเปลี่ยนแปลงไปยังหน้าของ album 
                        ไว้หรับการดูรูปที่เราทำการถ่ายสัตว์ไปแล้ว สามารถกดรูปภาพอีก 1 ครั้งเพื่อทำการ upload แล้วสามารถดูข้อมูลสัตว์อีกครั้งได้*/}
                        <Image source={require('./Image/buttonal.png')} style={style.btnimg}></Image>
                    </TouchableOpacity>
                </View>
                <View style={style.justContact}>{/* แสดง contact ของแอพลิเคชัน*/}
                    <Text style={style.fontContact}> Contact Admin : netbean123@gmail.com </Text>
                </View>
            </ImageBackground>
        )
    }
}
const AppStackNavigator = createStackNavigator({
    Home: { screen: Menu },
    Auto: { screen: AutoChatBot },
    Take: { screen: TakePhoto },
    Album: { screen: PhotoAlbum },
    Data: { screen: DataZoo }
},//เป็นการประกาศสร้างตัว stacknavigator ไว้สำหรับเปลี่ยนหน้าของข้อมูลไปยังหน้าต่างๆแบบ stack ซ้อนกัน
    {
        orientation: 'portrait',
    })
const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;