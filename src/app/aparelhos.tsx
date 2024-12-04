import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Picker, Button, Image } from 'react-native';
import Navbar from '../components/navbar';

const iconAparelho = require('./../assets/geladeira.png');
const iconStars = require('./../assets/star.png');

// Definição dos tipos para os aparelhos
interface Aparelho {
  id: string;
  nome: string;
  voltagem: string;
  tipo: string;
  stars: string;
}

const Aparelhos = () => {
  const [aparelhos, setAparelhos] = useState<Aparelho[]>([
    { id: '1', nome: 'Ar Condicionado', voltagem: '220V', tipo: 'Eletrônico', stars: '5' },
    { id: '2', nome: 'Geladeira', voltagem: '110V', tipo: 'Eletrodoméstico', stars: '3' },
    { id: '3', nome: 'Micro-ondas', voltagem: '110V', tipo: 'Eletrodoméstico', stars: '4' },
  ]);

  // Variáveis do aparelho
  const [search, setSearch] = useState<string>('');
  const [nomeAparelho, setNomeAparelho] = useState<string>('');
  const [tipoAparelho, setTipoAparelho] = useState<string>('Eletrodoméstico');
  const [voltagemAparelho, setVoltagemAparelho] = useState<string>('110V');
  const [stars, setStars] = useState<string>('5');
  const [aparelhoAtual, setAparelhoAtual] = useState<string | null>(null);

  // Controle de modais
  const [modalCadastro, setModalCadastro] = useState<boolean>(false);
  const [modalAvaliacao, setModalAvaliacao] = useState<boolean>(false);

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
    setModalCadastro(true);
  };

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
        { id: Date.now().toString(), nome: nomeAparelho, tipo: tipoAparelho, voltagem: voltagemAparelho, stars: '0' },
      ]);
    }
    setModalCadastro(false);
  };

  const excluirAparelho = (id: string) => {
    setAparelhos((prev) => prev.filter((ap) => ap.id !== id));
  };

  const abrirModalAvaliacao = (aparelho: Aparelho) => {
    setAparelhoAtual(aparelho.id);
    setStars(aparelho.stars || '0');
    setModalAvaliacao(true);
  };

  const saveAvalicao = () => {
    setAparelhos((prev) =>
      prev.map((ap) => (ap.id === aparelhoAtual ? { ...ap, stars: stars } : ap))
    );
    setModalAvaliacao(false);
  };

  const renderStars = (stars: string) => {
    const starsArray = Array.from({ length: parseInt(stars) }, (_, qtd) => (
      <Image key={qtd} source={iconStars} style={{ width: 18, height: 18 }} />
    ));
    return <View style={{ flexDirection: 'row' }}>{starsArray}</View>;
  };

  const renderItem = ({ item }: { item: Aparelho }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>Voltagem: {item.voltagem}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <TouchableOpacity onPress={() => abrirModalAvaliacao(item)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Estrelas: </Text>
          {renderStars(item.stars)}
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => abrirModalCadastro(item)} />
        <Button title="Excluir" onPress={() => excluirAparelho(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar"
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.botao} onPress={() => abrirModalCadastro()}>
        <Text style={styles.btnText}>Adicionar Novo Aparelho</Text>
      </TouchableOpacity>
      <FlatList data={aparelhos} renderItem={renderItem} keyExtractor={(item) => item.id} />

      {/* Modal Cadastro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCadastro}
        onRequestClose={() => setModalCadastro(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Cadastro de Aparelho</Text>
          <Image source={iconAparelho} style={styles.icon} />
          <TextInput
            style={styles.textbox}
            placeholder="Nome do Aparelho"
            value={nomeAparelho}
            onChangeText={setNomeAparelho}
          />
          <Text>Tipo do Aparelho:</Text>
          <Picker
            style={styles.picker}
            selectedValue={tipoAparelho}
            onValueChange={setTipoAparelho}
          >
            <Picker.Item label="Eletrodoméstico" value="Eletrodoméstico" />
            <Picker.Item label="Eletrônico" value="Eletrônico" />
          </Picker>
          <Text>Voltagem:</Text>
          <Picker
            style={styles.picker}
            selectedValue={voltagemAparelho}
            onValueChange={setVoltagemAparelho}
          >
            <Picker.Item label="110V" value="110V" />
            <Picker.Item label="220V" value="220V" />
            <Picker.Item label="BiVolt" value="BiVolt" />
          </Picker>
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={() => setModalCadastro(false)} />
            <Button title="Salvar" onPress={salvarAparelho} />
          </View>
        </View>
      </Modal>

      {/* Modal Avaliação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAvaliacao}
        onRequestClose={() => setModalAvaliacao(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Avaliação de Aparelho</Text>
          <TextInput
            style={styles.textbox}
            placeholder="Avaliar de 1 a 5"
            value={stars}
            onChangeText={setStars}
            keyboardType="numeric"
            maxLength={1}
          />
          <Button title="Salvar Avaliação" onPress={saveAvalicao} />
        </View>
      </Modal>

      <Navbar activeRoute="/aparelhos" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginHorizontal: 4, backgroundColor: '#2196F3' },
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
    margin: 6,
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: { color: 'white', fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  textbox: {
    borderWidth: 1,
    borderColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
  },
  icon: { width: 80, height: 80, marginVertical: 10 },
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
  picker: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 5,
  },
});

export default Aparelhos;
