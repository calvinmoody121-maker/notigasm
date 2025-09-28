import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { X, Plus, Mic } from 'lucide-react-native';

interface MessageModalProps {
  visible: boolean;
  onClose: () => void;
  recipientName: string;
  onSendMessage: (message: string) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  visible,
  onClose,
  recipientName,
  onSendMessage,
}) => {
  const [message, setMessage] = useState('');
  const [selectedPill, setSelectedPill] = useState<string | null>(null);

  const preloadedMessages = [
    "Hey! What's up? 👋",
    "Want to hang out? 🎉",
    "Miss you! 💕"
  ];

  const handleSendMessage = () => {
    const messageToSend = selectedPill || message;
    if (messageToSend.trim()) {
      onSendMessage(messageToSend);
      setMessage('');
      setSelectedPill(null);
      onClose();
    }
  };

  const handlePillPress = (pillMessage: string) => {
    setSelectedPill(selectedPill === pillMessage ? null : pillMessage);
    setMessage(''); // Clear custom message when pill is selected
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Message</Text>
            <View style={styles.placeholder} />
          </View>

          {/* To Field */}
          <View style={styles.toContainer}>
            <Text style={styles.toLabel}>To:</Text>
            <View style={styles.recipientContainer}>
              <Text style={styles.recipientName}>{recipientName}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Message Area */}
          <ScrollView style={styles.messageArea} showsVerticalScrollIndicator={false}>
            {/* Preloaded Message Pills */}
            <View style={styles.pillsContainer}>
              <Text style={styles.pillsLabel}>Quick Messages:</Text>
              <View style={styles.pillsRow}>
                {preloadedMessages.map((pillMessage, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.pill,
                      selectedPill === pillMessage && styles.selectedPill
                    ]}
                    onPress={() => handlePillPress(pillMessage)}
                  >
                    <Text style={[
                      styles.pillText,
                      selectedPill === pillMessage && styles.selectedPillText
                    ]}>
                      {pillMessage}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Custom Message Preview */}
            {(selectedPill || message) && (
              <View style={styles.previewContainer}>
                <Text style={styles.previewLabel}>Message Preview:</Text>
                <View style={styles.messagePreview}>
                  <Text style={styles.previewText}>
                    {selectedPill || message}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Plus size={24} color="#6D6D70" />
            </TouchableOpacity>
            
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="iMessage"
                placeholderTextColor="#6D6D70"
                value={selectedPill ? '' : message}
                onChangeText={(text) => {
                  setMessage(text);
                  if (text) setSelectedPill(null); // Clear pill selection when typing
                }}
                multiline
                maxLength={1000}
                editable={!selectedPill}
              />
            </View>

            <TouchableOpacity style={styles.micButton}>
              <Mic size={24} color="#6D6D70" />
            </TouchableOpacity>
          </View>

          {/* Send Button */}
          {(selectedPill || message.trim()) && (
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  toContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  toLabel: {
    fontSize: 17,
    color: '#6D6D70',
    marginRight: 8,
  },
  recipientContainer: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  recipientName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  addButton: {
    padding: 8,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#C6C6C8',
  },
  messageArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pillsContainer: {
    padding: 16,
  },
  pillsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 12,
  },
  pillsRow: {
    flexDirection: 'column',
    gap: 8,
  },
  pill: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C6C6C8',
  },
  selectedPill: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  pillText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  selectedPillText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  previewContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  previewLabel: {
    fontSize: 14,
    color: '#6D6D70',
    marginBottom: 8,
  },
  messagePreview: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  previewText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
    borderTopWidth: 0.5,
    borderTopColor: '#C6C6C8',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
    maxHeight: 100,
  },
  micButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MessageModal;