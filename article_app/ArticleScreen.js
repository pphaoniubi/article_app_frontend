import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ArticleScreen = ({ route }) => {
  const { id } = route.params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://10.0.2.2:8080/api/articles/${id}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching article:', error));

    // Increment read count
    axios.put(`http://10.0.2.2:8080/api/articles/${id}/increment-read-count`)
      .then(response => console.log("Read count incremented for article:", id))
      .catch(error => console.error('Error incrementing read count:', error));
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {article && (
        <>
          <Text style={styles.title}>{article.title}</Text>
          <ScrollView>
            <Text style={styles.content}>{article.content}</Text>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
  },
});

export default ArticleScreen;
