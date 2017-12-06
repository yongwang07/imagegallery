import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectImage, showGrid } from '../actions'

import { DEVICE_WIDTH } from '../config';

const ImageHeader = ({isGrid, showMenu, showGrid, imgs, currentImgIdx, style, imgsize}) => (
    <View style={[
        !isGrid && showMenu ? style : {display: 'none'},
    ]}>
        <View style={{flex: 6}}>
            <Text style={[styles.text, {fontSize:imgsize}]}>Google {imgs[currentImgIdx]}</Text>
        </View>
        <TouchableHighlight style={{flex: 1}} onPress={() => showGrid()}>
            <Image style={{ width:imgsize, height:imgsize }} source={{ uri: 'close' }} />
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
    text: {
        color:'white',
        alignSelf: 'center'
    }
});

const mapStateToProps = state => ({
    currentImgIdx: state.currentImgIdx,
    isGrid: state.isGrid,
    showMenu: state.showMenu,
    imgs: state.imgs    
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        selectImage,
        showGrid
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ImageHeader);
