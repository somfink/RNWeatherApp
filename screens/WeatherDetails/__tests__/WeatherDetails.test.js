import { render, waitFor, screen } from '@testing-library/react-native';
import WeatherDetails from '../WeatherDetails';
import { useWeatherStore } from '../../../store/weatherStore';
import { getWeatherForecast } from '../../../services/weatherService';

// Mock the store and services
jest.mock('../../../store/weatherStore', () => ({
  useWeatherStore: jest.fn(),
}));

jest.mock('../../../services/weatherService', () => ({
  getWeatherForecast: jest.fn(),
}));

describe('WeatherDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while fetching data', () => {
    useWeatherStore.mockReturnValue({ city: 'New York' });
    getWeatherForecast.mockResolvedValue([]);

    render(<WeatherDetails />);

    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('displays city name and forecast list after data is fetched', async () => {
    useWeatherStore.mockReturnValue({ city: 'New York' });

    const mockForecast = [
      {
        dt: 1,
        main: {
          temp: 295.15, // Example temperature in Kelvin
        },
        weather: [
          {
            description: 'sunny',
          },
        ],
      },
    ];

    getWeatherForecast.mockResolvedValue(mockForecast);

    render(<WeatherDetails />);

    await waitFor(() =>
      expect(screen.queryByTestId('activity-indicator')).toBeFalsy(),
    );

    expect(screen.getByText('NEW YORK')).toBeTruthy();
    expect(screen.getByText(/Temp:/)).toBeTruthy();
    expect(screen.getByText(/Condition:/)).toBeTruthy();
  });

  it('handles errors gracefully and stops loading', async () => {
    useWeatherStore.mockReturnValue({ city: 'New York' });
    getWeatherForecast.mockRejectedValue(new Error('Failed to fetch'));

    render(<WeatherDetails />);

    await waitFor(() =>
      expect(screen.queryByTestId('activity-indicator')).toBeFalsy(),
    );

    // Add more assertions here based on your UI design
  });
});
