import React, { Component } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../config';

import ImageHeader from './ImageHeader';
import ImageMenu from './ImageMenu';
import ImageSlide from './ImageSlide';

class ImageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: new Animated.Value(0)
        }
        this.inputRange = 0;
        this.init = true;
    }
    componentWillReceiveProps(nextProps) {
        this.init = false;
        if (this.props.isGrid !== nextProps.isGrid) {
            Animated.timing(this.state.slide, {
                toValue: this.inputRange + 1,
                duration: 600,
                easing: Easing.easeOutBack
            }).start(() => this.inputRange++);
        }
    }
    render() {
        return (
            <Animated.View style={[{flexDirection: 'column', position:'absolute', top: DEVICE_HEIGHT},
                this.init ? {height: 0} : {height: '100%'},
                {
                    top: this.state.slide.interpolate({
                    inputRange: [this.inputRange, this.inputRange + 1],
                    outputRange: this.props.isGrid ? [0, DEVICE_HEIGHT] : [DEVICE_HEIGHT, 0]                    
                })}
            ]}> 
                <ImageHeader style={styles.menu} imgsize = {30} />
                <ImageSlide />
                <ImageMenu style={styles.menu} imgsize = {30} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        flexDirection: 'row',
        width: DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
    },
});

const mapStateToProps = state => ({
    isGrid: state.isGrid
});
export default connect(mapStateToProps)(ImageDetail);
