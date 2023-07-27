
function addMessage(message, sender) {
    const messageContainer = document.getElementById("message-container");
    const messageItem = document.createElement("li");
    messageItem.className = "message " + sender;
    messageItem.innerHTML = `
      <p class="message-text">${message.message}</p>
      <span class="message-info">${sender} ● ${message.time}</span>
    `;
    messageContainer.appendChild(messageItem);
  
  
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
  

  document.getElementById("message-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const messageInput = document.getElementById("message-input");
    const nameInput = document.getElementById("name-input");
    const message = messageInput.value.trim();
    const sender = nameInput.value.trim() || "Anonymous";
  
    if (message !== "") {
      const time = moment().format("D MMMM, HH:mm");
      const newMessage = { message, time };
      addMessage(newMessage, "right");
      messageInput.value = "";
  

      setTimeout(() => {
        const responseMessage = {
          message: "I am Fine!",
          time: moment().format("D MMMM, HH:mm"),
        };
        addMessage(responseMessage, "left");
      }, 1500);
    }
  });
  

  const sampleMessages = [
    { message: "Hello!", time: moment().format("D MMMM, HH:mm") },
    {
      message: "Welcome to the attractive chat app!",
      time: moment().format("D MMMM, HH:mm"),
    },
    
  ];
  
 
  sampleMessages.forEach((msg, index) => {
    setTimeout(() => {
      addMessage(msg, index % 2 === 0 ? "left" : "right");
    }, index * 1000);
  });


  const socket = io()

const clientsTotal = document.getElementById('client-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

const messageTone = new Audio('/message-tone.mp3')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`
})

function sendMessage() {
  if (messageInput.value === '') return
  
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  }
  socket.emit('message', data)
  addMessageToUI(true, data)
  messageInput.value = ''
}

socket.on('chat-message', (data) => {
  // console.log(data)
  messageTone.play()
  addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
  const element = `
      <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>
        `

  messageContainer.innerHTML += element
  scrollToBottom()
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  })
})

messageInput.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  })
})
messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  })
})

socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `
  messageContainer.innerHTML += element
})

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}

  