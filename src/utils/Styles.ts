import {StyleSheet, ViewStyle} from 'react-native';
import {Colors} from './colors';
import {StyleProp} from 'react-native';

const shadowStyle: StyleProp<ViewStyle> = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const Styles = StyleSheet.create({
  shadowDefault: {
    ...shadowStyle,
  },
});
