import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />);
  });

  test('renders EventList', () => {
    expect(AppDOM.container.querySelector('#event-list')).toBeInTheDocument();
  });

  test('renders CitySearch', () => {
    expect(AppDOM.container.querySelector('#city-search')).toBeInTheDocument();
  });

  test('renders NumberOfEvents', () => {
    expect(AppDOM.container.querySelector('#number-of-events')).toBeInTheDocument();
  });
});
