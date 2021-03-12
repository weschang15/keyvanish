module.exports = {
  apps: [
    {
      name: "Worker",
      script: "./worker.js",
      node_args: "-r dotenv/config dotenv_config_path=/.env",
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: "fork",
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
      node_args: "-r dotenv/config dotenv_config_path=/.env",
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: "fork",
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
