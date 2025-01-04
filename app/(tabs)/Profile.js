// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';

// // Import the API call function
// import { getUpcomingMovies } from '../../APIs/Network';  // Ensure this file exists in your project structure

// const Profile = () => {
//   const [movies, setMovies] = useState([]); // Store movies data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [numColumns, setNumColumns] = useState(2); // Default to 2 columns

//   // Fetch movie data when the component mounts
//   useEffect(() => {
//     const fetchMovies = async () => {
//       const { success, data, status } = await getUpcomingMovies();

//       if (success) {
//         setMovies(data); // Update state with API data
//       } else {
//         setError('Failed to load movies.');
//       }
//       setLoading(false);
//     };

//     fetchMovies(); // Call the function to fetch data

//     // Adjust the number of columns based on screen width
//     const updateLayout = () => {
//       const screenWidth = Dimensions.get('window').width;
//       if (screenWidth > 600) {
//         setNumColumns(3); // 3 columns for larger screens
//       } else {
//         setNumColumns(2); // 2 columns for smaller screens
//       }
//     };

//     updateLayout(); // Call it initially to set the correct column count
//     Dimensions.addEventListener('change', updateLayout); // Add listener for screen resizing

//     return () => {
//       Dimensions.removeEventListener('change', updateLayout); // Cleanup listener
//     };
//   }, []);

//   // Render loading, error, or the movies list
//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Top 250 Movies</Text> */}
//       <FlatList
//         key={numColumns} // Force re-render when numColumns changes
//         data={movies}
//         numColumns={numColumns} // Use the dynamically set number of columns
//         renderItem={({ item }) => (
//           <View style={styles.movieItem}>
//             <TouchableOpacity onPress={() => alert(`Title: ${item?.title || 'Unknown Title'}`)}>
//               <Image 
//                 source={{ uri: item?.image || 'https://via.placeholder.com/100x150' }} 
//                 style={styles.moviePoster}
//               />
//             </TouchableOpacity>
//             <View style={styles.movieDetails}>
//               <Text style={styles.movieTitle}>{item?.title || 'Unknown Title'}</Text>
//               <Text>Year: {item?.year || 'N/A'}</Text>
//               <Text>IMDb Rating: {item?.imdbRating || 'N/A'}</Text>
//             </View>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   movieItem: {
//     flex: 1,
//     margin: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     alignItems: 'center', // Center the content horizontally
//     paddingBottom: 10, // Add some space below the text
//   },
//   moviePoster: {
//     width: 120,
//     height: 180,
//     borderRadius: 5,
//     marginBottom: 10, // Space between image and text
//   },
//   movieDetails: {
//     alignItems: 'center', // Center the text below the image
//   },
//   movieTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5, // Space between title and other text
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Profile;



import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation hook

// Import the API call function
import { getUpcomingMovies } from '../../APIs/Network';  // Ensure this file exists in your project structure

const Profile = () => {
  const navigation = useNavigation(); // Get navigation object
  const [movies, setMovies] = useState([]); // Store movies data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch movie data when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      const { success, data, status } = await getUpcomingMovies();

      if (success) {
        setMovies(data); // Update state with API data
      } else {
        setError('Failed to load movies.');
      }
      setLoading(false);
    };

    fetchMovies(); // Call the function to fetch data
  }, []);

  // Render loading, error, or the movies list
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 250 Movies</Text>
      <FlatList
        data={movies}
        numColumns={2} // Display two items per row (2 columns)
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { movie: item })}>
              <Image 
                source={{ uri: item?.image || 'https://via.placeholder.com/100x150' }} 
                style={styles.moviePoster}
              />
            </TouchableOpacity>
            <View style={styles.movieDetails}>
              <Text style={styles.movieTitle}>{item?.title || 'Unknown Title'}</Text>
              <Text>Year: {item?.year || 'N/A'}</Text>
              <Text>IMDb Rating: {item?.imdbRating || 'N/A'}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  movieItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center', // Center the content horizontally
    paddingBottom: 10, // Add some space below the text
  },
  moviePoster: {
    width: 120,
    height: 180,
    borderRadius: 5,
    marginBottom: 10, // Space between image and text
  },
  movieDetails: {
    alignItems: 'center', // Center the text below the image
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Space between title and other text
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
