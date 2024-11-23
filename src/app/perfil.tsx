import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import Navbar from '../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipagem para os dados do usuário
interface Usuario {
  id: string; // Adicionando ID para identificar o usuário
  nome: string;
  sobrenome: string;
  email: string;
  createdAt: string;
}

const deleteUser = async (userId: string): Promise<void> => {
  try {
    const response = await fetch(`http://<SEU_IP_LOCAL>:3000/deleteUser/${userId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (result.status === 'success') {
      Alert.alert('Sucesso', result.message);
      // Deslogar após deletar o usuário
      await AsyncStorage.removeItem('usuarioData');
    } else {
      Alert.alert('Erro', result.message);
    }
  } catch (error) {
    Alert.alert('Erro', 'Falha ao conectar com o servidor.');
  }
};

const updatePassword = async (userId: string, newPassword: string): Promise<void> => {
  try {
    const response = await fetch(`http://<SEU_IP_LOCAL>:3000/updatePassword/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senha: newPassword }),
    });

    const result = await response.json();

    if (response.ok) {
      Alert.alert('Sucesso', result.message);
    } else {
      Alert.alert('Erro', result.error || 'Erro ao atualizar a senha.');
    }
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
  }
};

const Perfil: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const imgUser = { 
    uri: 'https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg' 
  };

  useEffect(() => {
    const getUsuario = async () => {
      const response = await AsyncStorage.getItem('usuarioData');
      if (response) {
        const json: Usuario = JSON.parse(response);
        setUsuario(json); // Atribuir todos os dados ao estado de uma vez
      }
    };
    getUsuario();
  }, []);

  const handleDeleteAccount = () => {
    if (usuario) {
      Alert.alert(
        'Confirmação',
        'Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Deletar', onPress: () => deleteUser(usuario.id) },
        ]
      );
    }
  };

  const handleUpdatePassword = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (usuario) {
      updatePassword(usuario.id, newPassword);
      setModalVisible(false);
    }
  };

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
        <Text style={styles.nmUser}>Carregando...</Text>
      )}

      <View>
        <TouchableOpacity style={styles.btn}>
          <Text>Modo Escuro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Alterar Idioma</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Alterar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setModalVisible(true)}
        >
          <Text>Alterar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleDeleteAccount}>
          <Text>Deletar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
      <Navbar activeRoute="/perfil" />

      {/* Modal para alterar senha */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Alterar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme a Nova Senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.btn} onPress={handleUpdatePassword}>
            <Text>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(false)}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Perfil;
