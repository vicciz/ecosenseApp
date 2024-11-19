import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Keyboard, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import config from '../../config/config.json';
import Button from '../components/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message,setMessage] = useState('');
  const router = useRouter();

  const autenticarUsuario = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação do email
    if (!emailPattern.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    // Enviar requisição para o servidor
    try {
      const response = await fetch(`${config.urlRootPhp}controller.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senhaUser: senha,
          emailUser: email,
        }),
      });
      Keyboard.dismiss();

      const resultado = await response.json();

      if (resultado) {
        // Navegação para a tela 'Home'
        router.replace('/home');
      } else {
        Alert.alert('Validação', 'Usuário ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível autenticar. Tente novamente.');
      console.error(error);
    }
  };

  const handleForgotsenha = () => {
    Alert.alert('Esqueci minha senha', 'Redirecionando para recuperação de senha...');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Insira os Dados Cadastrados</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          accessible={true}
          accessibilityLabel="Email"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          accessible={true}
          accessibilityLabel="Senha"
        />
      </View>
      <View>
        <Button
          titulo="Entrar"
          cor="#0056b3"
          icone={null}
          onPress={autenticarUsuario}
        />

        <TouchableOpacity onPress={handleForgotsenha} accessible={true} accessibilityLabel="Esqueci minha senha">
          <Text style={styles.forgotsenha}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
  },
  form: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
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
  forgotsenha: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default Login;
