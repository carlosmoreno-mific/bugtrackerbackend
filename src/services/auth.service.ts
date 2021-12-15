import { Inject, Service } from "typedi";
import { SystemUser } from "../models/Entities/SystemUser";
import SystemUserRepository from "../models/Repositories/SystemUserRepository";
import { sign, SignOptions } from "jsonwebtoken";
import config from "../config";

@Service()
export default class AuthService {
  constructor(
    @Inject("SystemUserRepository")
    public systemUserRepository: SystemUserRepository
  ) { }

  public async getAll(): Promise<SystemUser[]> {
    return await this.systemUserRepository.getAll();
  }

  public async add(systemUser: SystemUser): Promise<number> {
    return await this.systemUserRepository.add(systemUser);
  }

  public async find(idSystemUser: number): Promise<SystemUser | null> {
    return await this.systemUserRepository.find(idSystemUser);
  }

  public async checkLogin(systemUser: SystemUser): Promise<{ token: string | null, user: SystemUser | null }> {
    const user = await this.systemUserRepository.checkLogin(systemUser);
    if (!user) return { token: null, user }
    return { token: this.generateToken(user), user };
  }

  private generateToken(user: SystemUser) {
    const options: SignOptions = { expiresIn: "2h" };
    const token = sign({ userId: user.Id }, config.jwtSecret, options);
    return token;
  }
}
