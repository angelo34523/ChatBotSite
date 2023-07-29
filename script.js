src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"

  async function createCompletion(prompt, history = null) {
    let data;

    if (history === null) {
      data = {
        model: "gpt-3.5-turbo-16k-0613",
        temperature: 0.75,
        messages: [
          { role: "system", content: prompt },
        ],
      };
    } else {
      data = {
        model: "gpt-3.5-turbo-16k-0613",
        temperature: 0.75,
        messages: [
          { role: "system", content: prompt },
          ...history,
        ],
      };
    }

    const endpoint = "https://gpt4.xunika.uk/api/openai/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer ak-chatgptorguk",
    };
    const maxTokens = _.random(400, 1000);
    const temperature = _.random(1, 5) / 10;
    const completionData = {
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: temperature
    };

    try {
      const response = await axios.post(endpoint, data, { headers: headers });
      const response_data = response.data;
      const choices = response_data.choices;
      if (choices.length > 0) {
        return choices[0].message.content;
      }
    } catch (error) {
      console.log("Error making the request:", error);
    }
  }

let isSendingMessage = false;

async function sendMessage(userMessage) {
  if (isSendingMessage) {
    return;
  }

  isSendingMessage = true;
  const userInput = document.getElementById('user-input');
  userInput.setAttribute('disabled', 'disabled');
  appendMessage('user', userMessage);
  appendMessage('ai', '<span class="loading">Gerando Resposta...</span>');

  const response = await createCompletion(userMessage);
  const loadingMessage = document.querySelector('#chat-log .loading');
  loadingMessage.parentNode.removeChild(loadingMessage);

  if (response.trim() !== '') {
    appendMessage('ai', response.replace(/\n/g, '<br><br>'));
  }

  document.getElementById('chat-log').scrollTop = document.getElementById('chat-log').scrollHeight;

  const waitTime = 5;
  const waitMessage = `Aguarde ${waitTime} segundos antes de enviar outra mensagem.`;
  appendMessage('ai', `<span class="loading">${waitMessage}</span>`);

  let remainingSeconds = waitTime;
  const interval = setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds === 0) {
      clearInterval(interval);
      isSendingMessage = false;
      userInput.removeAttribute('disabled');
      const loadingMessage = document.querySelector('#chat-log .loading');
      loadingMessage.parentNode.removeChild(loadingMessage);
    } else {
      document.querySelector('.loading').innerText = `${waitMessage.replace(
        waitTime,
        remainingSeconds
      )}`;
    }
  }, 1000);
}


  function appendMessage(role, content) {
    const message = document.createElement('div');
    message.className = role;

    if (content.trim() !== '') {
      message.innerHTML = content.replace(/\n/g, '<br><br>');
    } else {
      return;
    }

    document.getElementById('chat-log').appendChild(message);
  }

function toggleSendButton() {
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  if (userInput.value.trim() !== '' && !isSendingMessage) {
    sendButton.removeAttribute('disabled');
  } else {
    sendButton.setAttribute('disabled', 'disabled');
  }
}

  document.getElementById('user-input').addEventListener('input', toggleSendButton);

  document.getElementById('chat-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value;
    userInput.value = '';

    sendMessage(userMessage);

    document.getElementById('send-button').setAttribute('disabled', 'disabled');
  });