import { Int, NVarChar } from "mssql";
import IProjectRepository from "../Contracts/IProjectRepository";
import { Project } from "../Entities/Project";
import connection from "../../loaders/mssql";
import { Service } from "typedi";
import mssql from "../../loaders/mssql";

@Service("ProjectRepository")
export default class ProjectRepository implements IProjectRepository {
  private selectAll: string;
  private findQuery: string;
  private insert: string;
  private updateQuery: string;
  private delete: string;

  constructor() {
    this.selectAll = "SELECT * FROM Task.Project";
    this.findQuery = "SELECT * FROM Task.Project WHERE ProjectId = @projectId";
    this.insert =
      "INSERT INTO Task.Project (Name, Description) VALUES (@name, @description)";
    this.updateQuery =
      "UPDATE Task.Project SET Name = @name, Description = @description WHERE ProjectId = @projectId";
    this.delete = "DELETE FROM Task.Project WHERE ProjectId = @projectId";
  }

  public async add(entity: Project): Promise<number> {
    const pool = await connection();
    var result = await pool
      .request()
      .input("name", NVarChar, entity.Name)
      .input("description", NVarChar, entity.Description)
      .query(this.insert);

    if (result.rowsAffected) return result.rowsAffected[0];

    return 0;
  }

  public async update(entity: Project): Promise<number> {
    const pool = await connection();
    var result = await pool
      .request()
      .input("projectId", Int, entity.Id)
      .input("name", NVarChar, entity.Name)
      .input("description", NVarChar, entity.Description)
      .query(this.updateQuery);

    if (result.rowsAffected) return result.rowsAffected[0];

    return 0;
  }

  public async remove(idEntity: number): Promise<number> {
    throw new Error("Method not implemented.");
  }

  public async getAll(): Promise<Project[]> {
    const pool = await connection();
    const result = await pool.query(this.selectAll);
    if (result.rowsAffected) return result.recordset;

    return [];
  }

  public async find(idEntity: number): Promise<Project | null> {
    const pool = await connection();
    const result = await pool
      .request()
      .input("projectId", Int, idEntity)
      .query(this.findQuery);

    if (result.recordset.length != 0) return result.recordset[0];

    return null;
  }
}
