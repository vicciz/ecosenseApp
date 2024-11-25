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
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [ocultar, setOcultar] = useState(false);

  async function doLogin() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validação do email
    if (!emailPattern.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }
  
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch(`${config.urlRootNode}login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), senha: senha.trim() }),
      });
  
      // Verificar se a requisição foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message || 'Falha ao fazer login.');
        return;
      }
  
      const data = await response.json();
      Keyboard.dismiss();
  
      if (data.success) {
        await AsyncStorage.setItem('usuarioData', JSON.stringify(data.user));
        Alert.alert('Sucesso', data.message);
        router.push('/home'); // Navegar para a página inicial
      } else {
        Alert.alert('Erro', data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro ao tentar login:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }
  
  // Função para lidar com o esqueci minha senha
  const handleForgotsenha = () => {
    Alert.alert('Esqueci minha senha', 'Redirecionando para recuperação de senha...');
    router.replace('/registro');
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
          secureTextEntry={!ocultar}
          autoCapitalize="none"
          onChangeText={(text) => setSenha(text)}
          value={senha || ''}
          accessible={true}
          accessibilityLabel="Senha"
        />
        <TouchableOpacity onPress={()=> setOcultar(!ocultar)}><Text style={{color:'#fff', fontWeight:'bold',}}>{ocultar ? "Ocultar senha" : "Exibir senha"}</Text></TouchableOpacity>
      </View>
      <View>
        <Button
          titulo="Entrar"
          cor="#0056b3"
          icone={null}
          onPress={doLogin}
        />

        <TouchableOpacity onPress={(handleForgotsenha)} accessible={true} accessibilityLabel="Esqueci minha senha">
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
