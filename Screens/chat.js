import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Chat = ({route}) => {
  const navigation=useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = 'http://192.168.0.114:3000/chat';

        // Make an API call when the component mounts using Axios
        const response = await axios.get(backendUrl, {});
        console.log(response)
        // Axios automatically checks if the response status is within the range 2xx
        const processedData = response.data.flatMap(item => [
          { text: item.input, type: 'outgoing', key : item._id },
          { text: item.response, type: 'incoming', key: item._id+"1" },
        ]);
        console.log(processedData)
        setMessages(messages => [...messages, ...processedData])
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  apiUrl = 'http://192.168.0.114:5000/input'

  const sendMessage = async () => {
    console.log("send message called")
    const prompt = inputText
    const response = await axios.get(apiUrl, {
      "input": prompt
    }).then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Axios error:', error);
    });
    console.log(response)
    const text = response.data.response
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
        keyExtractor={(item) => item.key}
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
