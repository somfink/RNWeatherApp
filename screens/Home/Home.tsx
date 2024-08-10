import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getCityCords } from '../../services/weatherService';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleSearch = async () => {
    if (city.trim() === '') {
      Alert.alert('Input Error', 'Please enter a city name.');
      return;
    }

    try {
      const weatherData = await getCityCords('Kielce');
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     const dupa = await getCityCords('Kielce');
  //     console.log(dupa);
  //   };
  //   fetchWeatherData();
  // }, []);

  return (
    <SafeAreaView style={{ ...backgroundStyle, ...styles.rootContainer }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.description}>
          Enter the name of a city below to fetch the current weather data.
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <Button title="Get Weather" onPress={handleSearch} color={'red'} />
        </View>
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherText}>
              Temperature: {weather.main.temp}°C
            </Text>
            <Text style={styles.weatherText}>
              Condition: {weather.weather[0].description}
            </Text>
            <Text style={styles.weatherText}>
              Humidity: {weather.main.humidity}%
            </Text>
            <Text style={styles.weatherText}>
              Wind Speed: {weather.wind.speed} m/s
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginVertical: 20,
    width: '100%',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default Home;
