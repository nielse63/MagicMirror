module.exports = {
  apps: [
    {
      name: "prod",
      script: "npm start",
      log_file: "logs/pm2-combined.log",
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
  //       "post-deploy": "npm install && pm2 reload ecosystem.config.js --only prod --env production",
  //       "pre-setup": "",
  //     },
  //   },
};
