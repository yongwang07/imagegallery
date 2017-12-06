import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { IMG_HEIGHT } from '../config';

export default ImageTitle = () => (
    <View style={styles.title}>
        <Text style={styles.text}>Image gallery</Text>
    </View>
);

const styles = StyleSheet.create({
    title: {
        height: IMG_HEIGHT/1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderWidth: 2,
        borderColor: '#E7E7E7',
        marginBottom: 10
    },
    text: {
        fontSize: IMG_HEIGHT/5,
        fontWeight: 'bold',
        color: '#4A4A4A'
    }
});
