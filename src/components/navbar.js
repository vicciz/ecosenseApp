import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

const Navbar = ({ activeRoute }) => {
  const router = useRouter();

  const navItems = [
    { screen: '/home', label: 'Início', icon: require('./../assets/icon-home.png')},
    { screen: '/aparelhos', label: 'Aparelhos', icon: require('./../assets/icon-aparelho.png') },
    { screen: '/consumo', label: 'Consumo', icon: require('./../assets/icon-consumo.png') },
    { screen: '/perfil', label: 'Perfil', icon: require('./../assets/icon-perfil.png') },
  ];

  const navigateTo = (screen) => {
    router.push(screen); // Uso correto para o Expo Router
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {navItems.map(({ screen, label, icon }) => {
          const isActive = activeRoute === screen;
          return (
            <TouchableOpacity 
              key={screen} 
              style={styles.navItem} 
              onPress={() => navigateTo(screen)} 
              accessibilityLabel={`Navegar para ${label}`}
            >
              {icon && (
                <Image 
                  style={[styles.icon, isActive && styles.activeIcon]} 
                  source={icon} 
                />
              )}
              <Text style={[styles.textIcon, isActive && styles.activeText]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#0088FF',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  navItem: {
    alignItems: 'center',
    flex: 1, // Distribui os itens igualmente
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  activeIcon: {
    tintColor: '#FFD700', // Cor diferente para o ícone ativo
  },
  textIcon: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  activeText: {
    color: '#FFD700', // Cor diferente para o texto ativo
    fontWeight: 'bold',
  },
});

export default Navbar;
