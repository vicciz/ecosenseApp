import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Navbar from '../components/navbar';


const TelaGraficos: React.FC = () => {
  const [consumoSemanal, setConsumoSemanal] = useState<number[]>([]);

  useEffect(() => {
    // Simula o carregamento de dados
    const consumoMock = [35, 40, 45, 30, 50, 60, 55]; // Exemplo de valores em kWh
    setConsumoSemanal(consumoMock);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Consumo dos Últimos 7 Dias</Text>

      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Gasto atual (R$):</Text>
        <Text style={styles.infoText}>Gasto do Mês Anterior:</Text>
        <Text style={styles.infoText}>Mês com menor Gasto:</Text>
        <Text style={styles.infoText}>Mês com maior Gasto:</Text>
        <Text style={styles.infoText}>Total reduzido em relação ao mês anterior:</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>Ranking de Consumo</Text>
        <Text>Geladeira</Text>
        <Text>Luz da sala</Text>
        <Text>Roteador</Text>
      </View>

      <Navbar activeRoute="/metas" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    width: '90%',
    marginBottom: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    width: '90%',
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default TelaGraficos;
