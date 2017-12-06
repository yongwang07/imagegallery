import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [ image_width, image_height ] = [ width / 2 - 10, height / 4 ];

export const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  image_width: IMG_WIDTH,
  image_height: IMG_HEIGHT
} = { width, height, image_width, image_height };