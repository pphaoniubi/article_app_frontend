import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleScreen from './ArticleScreen'; // Import the new screen

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:8080/api/articles/titles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => console.error('Error fetching article titles:', error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Article', { id: item.id })}>
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
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Articles' }} />
        <Stack.Screen name="Article" component={ArticleScreen} options={{ title: 'Article Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
});

export default App;
