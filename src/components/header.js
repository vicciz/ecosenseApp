import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function getUsuario() {
      const response = await AsyncStorage.getItem('usuarioData');
      if (response) {
        const json = JSON.parse(response);
        setUsuario(json); // Atribuir todos os dados ao estado de uma vez
      }
    }
    getUsuario();
  }, []); // useEffect será chamado apenas uma vez após o componente ser montado

  const userName = usuario ? usuario.nome : 'Usuário'; // Verificar se o usuário existe para exibir o nome

  const handleDuvidaPress = () => {
    console.log('Ícone de dúvida pressionado');
  };

  const handleConfigPress = () => {
    console.log('Ícone de configuração pressionado');
  };

  return (
    <View style={styles.containerHeader}>
      <View style={styles.logoAndMessageContainer}>
        <Text style={styles.welcomeText}>Seja bem-vindo, {userName}</Text>
      </View>

      <View style={styles.containerIcon}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDuvidaPress}
          accessibilityRole="button"
          accessibilityLabel="Ícone de dúvida"
        >
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleConfigPress}
          accessibilityRole="button"
          accessibilityLabel="Ícone de configuração"
        >
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    backgroundColor: '#0088FF',
    height: 180,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  logoAndMessageContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  containerIcon: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconDuvida: {
    tintColor: 'white',
  },
  iconConfig: {
    tintColor: 'white',
  },
});

export default Header;
