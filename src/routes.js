import kue from "kue";
import { Router } from "express";

const routes = new Router();

routes.use("/kue-api", kue.app);

routes.get("/", (req, res) => {
  res.render("index.html");
});

export default routes;
