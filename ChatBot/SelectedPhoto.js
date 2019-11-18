import React, { Component } from 'react';
import style from './style'
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
//import navigate from './album'
 // const Data=()=>{
  console.log('Selected image: ');
  class Selected extends Component{
    render(){
  return(
    <ImageBackground source={require('./Image/bg1.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <View style={styles.justContain}>
                <Image source={require('./Image/zoo4.png')} style={styles.logo}></Image>
                <Text style={styles.menubtn}><Text>KNOWLEDGE</Text></Text>
            </View>
            <View style={styles.justPic}>
                <View style={styles.showPic}></View>
                <View style={styles.showPic}></View>   
            </View>
            <View style={styles.justWord}>
                <View style={styles.showWord}></View>   
            </View>
        </View>
    </ImageBackground>
)
  }
};

const SelectedPhoto = (props) => {
  
  //const { navigate } = this.props.navigation;
  const { uri } = props;
  return (
    <ImageBackground source={require('./Image/bg1.png')} style={style.backgroundImage}>
      <View style={styles.container}>
       <View style={style.justContain}>

          <Image source={require('./Image/zoo4.png')} style={styles.logo}></Image>
          <Text style={styles.menubtn}><Text> View Information </Text></Text>

        </View>
        <Image
          source={{ uri: uri }}
          style={styles.image} />
      </View>
      <TouchableOpacity style={styles.dataButton} onPress={() =>Data()}>
                        <Text style={styles.fontTitle}>View Information</Text>
                        
                    </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
},
  image: {
    height: 400,
    width: 350
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
  },
  showPic:{
    marginTop: 10,
    width: '48%',
    height: '89%',
    backgroundColor:'white',
    borderRadius:6,
},
justPic:{
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop:10
},
justWord:{
    width: '98%',
    height: '80%',
},
showWord:{
    width: '100%',
    height: '65%',
    backgroundColor:'white',
    borderRadius:6,
}
});

export default SelectedPhoto;