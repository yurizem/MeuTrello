import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, FlatList, Modal, TextInput, AsyncStorage } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList/index.js'
import * as Animatable from 'react-native-animatable'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const AnimateBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  const [task, setTask] = useState([])
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  
// Buscando todas as tarefas ao iniciar o app
  useEffect(() => {

    async function loadTasks(){

      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    } 

    loadTasks();
 
  }, []);
 
  //Salvando caso tenha alguma tarefa alterada 
  useEffect(() => {

      async function saveTasks(){
        await AsyncStorage.setItem('@task', JSON.stringify)
      }
      saveTasks();
    }, [task]);



  function handleAdd(){
    if(input==='') return;
    
    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  const handleDelete = useCallback((data)=> {
    const find = task.filter(r => r.key !== data.key)
    setTask(find);
    alert('Dados removidos com sucesso ')
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefa</Text>
      </View>

      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key)}
      renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete} /> } 
      />

      <Modal
      animationType='slide'
      transparent={false}
      visible={open}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>

            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{marginLeft:5, marginRight:5}} name='md-arrow-back' size={40} color="white"/>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Nova Tarefa</Text>

          </View>

          <Animatable.View style={styles.modalBody}animation="fadeInUp" useNativeDriver>
            <TextInput  
            multiline={true}
            placeholderTextColor="#747474"
            autoCorrect={false}
            style={styles.modalInput}
            placeholder="O que pracisa fazer hoje"
            value={input}
            onChangeText={(texto) => setInput(texto) }
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={symbolicateStackTrace.handleInput} >Cadastrar</Text>
            </TouchableOpacity>

          </Animatable.View>

        </SafeAreaView>

      </Modal>

      <AnimateBtn 
      style={styles.fab}
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={() => setOpen(true)}
      >
        <Ionicons 
        name="ios-add"
        size={35}
        color="#FFF"
        />
      </AnimateBtn>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#171d31'
  },
  content:{
  },
  title:{
    color:'white',
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
  },
  fab:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  },
  modal:{
    flex:1,
    backgroundColor:'#171d31',
  },
  modalHeader:{
    marginLeft:10,
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
  },
  modalTitle:{
    fontSize:30,
    color:'white',
    marginLeft:20,
  },
  body:{

  },
  modalBody:{
    marginTop:15,
  },
  modalInput:{
    fontSize:15,
    marginLeft:10,
    marginRight:10,
    marginTop:30,
    backgroundColor: "#FFF",
    padding: 9,
    height:85,
    textAlignVertical: 'top',
    color:'#000',
    borderRadius:5
  },
  handleAdd:{
    alignItems:"center",
    backgroundColor:"white",
    marginTop:10,
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    height:40,
    borderRadius: 5
  }
  });