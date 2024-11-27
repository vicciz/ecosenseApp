import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="recepcao"
        options={{
          headerShown: false,  // Cabeçalho oculto nesta tela
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,  // Cabeçalho oculto nesta tela
        }}
      />
      <Stack.Screen
        name="registro"
        options={{
          headerShown: false,  // Cabeçalho oculto nesta tela
          //headerTitle: 'Configurações',
          //headerStyle: { backgroundColor: '#2196F3' },
          //headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="entrar"
        options={{
          headerShown: false,  // Cabeçalho oculto nesta tela
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,  // Cabeçalho oculto nesta tela
        }}
      />
      <Stack.Screen
        name="aparelhos"
        options={{
          headerTitle: 'Aparelhos',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="consumo"
        options={{
          headerTitle: 'Consumo',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="perfil"
        options={{
          headerTitle: 'Perfil',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
        }}
      />
      
    </Stack>
  );
}
