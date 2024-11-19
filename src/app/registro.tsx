import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import config from '../../config/config.json';
import Button from '../components/button';

const CadastroFormulario = () => {
  // Armazenamento de dados
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Controle do Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const validarCadastro = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Validação', 'Por favor, preencha todos os campos.');
      return;
    }

    setModalVisible(true); // Exibe o modal para confirmação
  };

  const cancelarCadastro = () => {
    setModalVisible(false); // Fecha o modal
  };

  const confirmarCadastro = async () => {
    try {
      const response = await fetch(config.urlRootNode + 'create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeUser: firstName,
          sobrenomeUser: lastName,
          emailUser: email,
          senha: senha,
        }),
      });

      const statusCode = response.status;
      const contentType = response.headers.get('content-type');
      const text = await response.text();

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(text);
        setMessage(data.message || 'Cadastro realizado com sucesso!');
      } else {
        setMessage('Resposta inválida do servidor.');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setMessage('Erro ao conectar ao servidor.');
    }
    setModalVisible(false); // Fecha o modal
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

      {message && <Text style={{color:'yellow', fontSize:18}}>{message}</Text>}
      <Text>{firstName} {lastName} {email} {senha}</Text>

        <Text style={styles.title}>Preencha os campos para prosseguir </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="E-mail"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Senha"
          autoCapitalize="none"
          value={senha}
          onChangeText={setSenha}
        />

<Button
  titulo="Avançar"
  cor="#0056b3"
  icone={null}
  onPress={validarCadastro}
/>

<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={cancelarCadastro}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Cheque os seus dados</Text>
      <Text style={styles.dados}>Nome: {firstName} {lastName}</Text>
      <Text style={styles.dados}>E-mail: {email}</Text>
      <Text style={styles.dados}>Senha: {senha}</Text>

      <View style={styles.modalButtons}>
        <Button
          titulo="Cancelar"
          cor="#0056b3"
          icone={null}
          onPress={cancelarCadastro}
        />

        <Button
          titulo="Enviar"
          cor="#0056b3"
          icone={null}
          onPress={confirmarCadastro}
        />
      </View>
    </View>
  </View>
</Modal>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#fff',
    textAlign: 'center'
    
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  botao: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    maxWidth: 320,
    alignItems: 'center',
  },
  txtbotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dados: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CadastroFormulario;
