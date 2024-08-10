import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  forecastTile: {
    flexDirection: 'row',
    backgroundColor: '#ffacac',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tempText: {
    fontSize: 16,
  },
  conditionText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
