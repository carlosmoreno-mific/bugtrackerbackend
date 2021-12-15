import { Project } from "../Entities/Project";
import IGenericRepository from "./IGenericRepository";

export default interface IProjectRepository
  extends IGenericRepository<Project> {}
