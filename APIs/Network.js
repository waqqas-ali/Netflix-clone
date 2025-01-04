import axios from 'axios';

const Config = {
  baseURL: 'https://imdb-top-100-movies.p.rapidapi.com/',
  token:
    '01cc6f3ccbmsh9cb58bc296446d2p1571f0jsnf23bb92e0d9d',
};
export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${Config.baseURL}`, {
      headers: {
        // Authorization: `Bearer ${Config.token}`
        'x-rapidapi-key': Config.token, 
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
      },
    });
    // console.log(response.data)
    const data = response.data;
    const status = response.status;
    return {success: true, data: data, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};

// export const getNowPlayingMovies = async () => {
//   try {
//     const response = await axios.get(`${Config.baseURL}/now_playing`, {
//       headers: {
//         Authorization: `Bearer ${Config.token}`,
//       },
//     });
//     const data = response.data;
//     const status = response.status;
//     return {success: true, data: data, status: status};
//   } catch (error) {
//     console.log(error);
//     return {success: false, data: error};
//   }
// };

// export const getPopularMovies = async () => {
//   try {
//     const response = await axios.get(`${Config.baseURL}/popular`, {
//       headers: {
//         Authorization: `Bearer ${Config.token}`,
//       },
//     });
//     const data = response.data;
//     const status = response.status;
//     return {success: true, data: data, status: status};
//   } catch (error) {
//     console.log(error);
//     return {success: false, data: error};
//   }
// };

// export const getTopRatedMovies = async () => {
//   try {
//     const response = await axios.get(`${Config.baseURL}/top_rated`, {
//       headers: {
//         Authorization: `Bearer ${Config.token}`,
//       },
//     });
//     const data = response.data;
//     const status = response.status;
//     return {success: true, data: data, status: status};
//   } catch (error) {
//     console.log(error);
//     return {success: false, data: error};
//   }
// };