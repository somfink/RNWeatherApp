import 'react-native';
import React from 'react';
import App from '../App';
import { it } from '@jest/globals';
import renderer, { act } from 'react-test-renderer';

// Mock external dependencies if any
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
}));

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<App />);
  });
});
