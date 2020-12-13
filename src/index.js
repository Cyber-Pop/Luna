const Sharder = require('eris-sharder').Master;
const sharder = new Sharder(process.env.BOT_TOKEN, "/src/main.js", {
  stats: true,
  debug: true,
  guildsPerShard: 1500,
  name: "Luna",
  webhooks: {
    shard: {
      id: "786497820198043649",
      token: "ww3qH3xKKYn2NttmUx4dPNMWy2nol-56NrCRta9tMBysP7cvCfQunNnRhywnVHXd3N5M"
    },
     cluster: {
      id: "786498778974519316",
      token: "MvJRfyVW2UZvozbmE62TYDKb__cNzmYw7cwdbosQI7Ex-Lwv3TXuTjdo6M1X-Hr2sakX"
    }
  },
  clientOptions: {
      messageLimit: 0,
      disableEveryone: true
  }
});

sharder.on("stats", stats => {
  console.log(stats);
});