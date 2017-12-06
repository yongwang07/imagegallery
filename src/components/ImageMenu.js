import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../config';

const ImageMenu = ({isGrid, showMenu, style, imgsize}) => (
    <View style={[{flex: 1},
        !isGrid && showMenu ? style : {display: 'none'},
    ]}>
        <View style={{flex:1, alignItems:'center'}}>
            <Image style={{ width:imgsize, height:imgsize }} source={{ uri: 'plus1' }} />
        </View>
        <View style={{flex:1}}>
            <Image style={{ width:imgsize, height:imgsize }} source={{ uri: 'message' }} />
        </View>
        <View style={{flex:1}}>
            <Image style={{ width:imgsize, height:imgsize }} source={{ uri: 'plus' }} />
        </View>
        <View style={{flex:1}}>
            <Image style={{ width:imgsize, height:imgsize }} source={{ uri: 'skip' }} />
        </View>
    </View>
);
const mapStateToProps = state => ({
    isGrid: state.isGrid,
    showMenu: state.showMenu
});

export default connect(mapStateToProps)(ImageMenu);
