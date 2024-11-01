import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {
    //Armazenamento de dados
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
        //Controle de Formulario
            //Navegação
    const router = useRouter(); // Função que permite a navegação de telas
    const irHome = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validação do email
        if (!emailPattern.test(email)) {
        Alert.alert("Erro", "Por favor, insira um email válido.");
        return;
        }
        // Aqui você pode adicionar a lógica de autenticação

        // Se a validação estiver correta, navegar para a tela 'Home'
        router.replace('/home');
    };

  const handleForgotPassword = () => {
    Alert.alert("Esqueci minha senha", "Redirecionando para recuperação de senha...");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Insira os Dados Cadastrados</Text>
      </View>
      <View>
        {/*<Image 
          style={styles.icon}
          source={require('@/assets/images/logoexample.png')}
        />*/}
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
          value={password}
          onChangeText={setPassword}
          accessible={true}
          accessibilityLabel="Senha"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={irHome} accessible={true} accessibilityLabel="Entrar">
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword} accessible={true} accessibilityLabel="Esqueci minha senha">
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    paddingHorizontal: 20,
    backgroundColor: 'blue',
  },
  form:{
    width: '80%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%', 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  icon: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Login;