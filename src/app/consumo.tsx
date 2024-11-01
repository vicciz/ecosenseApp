import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import Navbar from '../components/navbar';
import Button from '../components/button';
import { Link } from 'expo-router';

const TelaConsumo = () => {
  const valorConsumoGeral = 0;
  const mvpGasto = 'Geladeira';
  //const iconBoleto = require('@/assets/images/icon-boleto.png');
  //const iconGrafico = require('@/assets/images/icon-grafico.png');
  const graficos = './graficos';
  const boletos = './boletos';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteinerDados}>
        <Text style={styles.textoConsumo}>O seu consumo total</Text>
        <Text style={styles.textoValor}>R$ {valorConsumoGeral}</Text>
        <Text style={styles.textoValor}>KiloWatts Hora: {valorConsumoGeral}</Text>
        <Text style={styles.textoValor}>Aparelho com maior gasto:</Text>
        {/* Corrigido aqui */}
        <Text style={[styles.textoValor, { fontSize: 24 }]}>{mvpGasto}</Text>
      </View>
      <View style={styles.conteinerOp}>
        <View style={styles.op}>
          <Link replace href={boletos}>
            <Button
              titulo='Boletos'
              cor='white'
              icone={null}
              estiloTitulo={{ color: 'black' }}
              estiloIcone={{ width: 40, height: 40 }}
            />
          </Link>
        </View>
        <View style={styles.op}>
          <Link replace href={graficos}>
            <Button
              titulo='Gráfico'
              cor='white'
              icone={null}
              estiloTitulo={{ color: 'black' }}
              estiloIcone={{ width: 40, height: 40 }}
            />
          </Link>
        </View>
      </View>
      {/* Passando a prop activeRoute para o Navbar */}
      <Navbar activeRoute="Consumo" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
  },
  conteinerDados: {
    alignItems: 'center',
    marginBottom: 30,
  },
  textoConsumo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoValor: {
    fontSize: 18,
    marginBottom: 5,
  },
  conteinerOp: {
    flexDirection: 'row',
  },
  op: {
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default TelaConsumo;
