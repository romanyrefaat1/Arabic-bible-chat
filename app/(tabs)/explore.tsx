import { StyleSheet, TextInput, KeyboardAvoidingView, Platform, View, Button } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to Arabic Bible Chat!', isUser: false },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message, isUser: true }]);
      setMessage('');
      // Add default response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now(), text: 'Thank you for your message. I will respond shortly.', isUser: false }
        ]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title">Arabic Bible Chat</ThemedText>
      </ThemedView>

      <ThemedView style={styles.messagesContainer}>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[styles.messageBubble, msg.isUser ? styles.userMessage : styles.botMessage]}
          >
            <ThemedText style={styles.messageText}>{msg.text}</ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
        />
        <View 
          onTouchStart={handleSend} 
          style={{
            backgroundColor: 'blue',
            padding: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <IconSymbol
            size={24}
            name="arrow.up.circle.fill"
            color="#fff"
            onPress={handleSend}
            style={styles.sendButton}
          />
          <ThemedText style={{color: '#fff'}}>Send</ThemedText>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#E9E9EB',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
});
