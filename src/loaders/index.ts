import { Application } from "express";
import dependencyInjector from "./dependencyInjector";
import expressLoader from "./express";
import mssqlLoader from "./mssql";

export default async ({ expressApp }: { expressApp: Application }) => {
  //const mssqlConnection = await mssqlLoader();

  const projectModel = {
    name: "projectRepository",
    // Notice the require syntax and the '.default'
    repo: require("../models/Repositories/ProjectRepository").default,
  };

  await dependencyInjector({
    models: [projectModel],
  });

  await expressLoader({ app: expressApp });
};
