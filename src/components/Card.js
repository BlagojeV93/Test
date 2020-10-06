import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default Card = ({ info, index }) => {

    const commentString = info.descendants == 1 ? ' comment' : ' comments';
    const pointString = info.score == 1 ? ' point' : ' points';
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContentView}>
                <Text style={styles.titleText}>
                    <Text style={styles.grayText}>{index}. </Text>{info.title}
                </Text>
                {info.url &&
                    <Text style={styles.grayText}>({info.url})</Text>
                }
            </View>
            <View style={styles.bottomContentView}>
                <Text style={styles.smallTextRegular}>{info.score + pointString}</Text>
                <Text style={styles.grayTextSmaller}>by</Text>
                <Text style={styles.smallTextRegular}>{info.by}</Text>
                <Text style={styles.grayTextSmaller}>{meassureTimePassed(info.time)}</Text>
                <Text style={styles.grayTextSmaller}>|</Text>
                <Text style={styles.smallTextRegular}>{info.descendants + commentString}</Text>
            </View>
        </View>
    )
}

// formating string for time information on story card
function meassureTimePassed(time) {

    const currentTime = Date.now();
    const day = 1000 * 60 * 60 * 24;
    const hour = day / 24;
    const minute = hour / 60;

    const difference = currentTime - Math.floor(time * 1000);

    let string;
    let diff;

    if (difference > day) {
        diff = Math.round(difference / day);
        string = diff == 1 ? diff + ' day ago' : diff + ' days ago';
    } else if (difference > hour) {
        diff = Math.round(difference / hour);
        string = diff == 1 ? diff + ' hour ago' : diff + ' hours ago';
    } else {
        diff = Math.round(difference / minute);
        string = diff == 1 ? diff + ' minute ago' : diff + ' minutes ago';
    }

    return string;
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '95%',
        borderBottomWidth: 0.5,
        borderColor: '#ACACAC',
        paddingVertical: 10
    },
    topContentView: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 5
    },
    bottomContentView: {
        width: '100%',
        flexDirection: 'row'
    },
    grayText: {
        fontSize: 16,
        color: '#ACACAC',
        marginRight: 5
    },
    titleText: {
        fontSize: 16,
        marginRight: 5
    },
    grayTextSmaller: {
        fontSize: 12,
        color: '#ACACAC',
        marginRight: 5
    },
    smallTextRegular: {
        fontSize: 12,
        marginRight: 5
    }
});