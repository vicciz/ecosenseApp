import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import config from '../../config/config.json';
import Button from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos para os estados
interface LoginState {
  email: string | null;
  senha: string | null;
  message: string | null;
}

const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [senha, setSenha] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function doLogin() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação do email
    if (email && !emailPattern.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    // Enviar requisição para o servidor
    let reqs = await fetch(config.urlRootPhp + 'controller.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    let ress = await reqs.json();
    Keyboard.dismiss();

    if (ress) {
      // Armazenar dados do usuário
      const json = { email, senha };  // A variável `json` precisa ser definida
      await AsyncStorage.setItem('usuarioData', JSON.stringify(json));
      router.replace('/home');
    } else {
      setMessage('Usuário ou senha inválidos');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      await AsyncStorage.clear();
    }
  }

  // Função para lidar com o esqueci minha senha
  const handleForgotsenha = () => {
    Alert.alert('Esqueci minha senha', 'Redirecionando para recuperação de senha...');
  };

  return (
    <View style={styles.container}>
      {message && <Text style={{ color: 'yellow', fontSize: 18 }}>{JSON.stringify(message)}</Text>}
      <View>
        <Text style={styles.title}>Insira os Dados Cadastrados</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          value={email || ''}
          accessible={true}
          accessibilityLabel="Email"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => setSenha(text)}
          value={senha || ''}
          accessible={true}
          accessibilityLabel="Senha"
        />
      </View>
      <View>
        <Button
          titulo="Entrar"
          cor="#0056b3"
          icone={null}
          onPress={doLogin}
        />

        <TouchableOpacity onPress={handleForgotsenha} accessible={true} accessibilityLabel="Esqueci minha senha">
          <Text style={styles.forgotsenha}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotsenha} accessible={true} accessibilityLabel="Não possuo conta">
          <Text style={styles.forgotsenha}>Não possuo conta</Text>
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
    color: 'yellow',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default Login;
