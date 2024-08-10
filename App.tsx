import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Home from './screens/Home';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name={'home'} color={color} size={size} />;
            }
            if (route.name === 'City') {
              return <Ionicons name={'add'} color={color} size={size} />;
            }
            console.log(route.name);
            return null;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="City" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
