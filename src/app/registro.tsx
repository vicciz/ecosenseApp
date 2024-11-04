import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  TextInput,
  Modal, 
  Alert,
} from 'react-native';
import {useRouter} from 'expo-router';
import config from '../../config/config.json';
const Cadastro = () => {

  // Armazenamento de dados
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Ícones/imagens usadas
  //const iconUser = require('@/assets/images/icon-identidade.png');
  //const iconEmail = require('@/assets/images/icon-identidade.png');
  //const iconSenha = require('@/assets/images/icon-senha.png');
  //const iconConfirmar = require('@/assets/images/confirmar.png');

  // Controle de Formulário
  const router = useRouter();
  const irRecepcao = "/recepcao";
  const irHome = "/home";

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAtual, setModalAtual] = useState(1);

  const endCadastro = () => {
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    setModalVisible(false);
    
  };
  const cancelCadastro = () =>{
    Alert.alert('Cadastro cancelado');
    setModalVisible(false);
    router.replace(irRecepcao);
  };


  const irPara = (nextModal : number) => {
    // Validações antes de avançar para a próxima etapa
    if (nextModal > modalAtual) {
      switch (modalAtual) {
        case 1:
          if (!user.trim()) {
            Alert.alert('Validação', 'Por favor, insira um nome válido.');
            return;
          }
          break;
        case 2:
          if (!email.trim()) {
            Alert.alert('Validação', 'Por favor, insira um email válido.');
            return;
          }
          // Validação simples de email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            Alert.alert('Validação', 'Por favor, insira um email válido.');
            return;
          }
          break;
        case 3:
          if (!senha) {
            Alert.alert('Validação', 'Por favor, insira uma senha.');
            return;
          }
          if (senha.length < 6) {
            Alert.alert('Validação', 'A senha deve ter pelo menos 6 caracteres.');
            return;
          }
          break;
        default:
          break;
      }
    }

    setModalAtual(nextModal);
  };

  //Database
  async function registerUser(){
    let reqs = await fetch(config.urlRootNode + 'create', {
      method: 'POST', 
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json',
      },
      body: JSON.stringify({
        nomeUser: user,
        senhaUser: senha,
        emailUser: email,
      })
    }); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={() => setModalVisible(true)}>
        <Text style={styles.txtbotao}>Vamos Cadastrar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {modalAtual === 1 && (
              <>
                <Text style={styles.title}>Informe o seu Nome</Text>
                {/*<Image source={iconUser} style={styles.icon} />*/}
                <TextInput
                  style={styles.textbox}
                  autoCapitalize="words"
                  autoFocus={true}
                  placeholder="Nome"
                  value={user}
                  onChangeText={(text)=>setUser(text)}
                />
                <View style={styles.navigation}>
                  {/* Removido o botão "Anterior" na primeira etapa */}
                  <TouchableOpacity style={styles.botao} onPress={(cancelCadastro) }>
                    <Text style={styles.txtbotao}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botao} onPress={() => irPara(2)}>
                    <Text style={styles.txtbotao}>Próximo</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {modalAtual === 2 && (
              <>
                <Text style={styles.title}>O seu E-mail</Text>
                {/*<Image source={iconEmail} style={styles.icon} />*/}
                <TextInput
                  style={styles.textbox}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoFocus={true}
                  placeholder="E-mail"
                  value={email}
                  onChangeText={(text)=>setEmail(text)}
                />
                <View style={styles.navigation}>
                  <TouchableOpacity style={styles.botao} onPress={() => irPara(1)}>
                    <Text style={styles.txtbotao}>Anterior</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botao} onPress={() => irPara(3)}>
                    <Text style={styles.txtbotao}>Próximo</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {modalAtual === 3 && (
              <>
                <Text style={styles.title}>Crie uma senha</Text>
                {/*<Image source={iconSenha} style={styles.icon} />*/}
                <Text style={styles.textAuxilio}>Lembre-se de criar uma senha forte:</Text>
                <TextInput
                  style={styles.textbox}
                  secureTextEntry={true}
                  placeholder="Senha"
                  value={senha}
                  onChangeText={(text)=>setSenha(text)}
                />
                <View style={styles.navigation}>
                  <TouchableOpacity style={styles.botao} onPress={() => irPara(2)}>
                    <Text style={styles.txtbotao}>Anterior</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botao} onPress={() => irPara(4)}>
                    <Text style={styles.txtbotao}>Próximo</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {modalAtual === 4 && (
              <>
                <Text style={styles.title}>Confirme os Dados</Text>
                {/*<Image source={iconConfirmar} style={styles.icon} />*/}
                <View style={styles.cardStyle}>
                  <Text style={styles.dados}>Nome: {user}</Text>
                  <Text style={styles.dados}>E-mail: {email}</Text>
                  {/* Por segurança, não exibimos a senha */}
                </View>
                <View style={styles.navigation}>
                  <TouchableOpacity style={styles.botao} onPress={() => irPara(3)}>
                    <Text style={styles.txtbotao}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botao} onPress={registerUser, endCadastro}>
                    <Text style={styles.txtbotao}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  botao: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 6, 
    maxWidth: 320,
    alignItems: 'center',
  },
  txtbotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 20,
  },
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  textAuxilio: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  textbox: {
    borderWidth: 1,
    borderColor: '#6200EE',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  dados: {
    fontSize: 16,
    marginVertical: 2,
  },
  cardStyle: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
  },
});

export default Cadastro;