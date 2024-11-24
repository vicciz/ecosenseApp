import React, { useState, useEffect } from 'react';
import { 
  Text, 
  SafeAreaView, 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Alert, 
  TextInput, 
  Modal 
} from 'react-native';
import Navbar from '../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './../../config/config.json';

// Tipagem para os dados do usuário
interface Usuario {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  createdAt: string;
}

const Perfil: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [idUser, setIdUser] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [senhaAntiga, setSenhaAntiga] = useState<string>('');
  const [novaSenha, setNovaSenha] = useState<string>('');
  const [confNovaSenha, setConfNovaSenha] = useState<string>('');

  const imgUser = {
    uri: 'https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg'
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await AsyncStorage.getItem('usuarioData');
        const idResponse = userResponse;

        if (userResponse) {
          const usuarioData: Usuario = JSON.parse(userResponse);
          setUsuario(usuarioData);
        }

        if (idResponse) {
          const idData = JSON.parse(idResponse);
          setIdUser(idData.id);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const deleteUser = async (): Promise<void> => {
    try {
      const response = await fetch(`${config.urlRootNode}deleteUser`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('Sucesso', result.message);
        await AsyncStorage.removeItem('usuarioData');
      } else {
        Alert.alert('Erro', result.message);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    }
  };

  const updatePassword = async (): Promise<void> => {
    if (!idUser) {
      Alert.alert('Erro', 'ID do usuário não encontrado.');
      return;
    }

    if (!novaSenha.trim() || !confNovaSenha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (novaSenha !== confNovaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch(`${config.urlRootNode}verifyPass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: idUser,
          senhaAntiga,
          novaSenha,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', result.message || 'Senha atualizada com sucesso.');
        setModalVisible(false);
      } else {
        Alert.alert('Erro', result.error || 'Erro ao atualizar a senha.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('usuarioData');
      Alert.alert('Logout realizado com sucesso!');
      // Aqui você pode redirecionar o usuário para a tela de login, caso necessário.
    } catch (error) {
      Alert.alert('Erro', 'Falha ao realizar logout.');
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
            {usuario.id}
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
        <TouchableOpacity style={styles.btn} onPress={deleteUser}>
          <Text>Deletar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
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
            placeholder="Senha Antiga"
            secureTextEntry={true}
            onChangeText={(text) => setSenhaAntiga(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            secureTextEntry={true}
            onChangeText={(text) => setNovaSenha(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme a Nova Senha"
            secureTextEntry={true}
            onChangeText={(text) => setConfNovaSenha(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={updatePassword}>
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
