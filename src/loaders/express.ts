import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import morgan from "morgan";
import config from "../config";
import routes from "../api";

export default ({ app }: { app: express.Application }) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      name: "BugTracker",
      author: "Carlos Moreno",
      description:
        "Una aplicacion para gestionar el seguimiento de errores en tus proyectos.",
      version: 1.0,
    });
  });

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.head("/status", (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  //Load api
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    var err = { message: "Not found", status: 404 };
    next(err);
  });

  /// error handlers
  app.use(((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  }) as ErrorRequestHandler);

  app.use(((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  }) as ErrorRequestHandler);
};
