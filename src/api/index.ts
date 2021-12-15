import { Router } from "express";
import project from "./routes/project.routes";
import auth from "./routes/auth.routes";

export default () => {
  const app = Router();

  auth(app);
  project(app);

  return app;
};
