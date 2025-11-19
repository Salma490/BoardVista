import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'; // This imports from 'react-native'

// --- (Optional) Reusable Header ---
// You can replace this with your existing AppHeader component
const AppHeader = () => (
  <ImageBackground
    source={{ uri: 'https://picsum.photos/seed/header/600/400' }} // Placeholder
    style={styles.headerBackground}>
    <View style={styles.headerOverlay}>
      <Text style={styles.welcomeText}>WELCOME TO</Text>
      <Text style={styles.logo}>BOARDVISTA</Text>
      <Text style={styles.subtitle}>Discover the Best Stays in Vavuniya</Text>
    </View>
  </ImageBackground>
);

// --- (Optional) Reusable Footer ---
// You can replace this with your existing AppFooter component
const AppFooter = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2025 BoardVista</Text>
  </View>
);

// --- Main ChatBot Screen Component ---
export default function ChatBotScreen({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I am BoardVistaBot. How can I help you find a new boarding in Vavuniya today?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const systemPrompt = `
    You are 'BoardVistaBot', a friendly and helpful assistant for the BoardVista app.
    Your main purpose is to help users (students, academic staff, and owners)
    find or list boarding accommodations in Vavuniya.
    
    - Be polite, concise, and professional.
    - If asked about topics outside of housing, politely steer the conversation back.
    - Keep answers to 1-2 sentences if possible.
  `;

  /**
   * Calls the Gemini API to get a response
   */
  const getBotResponse = async (userQuery) => {
    setIsLoading(true);
    const apiKey = ''; // As per instructions, leave this empty
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    try {
      // Add exponential backoff retry logic
      let response;
      let retries = 0;
      const maxRetries = 3;
      let delay = 1000; // 1 second

      while (retries < maxRetries) {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          break; // Success
        }

        if (response.status === 429 || response.status >= 500) {
          // Throttling or server error, retry
          retries++;
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          // Other client-side error, don't retry
          throw new Error(`API Error: ${response.statusText}`);
        }
      }

      if (!response.ok) {
        throw new Error(`API Error after ${maxRetries} retries: ${response.statusText}`);
      }

      const result = await response.json();
      const botText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (botText) {
        const botMessage = {
          id: Date.now().toString(),
          text: botText,
          sender: 'bot',
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error('No content in API response.');
      }
    } catch (error) {
      // Do not log retry errors to console, but log the final error
      if (!error.message.includes('retries')) {
        console.error('Failed to fetch bot response:', error);
      }
      const errorMessage = {
        id: Date.now().toString(),
        text: 'Sorry, I am having trouble connecting right now. Please try again later.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  /**
   * Handles sending a new message
   */
  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput.length === 0) return;

    // 1. Create the user's message object
    const userMessage = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: 'user',
    };

    // 2. Add user's message to the list
    setMessages((prev) => [...prev, userMessage]);

    // 3. Clear the input
    setInput('');

    // 4. Get the bot's response
    getBotResponse(trimmedInput);
  };

  /**
   * Renders a single chat bubble
   */
  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.botMessageContainer,
        ]}>
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userMessageBubble : styles.botMessageBubble,
          ]}>
          <Text style={isUser ? styles.userMessageText : styles.botMessageText}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />

      {/* This is a simple header for the chat page itself */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.chatTitle}>BoardVistaBot</Text>
        <View style={{ width: 30 }} />{/* Spacer */}
      </View>

      {/* --- Chat Messages --- */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* --- "Bot is typing..." Indicator --- */}
      {isLoading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#555" />
          <Text style={styles.typingText}>BoardVistaBot is typing...</Text>
        </View>
      )}

      {/* --- Message Input --- */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          editable={!isLoading} // Disable input while bot is typing
        />
        <TouchableOpacity
          style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={isLoading}>
          <Text style={styles.sendButtonText}>[Send]</Text>
        </TouchableOpacity>
      </View>

      <AppFooter />
    </SafeAreaView>
  );
}

// === STYLESHEET ===
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header
  headerBackground: {
    width: '100%',
    height: 180, // Shorter header
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(58, 90, 120, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  // Chat Header
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  // Chat List
  chatList: {
    flex: 1,
    backgroundColor: '#f4f4f8', // Light gray background
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#007BFF', // Blue for user
  },
  botMessageBubble: {
    backgroundColor: '#e0e0e0', // Gray for bot
  },
  userMessageText: {
    fontSize: 16,
    color: '#fff', // User text
  },
  botMessageText: {
    fontSize: 16,
    color: '#000', // Bot text
  },
  // Typing Indicator
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f4f4f8',
  },
  typingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  // Input Area
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#aaa',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Footer
  footer: {
    backgroundColor: '#90b4ce',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});
