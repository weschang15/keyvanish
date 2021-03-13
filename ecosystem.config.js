module.exports = {
  apps: [
    {
      name: "Worker",
      script: "./worker.js",
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: "fork_mode",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "API",
      script: "./server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: "fork_mode",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
