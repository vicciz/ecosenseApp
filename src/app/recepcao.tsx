import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from '../components/button';
import {useRouter} from 'expo-router';

const Recepcao = () =>{
  const router = useRouter();
  const irRegistro = '/registro';
  const irEntrar = '/entrar';
  const logo = require('../assets/logoClaro.png');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteinerTitulo}>
        <View style={styles.conteinerImage}>
          <Image style={styles.logo} source={logo}/>
        </View>
        
        <View style={styles.conteinerText}>
          <Text style={styles.textoBv}>Seja bem-vindo,{'\n'} faça login ou cadastre-se</Text>
        </View>
        <View style={styles.navigation}>
            <Button
              titulo='Cadastrar'
              cor='#0056b3'
              icone= {null}
              onPress={() => router.push(irRegistro)}
            /> 
            <Button
              titulo='Entrar'
              cor='#21bf9f'
              icone= {null}
              onPress={() => router.push(irEntrar)}
            />

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 8,
  },
  conteinerTitulo: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  conteinerImage: {
    marginBottom: 20,
  },

  conteinerText: {
    marginBottom: 20,
  },
  textoBv: {
    fontSize: 23,
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold',

  },

  navigation: {
    flexDirection: 'row',
    width: '100%', // Adjust width as needed
  },
  logo:{
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    borderRadius:100,
  },
});
export default Recepcao;