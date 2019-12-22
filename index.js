/**
 * @format
 */
import React, { Component } from 'react'
import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import Splash from './ChatBot/Splash';
import Chat from './ChatBot/Chat';
import  menu from './ChatBot/Menu';
import gallery from './ChatBot/album'
import Data from './ChatBot/DataZoo'
import AppContainer from './ChatBot/Menu'
AppRegistry.registerComponent(appName, () =>Main);
class Main extends Component{
    constructor(props){
        super(props);
        this.state = { currentScreen: 'Splash'};
        setTimeout(() => {
            this.setState({ currentScreen:'AppContainer'})
        },3000)
    }
    render(){
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <AppContainer />
        return mainScreen
    }
}