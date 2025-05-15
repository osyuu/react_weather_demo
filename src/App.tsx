import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { WeatherView } from "./features/weather/WeatherView";
import { Route, Routes } from "react-router-dom";
import { AppSettingsProvider } from "./features/settings/AppSettingsProvider";
import { AppSettings } from "./features/settings/AppSettingsView";
import { WeatherLayout } from "./layouts/WeatherLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // return <WeatherView />;
  return (
    <QueryClientProvider client={queryClient}>
      <AppSettingsProvider>
        <Routes>
          <Route path="/" element={<WeatherLayout />}>
            <Route path="settings" element={<AppSettings />} />
          </Route>
          {/* <Route path="/" element={<WeatherView />} />
        <Route path="/settings" element={<AppSettings />} /> */}
        </Routes>
      </AppSettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
