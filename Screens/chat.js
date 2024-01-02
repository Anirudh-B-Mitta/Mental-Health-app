import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StatusBar, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Chat = ({route}) => {
  const navigation=useNavigation();
  const [messages, setMessages] = useState([
    { text: 'Hello!', type: 'incoming' },
    { text: 'Hi there!', type: 'outgoing' },
    { text: 'How can I help you?', type: 'incoming' },
  ]);
  const [inputText, setInputText] = useState('');

  const apiKey = 'YOUR_API_KEY'
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'

  const sendMessage = async () => {
    const prompt = inputText
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      }
    })
    const text = response.data.choices[0].text
    setMessages([...messages, {type: 'outgoing', 'text': inputText}, {type: 'incoming', 'text': text}])
    setInputText('')
  };

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: item.type === 'incoming' ? '#e0e0e0' : 'purple',
              padding: 10,
              margin: 5,
              borderRadius: 5,
              maxWidth: '70%',
              alignSelf: item.type === 'incoming' ? 'flex-start' : 'flex-end',
            }}
          >
            <Text style={{ color: item.type === 'incoming' ? 'black' : 'white' }}>
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.text}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
            marginRight: 10,
          }}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Enter your question"
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            padding: 10,
            borderRadius: 25,
          }}
          onPress={sendMessage}
        >
          <MaterialIcons name="send" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
