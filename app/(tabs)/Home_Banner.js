import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUpcomingMovies} from '../../APIs/Network';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

const Home_Banner = () => {
  const [upcomingApiData, setupcomingApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUpComingApi = async () => {
      try {
        const {data, status} = await getUpcomingMovies();
        if (status === 200) {
          setupcomingApiData(data.results || []);
        } else {
          Alert.alert(`Request failed`, `${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    handleUpComingApi();
  }, []);

  const renderMovieBanner = ({item}) => {
    const imageUrl = item.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
      : 'https://via.placeholder.com/500';

    return (
      <ImageBackground
        style={styles.movieBanner}
        resizeMode="cover"
        source={{uri: imageUrl}}>
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.7)']}
          style={styles.linearContainer}>
          <Text style={styles.titles}>{item.title || 'Untitled'}</Text>

          <TouchableOpacity
            onPress={() => console.log(`Playing: ${item.title}`)}
            activeOpacity={0.8}
            style={styles.playButton}>
            <Entypo name="controller-play" size={35} color="black" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log(`Info: ${item.title}`)}
            activeOpacity={0.8}>
            <Text style={styles.titles}>Info</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        data={upcomingApiData}
        renderItem={renderMovieBanner}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home_Banner;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(70),
    width: '100%',
  },
  movieBanner: {
    width: responsiveWidth(100),
    height: '100%',
    justifyContent: 'flex-end',
    opacity: 0.9,
  },
  linearContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  titles: {
    fontSize: responsiveFontSize(2.3),
    color: 'white',
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: 'white',
    width: responsiveWidth(28),
    height: responsiveHeight(5.5),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  playText: {
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});






// import {
//   Alert,
//   FlatList,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {getUpcomingMovies} from '../../APIs/Network';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import LinearGradient from 'react-native-linear-gradient';
// import Entypo from 'react-native-vector-icons/Entypo';

// const Home_Banner = () => {
//   const [upcomingApiData, setupcomingApiData] = useState([]);
//   useEffect(() => {
//     const handleUpComingApi = async () => {
//       const {data, status} = await getUpcomingMovies();
//       if (status === 200) {
//         setupcomingApiData(data.results);
//       } else {
//         Alert.alert(`Request failed with ${data}`);
//       }
//     };
//     handleUpComingApi();
//   }, []);

//   const renderMovieBanner = ({item, index}) => {
//     return (
//       <ImageBackground
//         style={styles.movieBanner}
//         resizeMode="cover"
//         source={{
//           uri: ``,
//         }}>
//         <LinearGradient
//           colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,7)']}
//           style={styles.linearContainer}>
//           <Text style={styles.titles}>My List</Text>

//           <TouchableOpacity
//             onPress={() => {
//               console.log('Clicked Play Button');
//             }}
//             activeOpacity={0.8}
//             style={styles.playButton}>
//             <Entypo name="controller-play" size={35} color="black" />
//             <Text
//               style={[
//                 styles.titles,
//                 {
//                   fontSize: responsiveFontSize(2.2),
//                   color: 'black',
//                   fontWeight: '700',
//                 },
//               ]}>
//               Play
//             </Text>
//           </TouchableOpacity>

//           <Text style={styles.titles}>Info</Text>
//         </LinearGradient>
//       </ImageBackground>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         horizontal
//         data={upcomingApiData}
//         renderItem={renderMovieBanner}
//       />
//     </View>
//   );
// };

// export default Home_Banner;

// const styles = StyleSheet.create({
//   container: {
//     height: responsiveHeight(70),
//     width: '100%',
//   },
//   movieBanner: {
//     width: responsiveWidth(100),
//     height: '100%',
//     justifyContent: 'flex-end',
//     opacity: 0.9,
//   },
//   linearContainer: {
//     flex: 0.2,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     alignSelf: 'stretch',
//   },
//   titles: {
//     fontSize: responsiveFontSize(2.3),
//     color: 'white',
//     fontWeight: '500',
//   },
//   playButton: {
//     backgroundColor: 'white',
//     width: responsiveWidth(28),
//     height: responsiveHeight(5.5),
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 5,
//   },
// });




// import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Home_Banner = () => {
//   const Config = {
//     baseURL: 'https://api.themoviedb.org/3/movie',
//     token:
//       'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjdiZjU3YTA4YTZmNmMzMzM2ZDQ3YTFiM2RkN2RmZiIsIm5iZiI6MTczNDI0ODQwOS41NzYsInN1YiI6IjY3NWU4N2Q5ZThhNjRhZDc3ZDc2Mzg2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VVJGT7Icvrv0iP4_PPYc4oiqJ3Al6NS-_5MUr2S-R30',
//   };

//   const getUpcomingMovies = async () => {
//     try {
//       const response = await axios.get(`${Config.baseURL}/upcoming`, {
//         headers: {
//           Authorization: `Bearer ${Config.token}`,
//         },
//       });
//       const data = response.data;
//       const status = response.status;
//       return { success: true, data: data, status: status };
//     } catch (error) {
//       console.log(error);
//       return { success: false, data: error };
//     }
//   };

//   const [upcomingApiData, setupcomingApiData] = useState(null);

//   useEffect(() => {
//     const handleUpComingApi = async () => {
//       const { data, status } = await getUpcomingMovies();
//       if (status === 200) {
//         setupcomingApiData(data.results); // Assuming `results` is the array of movies
//       } else {
//         Alert.alert(`Request failed with ${data}`);
//       }
//     };
//     handleUpComingApi();
//   }, []);
//   console.log(upcomingApiData)
//   if (!upcomingApiData) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading upcoming movies...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={upcomingApiData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.movieTitle}>{item.title}</Text>
//             <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   item: {
//     marginBottom: 15,
//   },
//   movieTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   releaseDate: {
//     color: 'gray',
//   },
// });

// export default Home_Banner;
