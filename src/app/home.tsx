import React, { useState } from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  
} from 'react-native';
import Navbar from './../components/navbar';
import Header from './../components/header';
import Linha from './../components/linha';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Imposto {
  id: number;
  label: string;
  value: number;
  checked: boolean;
}

const TelaHome: React.FC = () => {
  const router = useRouter();

  const [vlImposto, setVlImposto] = useState<string>('');
  const [kwh, setKwh] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [modalImpostos, setModalImpostos] = useState<boolean>(false);
  const [tempo, setTempo] = '00:00:00';

  const [impostos, setImpostos] = useState<Imposto[]>([
    { id: 1, label: 'Imposto 1', value: 400, checked: false },
    { id: 2, label: 'Imposto 2', value: 300, checked: false },
    { id: 3, label: 'Imposto 3', value: 200, checked: false },
    { id: 4, label: 'Imposto 4', value: 100, checked: false },
    { id: 5, label: 'Imposto 5', value: 50, checked: false },
    { id: 6, label: 'Imposto 6', value: 25, checked: false },
  ]);

  
  const calcularRS = (): string => {
    const tarifa = parseFloat(vlImposto.replace(',', '.')) || 0;
    const consumo = parseFloat(kwh) || 0;

    const totalImpostos = impostos
      .filter((item) => item.checked)
      .reduce((acc, item) => acc + item.value, 0);

    return (consumo * tarifa + totalImpostos).toFixed(2);
  };

  const toggleCheckbox = (id: number): void => {
    setImpostos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const openModalImp = (): void => setModalImpostos(true);
  const closeModalImp = (): void => setModalImpostos(false);

  const handleTarifaChange = (value: string): void => {
    let sanitizedValue = value.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 2) {
      sanitizedValue = sanitizedValue.slice(0, -2) + ',' + sanitizedValue.slice(-2);
    } else if (sanitizedValue.length === 2) {
      sanitizedValue = '0,' + sanitizedValue;
    } else if (sanitizedValue.length === 1) {
      sanitizedValue = '0,0' + sanitizedValue;
    }

    setVlImposto(sanitizedValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity onPress={() => router.push('/consumo')}>
        <Text style={styles.textop}>Estatísticas</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.info1}>O consumo atual é de {kwh} kWh,</Text>
          <Text style={styles.info2}>R$ {calcularRS()}</Text>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, color:'white', }}>Tempo decorrido: {tempo}</Text>
          </View>
        </View>
        <Linha style={undefined} />
        <View style={styles.controle}>
          <TextInput
            style={styles.input}
            placeholder="Digite o valor da tarifa do kilowatts hora"
            keyboardType="numeric"
            value={vlImposto}
            onChangeText={handleTarifaChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite o consumo em kWh"
            keyboardType="numeric"
            value={kwh}
            onChangeText={setKwh}
          />
          <View style={styles.opnav}>
            <TouchableOpacity style={styles.btn} onPress={openModalImp}>
              <Text style={styles.btnText}>Incluir impostos</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalImpostos}
            onRequestClose={closeModalImp}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Selecione os impostos aplicáveis:</Text>
              {impostos.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckbox(item.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      item.checked && styles.checkboxChecked,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>{item.label}</Text>
                </Pressable>
              ))}
              <TouchableOpacity style={styles.btn} onPress={closeModalImp}>
                <Text style={styles.btnText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <Navbar activeRoute="/home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 8,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#0056b3',
    height: 120,
    width: '80%',
    marginVertical: 10,
    alignSelf: 'center',
    padding:12,
    borderRadius:20,
  },
  opnav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  btn: {
    backgroundColor: '#0056b3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  info1:{
    color: 'white',
    fontSize:24,
  },
  info2:{
    color: 'white',
    fontSize:54,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#fff',
  },
  controle:{
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },
  btnEstatistica:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    borderRadius: 8,
    color:'black'
  },
  textop:{
    color:'black',
    margin:10,
    fontSize: 18,
  },
});

export default TelaHome;
