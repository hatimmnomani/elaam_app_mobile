import React from 'react';
import { Image, StyleSheet } from 'react-native';
import DecorativeHeaderSvG from '../../assets/DecorativeHeaderSvG';

const DecorativeHeader = ({ style }) => {
  return <DecorativeHeaderSvG style={[styles.headerImage, style]} />;
};

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 47,
  },
});

export default DecorativeHeader;
