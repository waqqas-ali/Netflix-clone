import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Function to fetch data based on search query
  const fetchShows = async (query) => {
    if (!query) return; // Prevent unnecessary fetch if search query is empty

    setLoading(true);
    setError(null); // Reset error state before each fetch attempt

    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      setShows(response.data); // Store shows data
    } catch (err) {
      setError('Failed to load shows. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Debounce to handle search input changes and prevent frequent API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchShows(searchQuery);
    }, 500); // Delay of 500ms after user stops typing

    return () => clearTimeout(timer); // Clear timeout on component unmount or when searchQuery changes
  }, [searchQuery]);

  // Error State UI
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={() => fetchShows(searchQuery)} />
      </View>
    );
  }

  // Empty Results Handling with Search Input
  if (shows.length === 0 && searchQuery) {
    return (
      <View style={styles.centered}>
        <TextInput
          style={styles.searchInput2}
          placeholder="Try another search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text style={{ color: 'white' }}>No shows found for "{searchQuery}".</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for shows..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* FlatList for Displaying Shows */}
      <FlatList
        data={shows}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { movie: item })}>
              {item.show.image && (
                <Image source={{ uri: item.show.image.medium }} style={styles.image} />
              )}
            </TouchableOpacity>
            <Text style={styles.title}>{item.show.name}</Text>
            <Text style={styles.year}>
              {item.show.premiered ? new Date(item.show.premiered).getFullYear() : 'N/A'}
            </Text>
            <Text style={styles.rating}>
              IMDB Rating: {item.show.rating.average || 'N/A'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: 'white'
  },
  searchInput2: {
    height: 40,
    width : 400,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: 'white'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  item: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'black'
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: 'white'
  },
  year: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#ff9800',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    color: 'white'
  },
});

export default Profile;



