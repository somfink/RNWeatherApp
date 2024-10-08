import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from './screens/Home';
import { StyleSheet } from 'react-native';
import WeatherDetails from './screens/WeatherDetails';
import { ScreenName } from './types/enums';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === ScreenName.Home) {
              return (
                <MaterialIcons
                  name={'location-pin'}
                  color={color}
                  size={size}
                />
              );
            }
            if (route.name === ScreenName.WeatherDetails) {
              return (
                <MaterialCommunityIcons
                  name={'weather-partly-cloudy'}
                  color={color}
                  size={size}
                />
              );
            }

            return null;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name={ScreenName.Home} component={Home} />
        <Tab.Screen
          name={ScreenName.WeatherDetails}
          component={WeatherDetails}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
