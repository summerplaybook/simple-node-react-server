import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const ws = new WebSocket('ws://localhost:3030');

  const fire = () => {
    console.log('fired')
    ws.send(JSON.stringify({type: 'move', value: 'I am moving'}));
    ws.send(JSON.stringify({type: 'delete', value: 'I am deleting'}));
  }

  const sayHey = (message) => {
    console.log('hey there')
  } 

  ws.onmessage = (event) => {
    const messages = JSON.parse(event.data);
    console.log('from server', messages)
  };
  
  useEffect(() => {

    ws.onopen = () => { 
      console.log('Now connected'); 
      fire()
    };
    
  }, [0])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
