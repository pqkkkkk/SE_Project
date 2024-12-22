import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {eventEmitter} from "./EventEmitterService";
import {GetUser} from "./UserStorageService";
const socketUrl = 'http://localhost:8080/ws';
const stompClient = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    debug: (msg) => console.log(msg),
});
stompClient.onConnect = () => {
    console.log('Connected to WebSocket');
    if(GetUser() !== null) {
        stompClient.subscribe(`/topic/messages/${GetUser().id}`, (message) => {
            console.log('Received:', message.body);
            eventEmitter.emit('newMessage', JSON.parse(message.body));
        });
    }
};
stompClient.onStompError = (frame) => {
    console.error('Broker reported error:', frame.headers['message']);
    console.error('Additional details:', frame.body);
};

stompClient.activate();

export const sendMessage = (message, receiverId) => {
    console.log(message);
    stompClient.publish({ destination: `/api/chat/sendMessage/${receiverId}`, body: JSON.stringify(message) });

}
export const SubcribeCorrespondingTopic =  (userId) => {
    stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
        console.log('Received:', message.body);
        eventEmitter.emit('newMessage', JSON.parse(message.body));
    });
}

