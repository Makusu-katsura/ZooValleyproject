import React, { Component } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
const styles = StyleSheet.create({
    container: {
        margin: '10%',
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    justContain: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    },
    justContact: {
        justifyContent: 'flex-end',
        height: 20,
        width: '100%',
        backgroundColor: 'black',
    },
    fontContact: {
        fontSize: 15,
        color: 'white',
        paddingLeft:10,
    },
    title: {
        fontSize: 40,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'LuckiestGuy',
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    btn: {
        width: '70%',
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    menubtn: {
        margin: '2%',
        width: wp('45%'),
        height: hp('15%'),
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft:10,
        fontFamily:'OpenSans_Bold',
        fontSize:hp('1.7%'),
    },
    btnmenu: {
        margin: 20,
        width: '95%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
    },
    btntouch:{
        margin: 20,
        width: '95%',
        height: 100,
    },
    btnimg:{
        marginTop: '7%',
        width: wp('100%'),
        height: hp('14%'),
        justifyContent: 'center'
    },
    logo: {
        width: wp('30%'),
        height: hp('16%'),
        resizeMode: 'stretch'
    },
})
export default styles;