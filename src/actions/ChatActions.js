const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
POST_MESSAGE = 'POST_MESSAGE';

CONNECT = 'CONNECT';
DISCONNECT = 'DISCONNECT';

export function connect() {
  return {
    type: CONNECT
  }
}

export function disconnect() {
  return {
    type: DISCONNECT
  }
}

export function receiveMessage(message){
  return {
    type: RECEIVE_MESSAGE,
    message: message
  }
}

export function postMessage(text){
  return {
    type: POST_MESSAGE,
    text
  }
}
