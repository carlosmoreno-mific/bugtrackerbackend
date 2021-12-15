import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { SystemUser } from "../../models/Entities/SystemUser";
import AuthService from "../../services/auth.service";

const router = Router();

export default (app: Router) => {
  app.use(router);

  router.post("/login", async (req: Request, res: Response) => {
    const authInstance = Container.get(AuthService);
    const user = { ...req.body } as SystemUser;

    try {
      const { user: userFound, token } = await authInstance.checkLogin(user);

      if (!userFound) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      return res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      return res.status(500).json({ message: "Error iniciando sesion", error });
    }
  });

  router.post("/signup", async (req: Request, res: Response) => {
    const authInstance = Container.get(AuthService);
    const user = { ...req.body } as SystemUser;

    try {
      const result = await authInstance.add(user);
      res.status(201);
      return res.json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error registrando nuevo usuario", error });
    }
  });
};
