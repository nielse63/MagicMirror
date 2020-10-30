const path = require("path");

module.exports = {
  apps: [
    {
      name: "magic-mirror",
      cwd: __dirname,
      script: "npm start",
      log_file: path.resolve(__dirname, "logs/pm2-combined.log"),
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        DISPLAY: ":0",
        NODE_ENV: "production",
      },
    },
  ],

  //   deploy: {
  //     production: {
  //       user: "SSH_USERNAME",
  //       host: "SSH_HOSTMACHINE",
  //       ref: "origin/master",
  //       repo: "GIT_REPOSITORY",
  //       path: "DESTINATION_PATH",
  //       "pre-deploy-local": "",
  //       "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production",
  //       "pre-setup": "",
  //     },
  //   },
};
