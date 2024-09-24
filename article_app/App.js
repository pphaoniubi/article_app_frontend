import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleScreen from './ArticleScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // For the eye icon

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
    <View>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Article', { id: item.id })}>
        <View style={styles.itemRow}>
          <Text style={styles.title}>{item.id}. {item.title}</Text>
          {/* Separate Text component for the read count */}
          <View style={styles.readCountContainer}>
            <Icon name="eye-outline" size={16} color="#666" />
            <Text style={styles.readCount}> {item.read_count}</Text>
          </View>
        </View>
        <Text style={styles.publish_date}>发布时间：{item.publish_date}</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: 'rgb(214, 214, 194)', // Set the grey background color here
    padding: 15,
    marginVertical: 8,
    borderRadius: 5, // Optional: Add some rounding to the corners for a nicer look
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
  },
  readCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readCount: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  publish_date: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'right'
  },
});


export default App;
