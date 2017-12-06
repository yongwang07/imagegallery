import React, { Component } from 'react';
import {
    StyleSheet,
    Animated,
    PanResponder,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showDetail, displayMenu } from '../actions';
import { IMG_HEIGHT, DEVICE_WIDTH } from '../config';

class ImageSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan : new Animated.Value(0)            
        }
    }
    componentWillMount() {
        const IMG_NUM = this.props.imgs.length;
        this.dragPosition = 0;
        this.panListener = this.state.pan.addListener(value => {
            this.dragPosition = value.value;
        });
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.state.pan.setOffset(this.dragPosition);
                this.state.pan.setValue(0);
            },
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.vx < 0 && this.props.currentImgIdx === IMG_NUM - 1) return;
                if (gestureState.vx > 0 && this.props.currentImgIdx === 0) return;
                this.state.pan.setValue(gestureState.dx);
            },
            onPanResponderRelease: (e) => {
                const movedLeft = e.nativeEvent.pageX < DEVICE_WIDTH/2;
                let updateState = false;
                let toValue = movedLeft ?  DEVICE_WIDTH * (this.props.currentImgIdx + 1) * -1 : DEVICE_WIDTH * (this.props.currentImgIdx - 1) * -1;
                if (toValue > 0) {
                    toValue = 0;
                } else if (toValue < (DEVICE_WIDTH * IMG_NUM - DEVICE_WIDTH) * -1) {
                    toValue = (DEVICE_WIDTH * IMG_NUM - DEVICE_WIDTH) * -1;                    
                } else {
                    updateState = true;
                }
                this.state.pan.flattenOffset();
                if (updateState) {
                    this.transitionToNextPanel(movedLeft);
                }
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentImgIdx !== this.props.currentImgIdx) {
            this.state.pan.setValue(nextProps.currentImgIdx * DEVICE_WIDTH * -1);
        }
    }
    componentWillUnmount() {
        this.state.pan.removeListener(this.panListener);
    }
    transitionToNextPanel(movedLeft) {
        let nextIndex = movedLeft ? this.props.currentImgIdx + 1 
                                    : this.props.currentImgIdx - 1;
        Animated.timing(this.state.pan, {
          toValue: nextIndex * DEVICE_WIDTH * -1,
          duration: 300
        }).start(() => {
            this.props.showDetail(nextIndex);
        });
    }
    render() {
        const { imgs } = this.props;
        return (
            <Animated.View {...this.panResponder.panHandlers} style={[
                styles.container,
                { width: DEVICE_WIDTH * imgs.length },
                {
                    transform: [{
                        translateX: this.state.pan
                    }]
                }
            ]}>      
            {
                [...Array(imgs.length).keys()].map(i => (
                    <View key={i}>
                        <TouchableHighlight onPress={() => this.props.displayMenu()}>
                            <Image source={{ uri:`${imgs[i]}` }} style={{ width: DEVICE_WIDTH, height: IMG_HEIGHT * 2 }} />
                        </TouchableHighlight>
                    </View>
                ))
            }
            </Animated.View>
        );
    }        
}
const styles = StyleSheet.create({
    container: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        overflow:'hidden'
    }
});
const mapStateToProps = state => ({
    currentImgIdx: state.currentImgIdx,
    imgs: state.imgs
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        showDetail,
        displayMenu,
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(ImageSlide);
