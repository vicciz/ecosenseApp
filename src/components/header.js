import {React, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Header = () => {
  //const logo = require('@/assets/images/logoexample.png');
  //const iconConfig = require('@/assets/images/configuracao.png');
  //const iconDuvida = require('@/assets/images/socorro.png');
  const [userName, setUserName] = useState('');
  const handleDuvidaPress = () => {
    // Navigate to help screen or show help modal
    console.log('Ícone de dúvida pressionado');
  };

  const handleConfigPress = () => {
    // Navigate to settings screen
    console.log('Ícone de configuração pressionado');
  };

  return (
    <View style={styles.containerHeader}>
      {/* Agrupa Logo e Texto em uma coluna */}
      <View style={styles.logoAndMessageContainer}>
        {/*<Image source={logo} style={styles.logo} />*/}
        <Text style={styles.welcomeText}>Seja bem-vindo, {userName}</Text>
      </View>

      {/* Ícones à direita */}
      <View style={styles.containerIcon}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleDuvidaPress} 
          accessibilityRole="button"
          accessibilityLabel="Ícone de dúvida"
        >
          {/*}<Image
            source={iconDuvida}
            style={[styles.icon, styles.iconDuvida]}
          />*/}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleConfigPress} 
          accessibilityRole="button"
          accessibilityLabel="Ícone de configuração"
        >
          {/*<Image
            source={iconConfig}
            style={[styles.icon, styles.iconConfig]}
          />*/}
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
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 30,
    marginBottom: 20,
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
