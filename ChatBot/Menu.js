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

    static navigationOptions = {
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
                    <TouchableOpacity onPress={() => navigate('Auto', { name: 'user' })}>
                        <Image source={require('./Image/button.png')} style={style.btnimg}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Take', { name: 'user' })}>
                        <Image source={require('./Image/buttonim.png')} style={style.btnimg}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Album', { name: 'user' })} >
                        <Image source={require('./Image/buttonal.png')} style={style.btnimg}></Image>
                    </TouchableOpacity>
                </View>
                <View style={style.justContact}>
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
},
    {
        orientation: 'portrait',
    })
const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;