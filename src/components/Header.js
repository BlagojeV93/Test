import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import reloadImage from '../images/reload.png'

export default Header = ({ onRefresh }) => {

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>HackerNews</Text>
            <TouchableOpacity onPress={() => onRefresh()}>
                <Image style={styles.reloadImg} source={reloadImage} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FB7E2C',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    reloadImg: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }
});