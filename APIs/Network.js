import axios from "axios";

const Config= {
    baseURL : 'https://api.themoviedb.org/3/movie',
    token : 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjdiZjU3YTA4YTZmNmMzMzM2ZDQ3YTFiM2RkN2RmZiIsIm5iZiI6MTczNDI0ODQwOS41NzYsInN1YiI6IjY3NWU4N2Q5ZThhNjRhZDc3ZDc2Mzg2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VVJGT7Icvrv0iP4_PPYc4oiqJ3Al6NS-_5MUr2S-R30'
};

export const getUpcomingMovies = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/upcoming`, {
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      });
      const data = response.data;
      const status = response.status;
      return {success: true, data: data, status: status};
    } catch (error) {
      console.log(error);
      return {success: false, data: error};
    }
  };

  export const getNowPlayingMovies = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/now_playing`, {
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      });
      const data = response.data;
      const status = response.status;
      return {success: true, data: data, status: status};
    } catch (error) {
      console.log(error);
      return {success: false, data: error};
    }
  };

  export const getPopularMovies = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/popular`, {
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      });
      const data = response.data;
      const status = response.status;
      return {success: true, data: data, status: status};
    } catch (error) {
      console.log(error);
      return {success: false, data: error};
    }
  };

  export const getTopRatedMovies = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/top_rated`, {
        headers: {
          Authorization: `Bearer ${Config.token}`,
        },
      });
      const data = response.data;
      const status = response.status;
      return {success: true, data: data, status: status};
    } catch (error) {
      console.log(error);
      return {success: false, data: error};
    }
  };