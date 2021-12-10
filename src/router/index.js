import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import CurrentWeather from "../components/CurrentWeather.vue";
import HourlyForecast from "../components/HourlyForecast.vue";
import TodayForecast from "../components/TodayForecast.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/current-weather",
    component: CurrentWeather
  },
  {
    path: "/hourly-forecast",
    component: HourlyForecast
  },
  {
    path: "/today-forecast",
    component: TodayForecast
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
