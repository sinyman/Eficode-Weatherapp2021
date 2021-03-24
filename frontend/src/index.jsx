import React from 'react';
import ReactDOM from 'react-dom';

// Getting environment data
const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    // Disabling ESLint no-console, for easy error handling
    // TODO: Implement error-state with message div on page
    console.error(error); // eslint-disable-line no-console
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      weatherText: '', // More descriptive text of weather conditions
    };
  }

  // Populate the site with data as it mounts
  async componentDidMount() {
    const weather = await getWeatherFromApi();
    this.setState({
      icon: weather.icon.slice(0, -1),
      weatherText: weather.main,
    });
  }

  render() {
    const { icon, weatherText } = this.state;

    return (
      <div>
        { // eslint-disable-next-line
        }{ weatherText && <h1>The weather right now in Helsinki is { weatherText.toLowerCase() }!</h1>}
        <div className="icon">
          { icon && <img src={`/img/${icon}.svg`} alt="Weather icon" /> }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
