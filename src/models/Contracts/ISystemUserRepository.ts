import { SystemUser } from "../Entities/SystemUser";
import IGenericRepository from "./IGenericRepository";

export default interface IProjectRepository
  extends IGenericRepository<SystemUser> {
  findByEmail(entity: SystemUser): Promise<SystemUser | null>;
  checkLogin(entity: SystemUser): Promise<SystemUser | null>;
}
