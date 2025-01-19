import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Video } from 'expo-av'; // Import the Video component from expo-av

const DetailScreen = ({ route, navigation }) => {
  // Retrieve the passed show data from navigation parameters
  const { movie } = route.params;

  // State to handle whether the video should be shown
  const [videoVisible, setVideoVisible] = useState(false);

  // Placeholder for Play button action (show video player)
  const handlePlayPress = () => {
    setVideoVisible(true); // Show the video when "Play" button is pressed
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Display the image of the show */}
        {movie.show.image ? (
          <Image source={{ uri: movie.show.image.original }} style={styles.image} />
        ) : (
          <Text>No image available</Text>
        )}

        {/* Show Video player if videoVisible is true */}
        {videoVisible && (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} // Video URL
              rate={1.0}
              volume={1.0}
              isMuted={false}
              shouldPlay
              useNativeControls
              isLooping
              style={styles.video}
            />
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        {/* Show the Title */}
        <Text style={styles.title}>{movie.show.name}</Text>

        {/* Show the Year */}
        <Text style={styles.year}>
          {movie.show.premiered ? new Date(movie.show.premiered).getFullYear() : 'N/A'}
        </Text>

        {/* Show IMDb Rating */}
        {movie.show.rating.average ? (
          <Text style={styles.rating}>IMDB Rating: {movie.show.rating.average}</Text>
        ) : (
          <Text style={styles.rating}>IMDB Rating: N/A</Text>
        )}

        {/* Show the Summary/Description */}
        {movie.show.summary ? (
          <Text style={styles.description}>{movie.show.summary.replace(/<[^>]+>/g, '')}</Text>
        ) : (
          <Text style={styles.description}>No description available</Text>
        )}

        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  videoContainer: {
    position: 'absolute', // Makes the video overlay the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  year: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    color: '#ff9800',
    textAlign: 'center',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 15,
    lineHeight: 22,
  },
  playButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailScreen;

