import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Navbar from '../components/navbar';
import config from '../../config/config.json';

// Função para registrar o aparelho no backend
async function registrarAparelho(
  nomeAparelho: string,
  tipoAparelho: string,
  voltagemAparelho: string,
  potenciaAparelho: string
) {
  let reqs = await fetch(config.urlRootPhp + 'Controller2.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nomeAparelho,
      tipo: tipoAparelho,
      voltagem: voltagemAparelho,
      potencia: potenciaAparelho,
      idUser: 1, // idUser fixo ou pode vir de outro contexto
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  });

  let ress = await reqs.json();

  if (ress) {
    alert('Aparelho registrado com sucesso!');
  }
}

const TelaDispositivos = () => {
  // Definindo o tipo para os aparelhos
  interface Aparelho {
    id: string;
    nome: string;
    tipo: string;
    voltagem: string;
  }

  const [aparelhos, setAparelhos] = useState<Aparelho[]>([
    { id: '1', nome: 'Ar Condicionado', voltagem: '220V', tipo: 'Eletrônico' },
    { id: '2', nome: 'Geladeira', voltagem: '110V', tipo: 'Eletrodoméstico' },
    { id: '3', nome: 'Micro-ondas', voltagem: '110V', tipo: 'Eletrodoméstico' },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [nomeAparelho, setNomeAparelho] = useState<string>('');
  const [tipoAparelho, setTipoAparelho] = useState<string>('Eletrodoméstico');
  const [voltagemAparelho, setVoltagemAparelho] = useState<string>('110V');
  const [potenciaAparelho, setPotenciaAparelho] = useState<string>('');
  const [aparelhoAtual, setAparelhoAtual] = useState<string | null>(null);

  // Função para abrir o modal de cadastro
  const abrirModalCadastro = (aparelho: Aparelho | null = null) => {
    if (aparelho) {
      setNomeAparelho(aparelho.nome);
      setTipoAparelho(aparelho.tipo);
      setVoltagemAparelho(aparelho.voltagem);
      setAparelhoAtual(aparelho.id);
    } else {
      setNomeAparelho('');
      setTipoAparelho('Eletrodoméstico');
      setVoltagemAparelho('110V');
      setAparelhoAtual(null);
    }
    setModalVisible(true);
  };

  // Função para salvar o aparelho
  const salvarAparelho = () => {
    if (aparelhoAtual) {
      setAparelhos((prev) =>
        prev.map((ap) =>
          ap.id === aparelhoAtual
            ? { ...ap, nome: nomeAparelho, tipo: tipoAparelho, voltagem: voltagemAparelho }
            : ap
        )
      );
    } else {
      setAparelhos((prev) => [
        ...prev,
        { id: Date.now().toString(), nome: nomeAparelho, tipo: tipoAparelho, voltagem: voltagemAparelho },
      ]);
    }
    setModalVisible(false);
    registrarAparelho(nomeAparelho, tipoAparelho, voltagemAparelho, potenciaAparelho);
  };

  // Função para excluir aparelho
  const excluirAparelho = (id: string) => {
    setAparelhos((prev) => prev.filter((ap) => ap.id !== id));
  };

  // Renderizando os itens da lista de aparelhos
  const renderItem = ({ item }: { item: Aparelho }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>Voltagem: {item.voltagem}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => abrirModalCadastro(item)} />
        <Button title="Excluir" onPress={() => excluirAparelho(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Aparelhos Cadastrados</Text>
      <FlatList data={aparelhos} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <TouchableOpacity style={styles.botao} onPress={() => abrirModalCadastro()}>
        <Text style={styles.btnText}>Adicionar Novo Aparelho</Text>
        <Navbar activeRoute={"/aparelhos"} />
      </TouchableOpacity>

      {/* Modal de Cadastro de Aparelho */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Cadastro de Aparelho</Text>
          <TextInput
            style={styles.textbox}
            placeholder="Nome do Aparelho"
            value={nomeAparelho}
            onChangeText={setNomeAparelho}
          />
          <Text>Tipo do Aparelho:</Text>
          <Picker selectedValue={tipoAparelho} onValueChange={setTipoAparelho}>
            <Picker.Item label="Eletrodoméstico" value="Eletrodoméstico" />
            <Picker.Item label="Eletrônico" value="Eletrônico" />
          </Picker>
          <Text>Voltagem:</Text>
          <Picker selectedValue={voltagemAparelho} onValueChange={setVoltagemAparelho}>
            <Picker.Item label="110V" value="110V" />
            <Picker.Item label="220V" value="220V" />
            <Picker.Item label="BiVolt" value="BiVolt" />
          </Picker>
          <Text>Potência:</Text>
          <TextInput
            style={styles.textbox}
            placeholder="Potência do Aparelho"
            value={potenciaAparelho}
            onChangeText={setPotenciaAparelho}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            <Button title="Salvar" onPress={salvarAparelho} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, textAlign: 'center', marginVertical: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    borderWidth: 1,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botao: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: { color: 'white', fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  textbox: { borderWidth: 1, borderColor: '#6200EE', padding: 10, borderRadius: 5, marginVertical: 10 },
});

export default TelaDispositivos;
