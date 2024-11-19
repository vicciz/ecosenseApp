import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from '../components/button';
import {useRouter} from 'expo-router';

const Recepcao = () =>{
  //const logo = require('@/assets/images/logoexample.png'); // Update the path to your logo
  const router = useRouter();
  const irRegistro = '/registro';
  const irEntrar = '/entrar';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteinerTitulo}>
        {/*<View style={styles.conteinerImage}>
          <Image style={{
            width: 150, // Adjust as needed
            height: 150, // Adjust as needed
            borderRadius:"100%", 
          }} source={logo}/>
        </View>
        */}
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
});
export default Recepcao;