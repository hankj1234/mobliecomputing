import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [mailList, setMailList] = useState([]);
  const [sender, setSender] = useState('');
  const [validity, setValidity] = useState('');

  const addMail = () => {
    if (sender.trim() === '' || validity.trim() === '') {
      return;
    }

    const newMail = {
      id: Math.random().toString(),
      sender: sender,
      validity: validity
    };

    setMailList(prevMailList => [...prevMailList, newMail]);
    setSender('');
    setValidity('');
  };

  const deleteMail = (mailId) => {
    setMailList(prevMailList => prevMailList.filter(mail => mail.id !== mailId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>우편물 관리</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="발신자"
          onChangeText={text => setSender(text)}
          value={sender}
        />
        <TextInput
          style={styles.input}
          placeholder="유효 기간"
          onChangeText={text => setValidity(text)}
          value={validity}
        />
        <TouchableOpacity onPress={addMail} style={styles.addButton}>
          <Text style={styles.buttonText}>추가</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mailList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.mailItem}>
            <Text style={styles.mailText}>{item.sender}</Text>
            <Text style={styles.mailText}>{item.validity}</Text>
            <TouchableOpacity onPress={() => deleteMail(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFC2A4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#FF7373',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#FCE0B5',
    borderRadius: 5,
    marginBottom: 10,
  },

  mailText: {
    flex: 1,
    fontSize: 16,
    color: '#FF7043',
    fontWeight: 'bold',
  },

});