import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

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


  return null;
};

export default Index;