import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StatusBar, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Chat = ({route}) => {
  const navigation=useNavigation();
  const [messages, setMessages] = useState([
    { text: 'Hello!', id: 1, type: 'incoming' },
    { text: 'Hi there!', id: 2, type: 'outgoing' },
    { text: 'How can I help you?', id: 3, type: 'incoming' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() !== '') {
      setMessages([
        ...messages,
        { text: inputText, id: messages.length + 1, type: 'outgoing' },
      ]);
      setInputText('');
    }
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
        keyExtractor={(item) => item.id.toString()}
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
          onPress={handleSend}
        >
          <MaterialIcons name="send" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;