import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { WeatherView } from "./features/weather/WeatherView";
import { Route, Routes } from "react-router-dom";
import { AppSettingsProvider } from "./features/settings/AppSettingsProvider";
import { AppSettings } from "./features/settings/AppSettingsView";
import { WeatherLayout } from "./layouts/WeatherLayout";

function App() {
  // return <WeatherView />;
  return (
    <AppSettingsProvider>
      <Routes>
        <Route path="/" element={<WeatherLayout />}>
          <Route path="settings" element={<AppSettings />} />
        </Route>
        {/* <Route path="/" element={<WeatherView />} />
        <Route path="/settings" element={<AppSettings />} /> */}
      </Routes>
    </AppSettingsProvider>
  );
}

export default App;
