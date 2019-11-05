import cron from "node-cron";
import kue from "kue";

const queue = kue.createQueue();

for (let index = 0; index < 10; index++) {
  const dateInit = new Date();
  queue
    .create("HealthCheck example", {
      url: "https://pokeapi.co/api/v2/pokemon/150",
      dateInit
    })
    .priority("low")
    .attempts(5)
    .save();
  console.log("FILA CRIADA");
}

// cron.schedule("* * * * * *", () => {
//   queue
//     .create("HealthCheck example", {
//       url: "https://pokeapi.co/api/v2/pokemon/150/"
//     })
//     .priority("low")
//     .attempts(5)
//     .save();
//   console.log("FILA CRIADA");
// });
