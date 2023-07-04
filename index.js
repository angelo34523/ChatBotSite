const axios = require("axios");
const random = require("lodash/random");

class Completion {
  static async create(prompt, history = null) {
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

    const endpoint = "https://chat-aim.vercel.app/api/openai/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
    };
    const maxTokens = random(400, 1000);
    const temperature = random(1, 5) / 10;
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

  static splitResponse(response, maxLength = 1900) {
    const lines = response.split("\n");
    let chunks = [];
    let currentChunk = "";

    for (const line of lines) {
      if (currentChunk.length + line.length + 1 > maxLength) {
        chunks.push(currentChunk.trim());
        currentChunk = line;
      } else {
        if (currentChunk) {
          currentChunk += "\n";
        }
        currentChunk += line;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }
}

module.exports = Completion;