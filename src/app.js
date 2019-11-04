import express from "express";
import path from "path";
import ejs from "ejs";

import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.static(path.join(__dirname, "public")));
    this.server.set("views", path.join(__dirname, "public"));
    this.server.engine("html", ejs.renderFile);
    this.server.set("view engine", "html");
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
