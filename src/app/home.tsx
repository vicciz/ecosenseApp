import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../components/header';
import Visor from '../components/visorConsumo';
import Navbar from '../components/navbar';

const TelaHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.content}>
        <Visor/>
      </View>
      <Navbar activeRoute={"/home"}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    paddingHorizontal: 16, // Adiciona espaçamento lateral
  },
});

export default TelaHome;