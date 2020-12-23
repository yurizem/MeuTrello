import React, {useState} from 'react';
import {Text, View, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefa</Text>
      </View>

      <TouchableOpacity style={styles.fab}>
        <Ionicons 
        name="ios-add"
        size={35}
        color="#FFF"
        />
      </TouchableOpacity>

    </SafeAreaView>
  )
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
      height: 3
    }
  }
})