Module.register("activity", {
  // Default module config.
  defaults: {
    fitbarkToken: "",
    dogIds: ["ebbadcb3-1815-4520-b548-a7e9633df01e", "70c43601-eab0-4576-b4e9-8f6839f96ff7"],
  },

  start: function () {
    this.activity = [];

    this.initRequests();
    Log.log(this.name + " is started!");
  },

  getTemplate: function () {
    return "activity.njk";
  },

  // Add all the data to the template.
  getTemplateData: function () {
    return {
      config: this.config,
      activity: this.activity,
    };
  },

  getStyles: function () {
    return [this.file("css/activity.css")];
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "FITBARK_ACTIVITY") {
      this.updateActivity(payload);
    }
  },

  createGaugeObject: function (data) {
    const circumference = 2 * Math.PI * 45;
    const dasharray = `${Math.floor(circumference * 0.8)}, ${Math.floor(circumference)}`;
    const percentage = data.activity / data.goal;
    const valueDasharray = `${Math.floor(circumference * 0.8 * percentage)}, ${Math.floor(
      circumference
    )}`;
    const getColor = (value) => {
      if (value < 33) {
        return "#ef4655"; // red
      }
      if (value < 66) {
        return "#fffa50"; // yellow
      }
      return "#5ee432"; // green
    };
    return Object.assign({}, data, {
      dasharray: dasharray,
      valueDasharray,
      color: getColor(percentage * 100),
      activityString: new Intl.NumberFormat().format(data.activity),
    });
  },

  updateActivity: function (payload) {
    this.activity = Object.values(payload).map(this.createGaugeObject);
    this.updateDom();
  },

  initRequests: function () {
    this.sendSocketNotification("FITBARK_REQUEST_INIT", {
      config: this.config,
    });
  },
});
