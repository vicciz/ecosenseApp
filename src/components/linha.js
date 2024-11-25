import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

const Linha = ({
  color = '#ccc',
  thickness = 1,
  spacing = 16,
  style,
}) => {
  return (
    <View
      style={[
        styles.linha,
        { borderBottomColor: color, borderBottomWidth: thickness, marginBottom: spacing,},
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  linha: {
    width: '80%',
    alignSelf:'center'
  },
});

export default Linha;
