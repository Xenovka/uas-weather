import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import WeatherByCity from "../components/WeatherByCity.vue";
import HourlyForecast from "../components/HourlyForecast.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/city-weather",
    component: WeatherByCity
  },
  {
    path: "/hourly-forecast",
    component: HourlyForecast
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
