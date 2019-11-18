import React, { Component } from 'react'
import { StyleSheet, Text, View} from 'react-native'
const styles = StyleSheet.create({
    container: {
        margin: 40,
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
        margin: 10,
        width: '60%',
        height: 115,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        padding:3,
        fontFamily:'OpenSans_Bold',
        fontSize:14,
    },
    btnmenu: {
        margin: 30,
        width: '95%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'stretch'
    },
})
export default styles;