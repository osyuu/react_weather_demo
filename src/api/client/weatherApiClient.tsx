export class WeatherApiClient {
  static baseUrlWeather = "api.open-meteo.com";
  static baseUrlGeocoding = "geocoding-api.open-meteo.com";

  async locationSearch(query: string) {
    const res = await fetch(
      `https://${WeatherApiClient.baseUrlGeocoding}/v1/search?name=${query}&count=1`
    );
    const data = await res.json();
    return data["results"][0];
  }

  async getWeather({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    const res = await fetch(
      `https://${WeatherApiClient.baseUrlWeather}/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await res.json();
    return data["current_weather"];
  }
}
