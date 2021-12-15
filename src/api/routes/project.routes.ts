import { Container } from "typedi";
import { Router, Request, Response } from "express";
import ProjectService from "../../services/project.service";
import { Project } from "../../models/Entities/Project";
import middleware from "../middlewares";

const router = Router();

export default (app: Router) => {
  app.use("/projects", middleware.auth);
  app.use("/projects", router);

  router.get("/", async (req: Request, res: Response) => {
    const projectInstance = Container.get(ProjectService);
    const projects = await projectInstance.getAll();
    return res.json(projects);
  });

  router.get("/:projectId", async (req: Request, res: Response) => {
    const projectInstance = Container.get(ProjectService);

    try {
      const project = await projectInstance.find(
        parseInt(req.params.projectId)
      );

      if (project) return res.status(200).json(project);

      return res.status(404).json({ message: "Projecto no encontrado" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error buscando proyecto", error });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    const projectInstance = Container.get(ProjectService);
    const project = { ...req.body } as Project;

    try {
      const result = await projectInstance.add(project);
      res.status(201);
      return res.json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error guardando proyecto", error });
    }
  });

  router.put("/:projectId", async (req: Request, res: Response) => {
    const projectInstance = Container.get(ProjectService);

    try {
      const result = await projectInstance.update({
        id: req.params.projectId,
        ...req.body,
      });
      res.status(200);
      return res.json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error actualizando proyecto", error });
    }
  });
};
