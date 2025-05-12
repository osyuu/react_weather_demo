export const TemperatureUtils = {
  toFahrenheit,
  toCelsius,
};

function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

function toCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}
