<template>
  <div class="container p-4 text-center">
    <form @submit.prevent="getCoords">
      <input type="text" v-model="input" ref="inputform" />
      <button type="submit" @click.prevent="getCoords">Search</button>
    </form>
    <div class="content__wrapper" v-if="weatherLocation">
      <h1 class="text-center mt-5 mb-4">Today's Weather Forecast in {{ weatherLocation }}</h1>
      <button @click.prevent="showIcon">Show Icons</button>
      <div class="row">
        <div class="col-lg-3" v-for="(w, i) in forecastTime" :key="i">
          <p>{{ w }}</p>
          <p>{{ temperature[i] }}°C</p>
        </div>
      </div>
    </div>
    <div v-if="!isFound">
      Oops... Something went wrong! <br />
      Weather or Location is not Found!
    </div>
  </div>
</template>

<script>
import { API_KEY } from "../config.json";

export default {
  data() {
    return {
      input: "",
      inputform: null,
      forecastTime: ["Morning", "Day", "Afternoon", "Evening"],
      temperature: [],
      weatherLocation: "",
      isFound: true
    };
  },
  methods: {
    async getWeatherData(lat, lon) {
      try {
        const singleChar = this.input.charAt(0).toUpperCase();

        const request = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely&appid=${API_KEY}`
        );

        this.weatherCondition = [];
        this.temperature = [];
        this.weatherLocation = singleChar.concat(this.input.slice(1));

        const data = await request.json();

        console.log(data);

        this.temperature.push((data["daily"][0]["feels_like"]["morn"] - 273.15).toFixed(1));
        this.temperature.push((data["daily"][0]["feels_like"]["day"] - 273.15).toFixed(1));
        this.temperature.push((data["daily"][0]["feels_like"]["eve"] - 273.15).toFixed(1));
        this.temperature.push((data["daily"][0]["feels_like"]["night"] - 273.15).toFixed(1));

        this.$refs.inputform.value = "";
      } catch (error) {
        console.error(error);
      }
    },
    async getCoords() {
      try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=${API_KEY}`);
        const data = await request.json();

        if (!request.ok) {
          this.isFound = false;
          this.$refs.inputform.value = "";
          throw new Error("Failed to fetch data from API");
        } else {
          this.isFound = true;
        }

        this.getWeatherData(data["coord"]["lat"], data["coord"]["lon"]);
        this.$refs.inputform.value = "";
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
</script>
