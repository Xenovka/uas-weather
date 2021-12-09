<template>
  <div class="container p-4 text-center">
    <form @submit.prevent="getCoords">
      <input type="text" v-model="input" ref="inputform" />
      <button type="submit" @click.prevent="getCoords">Search</button>
    </form>
    <div class="content__wrapper" v-if="weatherLocation">
      <h1 class="text-center mt-5 mb-4">Hourly Weather Forecast of {{ weatherLocation }}</h1>
      <div class="row">
        <div class="col-lg-3" v-for="(w, i) in weatherCondition" :key="i">
          <p>{{ w }}</p>
          <p>{{ temperature[i] }}°C</p>
          <p>{{ forecastTime[i] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_KEY } from "../config.json";

export default {
  data() {
    return {
      input: "",
      weatherCondition: [],
      forecastTime: [],
      temperature: [],
      weatherLocation: ""
    };
  },
  methods: {
    async getWeatherData(lat, lon) {
      const singleChar = this.input.charAt(0).toUpperCase();

      this.weatherCondition = [];
      this.temperature = [];
      this.forecastTime = [];
      this.weatherLocation = singleChar.concat(this.input.slice(1));

      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,current,minutely&appid=${API_KEY}`
      );
      const data = await request.json();

      for (let i = 1; i < 5; i++) {
        this.weatherCondition.push(data["hourly"][i]["weather"][0]["main"]);
        this.temperature.push((data["hourly"][i]["temp"] - 273.15).toFixed(1));
        this.forecastTime.push(new Date(data["hourly"][i]["dt"] * 1000));
      }
    },
    async getCoords() {
      try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=${API_KEY}`);
        const data = await request.json();

        this.getWeatherData(data["coord"]["lat"], data["coord"]["lon"]);
        this.$refs.inputform.value = "";
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
</script>

<style></style>
