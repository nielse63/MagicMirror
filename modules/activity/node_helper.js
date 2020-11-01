const NodeHelper = require("node_helper");
const axios = require("axios");

module.exports = NodeHelper.create({
  start: function () {
    this.fitbarkToken = "";
    this.fitbarkHeaders = {
      Host: "app-api.fitbark.com",
      Authorization: `Bearer ${this.fitbarkToken}`,
      "Content-Type": "application/json",
      "User-Agent": "FitBark/3.1.9_0 (iPhone; iOS 14.1; Scale/3.00)",
    };
    this.results = {};
  },

  setFitbarkToken: function (token) {
    this.fitbarkToken = token;
    this.fitbarkHeaders.Authorization = `Bearer ${this.fitbarkToken}`;
  },

  socketNotificationReceived: async function (notification, payload) {
    if (notification === "FITBARK_REQUEST_INIT") {
      this.setFitbarkToken(payload.config.fitbarkToken);
      await this.updateDogActivity(payload.config.dogIds);
      await this.requestDogInfo(payload.config.dogIds);
      this.sendSocketNotification("FITBARK_ACTIVITY", this.results);
    }
  },

  updateDogActivity: async function (dogIds) {
    const promises = dogIds.map((dogId) => {
      return this.getDogActivity(dogId);
    });
    await Promise.all(promises);
  },

  requestDogInfo: async function (dogIds) {
    const promises = dogIds.map((dogId) => {
      return this.getDogInfo(dogId);
    });
    const results = await Promise.all(promises);
    results.forEach(({ dog }) => {
      const {
        name,
        slug,
        daily_goal: goal,
        activity_value: activity,
        last_sync,
      } = dog;
      this.results[slug] = {
        name: name,
        goal: goal,
        slug: slug,
        activity: activity,
        last_sync: last_sync,
      };
    });
  },

  getDogActivity: function (dogId) {
    var data = JSON.stringify({
      activity_series: {
        dog_id: dogId,
        to: "2020-09-06",
        type: "SUM",
        resolution: "DAILY",
        from: "2020-09-06",
      },
    });

    var config = {
      method: "post",
      url: "https://app-api.fitbark.com/api/activity_series",
      headers: this.fitbarkHeaders,
      data: data,
    };

    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  getDogInfo: function (dogId) {
    var config = {
      method: "get",
      url: `https://app.fitbark.com/api/v2/dog/${dogId}`,
      headers: this.fitbarkHeaders,
    };

    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
});
