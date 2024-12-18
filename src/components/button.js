import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ 
  titulo,
  onPress,
  cor = '#007BFF', 
  desabilitado = false, 
  icone = null,
  estiloIcone = {}, 
  estiloTitulo = {},

}) => {
  return (
    <View>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: cor }]}
          disabled={desabilitado}
          activeOpacity = {0.9}
          onPress={onPress}
        >
          {icone && (
            <Image source={icone} style={[styles.icone, estiloIcone]} resizeMode="contain" />
          )}
          <Text style={[styles.titulo, estiloTitulo]}> {titulo} </Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 5,
    width: 150,
    height: 300,
    maxWidth: 150,
    maxHeight: 80,
  },
  icone: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
});

Button.propTypes = {
  titulo: PropTypes.string.isRequired,
  cor: PropTypes.string,
  desabilitado: PropTypes.bool,
  icone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  estiloTitulo: PropTypes.object,
  estiloIcone: PropTypes.object,
  onPress:PropTypes.func.isRequired,

};

export default Button;
