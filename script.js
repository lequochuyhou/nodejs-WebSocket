const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('Nhập vào tên của bạn :?');
appendMessage('Bạn đã tham gia');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`${message}`, 'me');
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

// function appendMyMessage(message){
//     const messageElement=document.createElement('div');
//     //messageElement.style.cssFloat="right";
//     messageElement.style.textAlign="right";
//     messageElement.innerText=message;
//     messageContainer.append(messageElement);
// }

function appendMessage(message, attribute) {
    const messageElement = document.createElement('div');
    const avatar = document.createElement('img');
    avatar.setAttribute("src", "img/ava.png");
    avatar.setAttribute("height", "24px");
    avatar.setAttribute("width", "24px");
    if (attribute == 'me') {
        messageElement.style.textAlign = "right";
        messageElement.style.backgroundColor = "#0000ff";
        messageElement.style.color = "white"
    } else {
        messageElement.style.color = "black"
        messageElement.style.backgroundColor = "#dfe4ed";
    }
    messageElement.style.borderRadius = '25px';
    // messageElement.innerText = avatar;

   // messageElement.innerHTML=avatar;
    messageElement.innerText = message;

    // messageContainer.append();
    //messageContainer.appendChild(avatar);
    messageContainer.append( messageElement);
}