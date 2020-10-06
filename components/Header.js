import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import reloadImage 

const Header = () => {


    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>HackerNews</Text>
            <TouchableOpacity>
                <Image source={require()} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FB7E2C'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15
    }
});


export default Header;