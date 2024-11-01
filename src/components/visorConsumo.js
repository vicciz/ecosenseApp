import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Visor() {
  const [valorConsumo, setValorConsumo] = useState(0);

  const handleConnect = () => {
    // Logic to connect or fetch data
    // Example: setValorConsumo(newValue);
    console.log('Conectar pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerConsumo}>
        <Text style={styles.titulo}>
          Este é o seu Consumo Atual
        </Text>
        <Text style={styles.valor}>
          {valorConsumo}
        </Text>
      </View>
      <TouchableOpacity style={styles.btnConectar} onPress={handleConnect} accessibilityLabel="Conectar">
        <Text style={styles.btnText}>Conectar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerConsumo: {
    backgroundColor: 'blue',
    width: '90%',
    height: 200,
    borderRadius: 5,
    margin: 20,
    justifyContent: 'center',
  },
  titulo: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  valor: {
    margin: 10,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    borderRadius: 5,
    height: 50,
    alignContent: 'center',
  },
  btnConectar: {
    backgroundColor: '#0088FF',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
