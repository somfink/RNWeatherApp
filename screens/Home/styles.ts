import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#ffd0d0',
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
  image: {
    width: 80,
    height: 80,
  },
});
