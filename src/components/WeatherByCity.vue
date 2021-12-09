<template>
  <div class="container p-4 text-center">
    <form @submit.prevent="getWeatherData">
      <input type="text" v-model="input" ref="inputform" />
      <button type="submit" @click.prevent="getWeatherData">Search</button>
    </form>
    <div class="content__wrapper" v-if="weatherCondition">
      <h1 class="text-center mt-5">{{ weatherLocation }}</h1>
      <div class="row">
        <div class="col-lg-4">
          <h4>Condition</h4>
          <p>{{ weatherCondition }}</p>
        </div>
        <div class="col-lg-4">
          <h4>Temperature</h4>
          <p>{{ temperature }}°C</p>
        </div>
        <div class="col-lg-4">
          <h4>Visibility</h4>
          <p>{{ visibility }}metres</p>
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
      weatherCondition: "",
      weatherLocation: "",
      temperature: 0,
      visibility: 0,
      input: ""
    };
  },
  methods: {
    async getWeatherData() {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=${API_KEY}`);

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        this.weatherLocation = data["name"];
        this.weatherCondition = data["weather"][0]["main"];
        this.temperature = (data["main"]["temp"] - 273.15).toFixed(1);
        this.visibility = data["visibility"];

        this.$refs.inputform.value = "";
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
</script>

<style></style>
