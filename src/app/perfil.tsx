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

const Perfil: React.FC = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idUser, setIdUser] = useState('');
  const [email, setEmail] = useState('');
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
        const response = await AsyncStorage.getItem('usuarioData');
        if (response) {
          const json = JSON.parse(response);
          setIdUser(json.id || '');
          setNome(json.nome || '');
          setSobrenome(json.sobrenome || '');
          setEmail(json.email || '');
        } else {
          console.log('Nenhum dado encontrado no AsyncStorage.');
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  const deleteUser = async (): Promise<void> => {
    try {
      const response = await fetch(`${config.urlRootNode}deleteUser`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: idUser,
        }),
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
  const alterarSenhaTela =() =>{
    setModalVisible(true);
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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: idUser,
          senhaAntiga: senhaAntiga,
          novaSenha: novaSenha,
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
      <>
        <Text style={styles.nmUser}>
          {idUser}
          {nome} {sobrenome}
        </Text>
        <Text style={styles.nmUser}>
          {email}
        </Text>
      </>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Alterar Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Alterar Idioma</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> alterarSenhaTela()} style={styles.optionButton}>
          <Text style={styles.optionText}>Alterar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Sair</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    padding: 8,
  },
  nmUser: {
    margin: 12,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgUser: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular
    borderWidth: 2,
    borderColor: '#fff', // Amarelo
    marginBottom: 6,
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
  optionsContainer: {
    width: '90%',
  },
  optionButton: {
    flexDirection: 'row', // Ícone e texto lado a lado
    alignItems: 'center',
    backgroundColor:'#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Sombras para Android
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    alignItems:'center',
  },
});

export default Perfil;
