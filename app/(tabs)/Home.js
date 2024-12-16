import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '@/app/(tabs)/Profile';

const Drawer = createDrawerNavigator();

const Home = ({ user, onLogout }) => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Profile">
        {props => <Profile {...props} user={user} onLogout={onLogout} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default Home;
