export type TemperatureUnits = "fahrenheit" | "celsius";

export type WeatherData = {
  temperature: number;
  weatherCode: number;
};

export type Weather = {
  location: string;
  temperature: number;
  condition: WeatherCondition;
  lastUpdated: Date;
};

export type WeatherCondition =
  | "clear"
  | "rainy"
  | "cloudy"
  | "snowy"
  | "unknown";

export const WeatherConditions = {
  clear: "clear",
  rainy: "rainy",
  cloudy: "cloudy",
  snowy: "snowy",
  unknown: "unknown",
} as const;

export function fromCode(code: number): WeatherCondition {
  switch (code) {
    case 0:
      return WeatherConditions.clear;
    case 1:
    case 2:
    case 3:
    case 45:
    case 48:
      return WeatherConditions.cloudy;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
    case 95:
    case 96:
    case 99:
      return WeatherConditions.rainy;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return WeatherConditions.snowy;
    default:
      return WeatherConditions.unknown;
  }
}
