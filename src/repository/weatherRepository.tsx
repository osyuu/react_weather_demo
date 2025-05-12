import type { WeatherApiClient } from "../api/client/weatherApiClient";
import type { Location } from "../models/location";
import { fromCode, type Weather, type WeatherData } from "../models/weather";

export class WeatherRepository {
  private api: WeatherApiClient;

  constructor(apiClient: WeatherApiClient) {
    this.api = apiClient;
  }

  async getWeather(city: string) {
    const location = this.mapToLocation(await this.api.locationSearch(city));
    const weatherData = this.mapToWeatherData(
      await this.api.getWeather({
        latitude: location.latitude,
        longitude: location.longitude,
      })
    );
    return this.mapToWeather(location, weatherData);
  }

  private mapToLocation(data: any): Location {
    return {
      id: data.id,
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  }

  private mapToWeatherData(data: any): WeatherData {
    return {
      temperature: data.temperature,
      weatherCode: data["weathercode"],
    };
  }

  private mapToWeather(location: Location, data: WeatherData): Weather {
    return {
      location: location.name,
      temperature: data.temperature,
      condition: fromCode(data.weatherCode),
      lastUpdated: new Date(),
    };
  }
}
