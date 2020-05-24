const express = require('express');
const path = require('path');
const WebSocket = require('ws'); // new
const app = express();
// express code 
const socketServer = new WebSocket.Server({port: 3030});

const messages = ['Start Chatting!'];


socketServer.on('connection', (socketClient) => {
  console.log('connected');
  console.log('client Set length: ', socketServer.clients.size);

  socketClient.on('message', (incoming_message) => {
    console.log('message received')
    messages.push(incoming_message);

    const message = JSON.parse(incoming_message);

    if (message.type === 'move') {
      socketServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(['from server - move received']))
        }
      })
    }
    if (message.type === 'delete') {
      socketServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(['from server - delete received']))
        }
      })
    }
    console.log('message');
    console.log('on message', socketClient.clients)

  })

  socketClient.on('close', (socketClient) => {
      console.log('closed');
      console.log('Number of clients: ', socketServer.clients.size);
  });
});