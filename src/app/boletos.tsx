import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Navbar from '../components/navbar';

const TelaBoletos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aqui estão os seus Boletos</Text>
      <Navbar activeRoute="/metas" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Use a cor correta para o fundo
    padding: 16, // Aumentado para melhor espaçamento
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  text: {
    fontSize: 24, // Aumentado para melhor legibilidade
    color: '#333',
    textAlign: 'center', // Centraliza o texto
    marginBottom: 20, // Adiciona espaço entre o texto e a Navbar
  },
});

export default TelaBoletos;