import { Int, NVarChar } from "mssql";
import ISystemUserRepository from "../Contracts/ISystemUserRepository";
import { SystemUser } from "../Entities/SystemUser";
import connection from "../../loaders/mssql";
import { Service } from "typedi";
import { compare, genSalt, hash } from "bcrypt";

@Service("SystemUserRepository")
export default class SystemUserRepository implements ISystemUserRepository {
  private selectAll: string;
  private findQuery: string;
  private insert: string;
  private updateQuery: string;
  private delete: string;
  private findByEmailQuery: string;

  constructor() {
    this.selectAll = "SELECT * FROM Security.SystemUser";
    this.findQuery =
      "SELECT * FROM Security.SystemUser WHERE SystemUserId = @systemUserId";
    this.findByEmailQuery =
      "SELECT * FROM Security.SystemUser WHERE Email = @email";
    this.insert =
      "INSERT INTO Security.SystemUser (Name, Lastname, Email, Password) VALUES (@name, @lastname, @email, @password)";
    this.updateQuery =
      "UPDATE Security.SystemUser SET Name = @name, Lastname = @lastname, Email = @email, Password = @password WHERE SystemUserId = @systemUserId";
    this.delete =
      "DELETE FROM Security.SystemUser WHERE SystemUserId = @systemUserId";
  }
  public async checkLogin(entity: SystemUser): Promise<SystemUser | null> {
    const user = await this.findByEmail(entity);

    if (!user) return null;

    const passwordMatch = await this.passwordMatch(
      entity.Password,
      user.Password
    );

    if (passwordMatch) return user;

    return null;
  }

  public async findByEmail(entity: SystemUser): Promise<SystemUser | null> {
    const pool = await connection();
    const result = await pool
      .request()
      .input("email", NVarChar, entity.Email)
      .query(this.findByEmailQuery);

    if (result.recordset.length != 0) return result.recordset[0];

    return null;
  }

  public async getAll(): Promise<SystemUser[]> {
    const pool = await connection();
    const result = await pool.query(this.selectAll);
    if (result.rowsAffected) return result.recordset;

    return [];
  }

  public async find(idEntity: number): Promise<SystemUser | null> {
    const pool = await connection();
    const result = await pool
      .request()
      .input("systemUserId", Int, idEntity)
      .query(this.findQuery);

    if (result.recordset.length != 0) return result.recordset[0];

    return null;
  }

  public async add(entity: SystemUser): Promise<number> {
    const pool = await connection();

    // encrypting password
    const encryptedPassword = await this.hashPassword(entity.Password);

    const result = await pool
      .request()
      .input("name", NVarChar, entity.Name)
      .input("lastname", NVarChar, entity.Lastname)
      .input("email", NVarChar, entity.Email)
      .input("password", NVarChar, encryptedPassword)
      .query(this.insert);

    if (result.rowsAffected) return result.rowsAffected[0];

    return 0;
  }
  update(entity: SystemUser): Promise<number> {
    throw new Error("Method not implemented.");
  }
  remove(idEntity: number): Promise<number> {
    throw new Error("Method not implemented.");
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  private async passwordMatch(
    password: string,
    encrypted: string
  ): Promise<boolean> {
    return await compare(password, encrypted);
  }
}
