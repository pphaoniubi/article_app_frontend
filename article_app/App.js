import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView  } from 'react-native';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch the articles from Spring Boot when the component loads
  useEffect(() => {
    axios.get('http://10.0.2.2:8080/api/articles/titles')
      .then(response => {
        setArticles(response.data);  // Set the articles from the response data
      })
      .catch(error => console.error('Error fetching article titles:', error));
  }, []);

  // Function to open the article modal
  const openArticle = (article) => {
    // Fetch the content of the article and increment the read count
    axios.get(`http://10.0.2.2:8080/api/articles/${article.id}`)
      .then(response => {
        setSelectedArticle(response.data);  // Set the full article content
        setIsModalVisible(true);
      })
      .catch(error => console.error('Error fetching article content:', error));

    // Increment the read count
    axios.put(`http://10.0.2.2:8080/api/articles/${article.id}/increment-read-count`, null, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    .then(response => {
      console.log(response.status);
      console.log("Read count incremented for article:", article.id);
    })
    .catch(error => console.error('Error incrementing read count:', error));
  };

  // Close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openArticle(item)}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      {selectedArticle && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.modalContent}>{selectedArticle.content}</Text>
              </ScrollView>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 16,
  },
});

export default App;
