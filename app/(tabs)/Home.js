import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from "@/app/(tabs)/Profile";

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
      <Drawer.Navigator initialRouteName="Profile">
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
  );
};

export default Home;

