// import React from 'react';
// import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';

// const DetailScreen = ({ route, navigation }) => {
//   const { movie } = route.params; // Get the movie data passed from the Profile screen

//   const handlePlayPress = () => {
//     Alert.alert('Play Button Pressed', `Playing trailer for ${movie?.title}`);
//     // Here you can integrate a media player or open a trailer URL
//   };

//   return (
//     <View style={styles.container}>
//       <Image 
//         source={{ uri: movie?.image || 'https://via.placeholder.com/400x300' }} 
//         style={styles.movieImage}
//       />
//       <Text style={styles.movieTitle}>{movie?.title}</Text>
//       <Text style={styles.movieDescription}>{movie?.description || 'No description available.'}</Text>
//       <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
//         <Text style={styles.playButtonText}>▶ Play</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   movieImage: {
//     width: '100%',
//     height: 300,
//     resizeMode: 'contain',
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   movieTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   movieDescription: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   playButton: {
//     backgroundColor: '#ff5c5c',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   playButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default DetailScreen;




import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  // Disable the drawer when navigating to the DetailScreen
  useEffect(() => {
    // Lock the drawer to prevent it from being opened
    navigation.setOptions({
      drawerLockMode: 'locked-closed', // Lock drawer on this screen
    });

    // Cleanup when leaving the DetailScreen (re-enable the drawer)
    return () => {
      navigation.setOptions({
        drawerLockMode: 'unlocked', // Re-enable the drawer when leaving the screen
      });
    };
  }, [navigation]);

  const handlePlayPress = () => {
    Alert.alert('Play Button Pressed', `Playing trailer for ${movie?.title}`);
    // You can integrate a media player or open a trailer URL here
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: movie?.image || 'https://via.placeholder.com/400x300' }} 
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie?.title}</Text>
      <Text style={styles.movieDescription}>{movie?.description || 'No description available.'}</Text>
      <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
        <Text style={styles.playButtonText}>▶ Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 5,
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#ff5c5c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DetailScreen;

