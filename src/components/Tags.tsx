import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Tags({
  color,
  textColor,
  text,
}: {
  color: string;
  textColor: string;
  text: string | number;
}) {
  return (
    <View style={[{backgroundColor: color}, styles.saleTag]}>
      <Text style={[{color: textColor}, styles.saleTagText]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  saleTag: {
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saleTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
