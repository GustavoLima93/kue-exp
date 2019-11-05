import kue from "kue";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import io from "socket.io-client";
import axios from "axios";

const queue = kue.createQueue();
const socket = io("http://localhost:3500");

queue
  .on("failed attempts", (messageError, doneAttempts) => {
    /** error */
  })
  .process("HealthCheck example", async (job, done) => {
    try {
      /** Values job */
      const { data } = job;
      const { url, dateInit } = data;

      const dateLast = format(
        new Date(),
        "'dia' dd 'de' MMMM', às ' H:mm:ss'h'",
        {
          locale: pt
        }
      );

      /** request axios */
      const request = await axios.get(`${job.data.url}`);

      /** socket emit */
      socket.emit("HealthCheck", {
        url,
        status: request.status,
        dateLast,
        dateInit: format(
          parseISO(dateInit),
          "'dia' dd 'de' MMMM', às ' H:mm:ss'h'",
          {
            locale: pt
          }
        )
      });

      done();
      return request.data;
    } catch (error) {
      /** Values job */
      const { data } = job;
      const { url } = data;

      /** socket emit */
      socket.emit("HealthCheck", { url, status: error.response.status });

      done(error);
    }
  });
