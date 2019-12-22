import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Alert, StatusBar, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
const bot_user = {
  _id: 2,
  name: 'ChibaInuBot',
  avatar: require('./Image/avatar2.png') //ให้ bot ชื่อว่า ChibaInuBot และ set รูป avatar
}
const uid = DeviceInfo.getUniqueId()
class Example extends Component {
  static navigationOptions = {
    title: 'Zoo Valley',
    headerTitleStyle: { flex: 1, textAlign: 'center', color: 'white' },
    headerLeft: null,
    headerStyle: {
        backgroundColor: '#2DCD87',
    },
}
  constructor() {
    super()
    this.state = {
      messages: [
        {
          _id: 1,
          text: "ยินดีต้อนรับสู่ Zoo Valley ผมชื่อ Chibaku หากมีข้อสงสัยถามผมได้เลย !",
          createdAt: new Date(),
          user: bot_user,
          image: ''
        },
        //set state ค่าแรกของ message ให้เป็นคำพูดจาก bot
        //message ตรงนี้จะเปลี่ยน state ไปเรื่อยๆเมื่อมีการ send ข้อความาจากฝั่งใดฝั่งหนึ่ง
      ], id: uid
    }
  };
  onSend(messages = []) {

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    })) //set state ของ message เป็นคำที่เราพิมพ์เข้าไป เมื่อกดส่ง

    console.log('onsend');
    let input_word = messages[0].text;

    this.PostMessage(input_word); // เรียกใช้ function post ส่งข้อความขึ้น cloud 
  };

  PostMessage(input_word) {
    const url = 'https://zoochatbotpython.appspot.com'; //url เชื่อม api กับ database
    const bot = axios.post(url, {
      id: this.state.id,
      input_word: input_word
    })  //post ข้อความขึ้นไปบน cloud ผ่าน api โดยประกอบไปด้วย ur,user id,ข้อความ
      .then(function (response) {
        console.log('Post response', response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.BotResponse(bot); //เรียกใช้ function get เพื่อดึงข้อมูลจากการประมวลผลของ bot 
  }

  BotResponse() {
    const id = this.state.id; 
    console.log('id', id);
    const url = `http://zoochatbotpython.appspot.com/get/datab/${id}`; //url เชื่อม api กับ database โดยเพิ่ม user id ต่อท้ายเพื่อระบุตัวตน
    axios.get(url)
      .then((Data) => {
        console.log('JSON:', Data);
        const phrase = Data.data.phrase;  //ข้อมูลที่ส่งมาตอนแรกจะเป็นชุด dict ของข้อความ ตรงนี้จะดึงส่วนที่เป็นข้อความออกมาจาก Dict
        const image = Data.data.map;  //ดึงส่วนที่เป็นรูปภาพออกมาจาก dict
        let msg = [
          {
            _id: this.state.messages.length + 1,
            text: phrase,
            createdAt: new Date(),
            user: bot_user,
            image: image
          }]; //นำข้อความหรือรูปภาพมาใส่ในตัวแปร message
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg)  //นำ message ไป set state
        }));
      })
  }

  render() {
    console.log('uid:', this.state.id);
    console.log(this.state.messages);
    return (
      <ImageBackground source={require('./Image/bg1.png')} style={styles.backgroundImage}>
        <GiftedChat
          messages={this.state.messages}  //ในส่วน chat state ของ massage จะเปลี่ยนไปเรื่อยๆเมื่อมีข้อความใหม่ๆเข้ามา
          onSend={messages => this.onSend(messages)}
          alwaysShowSend={true}

          user={{
            _id: 1,
          }}
        /></ImageBackground>
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
    textAlign: 'center'
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
})
export default Example;