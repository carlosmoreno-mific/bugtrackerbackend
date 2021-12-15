import { Inject, Service } from "typedi";
import { Project } from "../models/Entities/Project";
import ProjectRepository from "../models/Repositories/ProjectRepository";

@Service()
export default class ProjectService {
  constructor(
    @Inject("ProjectRepository") public projectRepository: ProjectRepository
  ) {}

  public async getAll(): Promise<Project[]> {
    return await this.projectRepository.getAll();
  }

  public async add(project: Project): Promise<number> {
    return await this.projectRepository.add(project);
  }

  public async update(project: Project): Promise<number> {
    return await this.projectRepository.update(project);
  }

  public async find(idProject: number): Promise<Project | null> {
    return await this.projectRepository.find(idProject);
  }
}
