import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({
  name,
  color,
  size,
  fontSize,
  title,
}: {
  name: string;
  fontSize?: number;
  color: string;
  size: number;
  title: string;
}) {
  return (
    <View style={styles.headerContainer}>
      <Icon name={name} size={size} color={color} />
      <Text style={[styles.headerTitle, {fontSize}]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
});
