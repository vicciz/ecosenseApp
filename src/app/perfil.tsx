import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipagem para os dados do usuário
interface Usuario {
  nome: string;
  sobrenome: string;
  email: string;
  createdAt: string;
}

const Perfil = () => {
  // Tipagem do estado de usuario
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const imgUser = { 
    uri: 'https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg' 
  };

  useEffect(() => {
    async function getUsuario() {
      const response = await AsyncStorage.getItem('usuarioData');
      if (response) {
        const json: Usuario = JSON.parse(response);
        setUsuario(json); // Atribuir todos os dados ao estado de uma vez
      }
    }
    getUsuario();
  }, []); // useEffect será chamado apenas uma vez após o componente ser montado

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imgUser}
        source={imgUser}
        resizeMode="cover"
      />
      {usuario ? (
        <>
          <Text style={styles.nmUser}>
            {usuario.nome} {usuario.sobrenome}
          </Text>
          <Text style={styles.nmUser}>
            Email Cadastrado: {usuario.email}
          </Text>
        </>
      ) : (
        <Text style={styles.nmUser}>Carregando...</Text> // Exibido enquanto os dados não são carregados
      )}

      <View>
        <TouchableOpacity style={styles.btn}>
          Modo Escuro
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          Alterar Idioma
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          Alterar Foto
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          Alterar Senha
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          Sair
        </TouchableOpacity>
      </View>
      <Navbar activeRoute="/perfil" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  btn: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default Perfil;
