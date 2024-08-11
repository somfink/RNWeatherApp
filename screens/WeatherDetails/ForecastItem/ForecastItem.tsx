import { View, Image, Text } from 'react-native';
import { GetForecastListDto } from '../../../types';
import { kelvinToCelsiusConverter } from '../../../utils/kelvinToCelsiusConverter';
import { styles } from './styles';

type ForecastItemProps = { item: GetForecastListDto };

const ForecastItem = ({ item }: ForecastItemProps) => {
  if (!item) {
    return null;
  }
  const date = new Date(item.dt * 1000);

  return (
    <View style={styles.forecastTile}>
      <Image
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
        style={styles.image}
      />
      <View>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <Text style={styles.tempText}>
          Temp: {kelvinToCelsiusConverter(item.main.temp)}°C
        </Text>
        <Text style={styles.conditionText}>
          Condition: {item.weather[0].description}
        </Text>
        <Text style={styles.conditionText}>Wind: {item.wind.speed} m/s</Text>
        <Text style={styles.conditionText}>
          Humidity: {item.main.humidity} %
        </Text>
        <Text style={styles.conditionText}>
          Description: {item.weather[0].description}
        </Text>
      </View>
    </View>
  );
};

export default ForecastItem;
