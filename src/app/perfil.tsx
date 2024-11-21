import React, { useState} from 'react';
import { Text, SafeAreaView,View , StyleSheet, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/navbar';


//Deletar conta
//Adicionar foto
//Alterar senha, nome, sobrenome

const Perfil = () => {
  const [nameUser, setNameUser] = useState();
  const [email, setEmail] = useState();
  const imgUser = { 
    uri: 'https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg' 
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imgUser}
        source={imgUser}
        resizeMode="cover" // Ajusta como a imagem será exibida
      />
      <Text style={styles.nmUser}>
        {nameUser}
      </Text>

      <Text style={styles.nmUser}>
      Email Cadastrado: {email}
      </Text>

      <View>
        <TouchableOpacity style={styles.btn}> Modo Escuro</TouchableOpacity>
        <TouchableOpacity style={styles.btn}> Alterar Idioma</TouchableOpacity>
        <TouchableOpacity style={styles.btn}> Alterar Senha</TouchableOpacity>
      </View>
      <Navbar activeRoute={"/perfil"}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#fff',
    padding: 8,
  },
  nmUser: {
    margin: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgUser: {
    width: 200, // Largura da imagem
    height: 200, // Altura da imagem
    borderRadius: 100, // Faz a imagem ficar circular
  },
  btn:{
    backgroundColor:'red',
  },
});
export default Perfil;
