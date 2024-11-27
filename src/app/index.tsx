import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {StyleSheet, View} from 'react-native'

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Marca o componente como montado
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace('/recepcao'); // Somente navega após o componente ser montado
    }
  }, [isMounted]);


  return(
    < View style={styles.container}></View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#2196F3',
  }
});

export default Index;