import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showDetail } from '../actions'
import { IMG_WIDTH, IMG_HEIGHT, DEVICE_HEIGHT } from '../config';

class ImageGrid extends Component {
    componentWillMount() {
        this.offsetY = 0;
        this.imgList = [];
        const { imgs } = this.props;
        for (let i = 0; i < imgs.length; i += 2) {
            const row = (
                <View key={i} style={styles.row}>
                    <TouchableHighlight onPress={() => this.props.showDetail(i)}>
                        <Image style={{width: IMG_WIDTH, height: IMG_HEIGHT, marginRight: 4}} source={{uri: `${imgs[i]}`}}/>
                    </TouchableHighlight>
                    {
                        i + 1 < imgs.length ?
                        <TouchableHighlight onPress={() => this.props.showDetail(i + 1)}>
                            <Image style={{width: IMG_WIDTH, height: IMG_HEIGHT, marginLeft: 4}} source={{uri: `${imgs[i+1]}`}} />
                        </TouchableHighlight> :
                        <Image style={{width: IMG_WIDTH, height: IMG_HEIGHT, marginLeft: 4}} />
                    }
                </View>
            )
            this.imgList.push(row);
        }
    }
    componentDidUpdate() {
        let imgHeight = (this.props.imgs.length) * (Math.floor(IMG_HEIGHT + 1)/2) - 2 * IMG_HEIGHT;
        if (!this.props.isGrid) {
            let upper = IMG_HEIGHT * (this.props.currentImgIdx/2);
            let down = upper + DEVICE_HEIGHT - IMG_HEIGHT;
            if ((upper < this.offsetY) || (this.offsetY < Math.min(down,imgHeight))) {
                setTimeout(()=>this.scroll.scrollTo({
                    y:Math.min(IMG_HEIGHT * (this.props.currentImgIdx/2), imgHeight)}),
                900);
            }
        }
    }
    handleScroll(event) {
        this.offsetY = event.nativeEvent.contentOffset.y;
    }
    render() {
        return ( 
            <ScrollView bounces={false}  onScroll={this.handleScroll.bind(this)} scrollEventThrottle={20} ref={(scroll) => this.scroll = scroll}>
                { this.imgList }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
    },
});

const mapStateToProps = state => ({
    currentImgIdx: state.currentImgIdx,
    imgs: state.imgs,
    isGrid: state.isGrid,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        showDetail
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid);
