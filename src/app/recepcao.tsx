import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import Button from '../components/button';
import { useRouter } from 'expo-router';

const Recepcao = () => {
  const router = useRouter();

  // Rotas centralizadas
  const routes = {
    registro: '/registro',
    entrar: '/entrar',
  };

  const closeApp = () =>{
    BackHandler.exitApp();
  };

  const logo = require('../assets/logoClaro.png');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image style={styles.logo} source={logo} />
        
        {/* Mensagem de boas-vindas */}
        <Text style={styles.welcomeText}>
          Seja bem-vindo,{'\n'}faça login ou cadastre-se
        </Text>

        {/* Botões */}
        <View style={styles.navigation}>
          <Button
            titulo="Sair"
            cor="#0056b3"
            icone={null}
            onPress={closeApp}
          />
          <Button
            titulo="Entrar"
            cor="#21bf9f"
            icone={null}
            onPress={() => router.push(routes.entrar)}
          />
        </View>

        {/* Link de cadastro */}
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => router.push(routes.registro)}
        >
          <Text style={styles.registerText}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 16,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 10,
  },
  registerLink: {
    marginTop: 15,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Recepcao;
