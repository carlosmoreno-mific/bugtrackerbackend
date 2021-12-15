export default interface IGenericRepository<Entity> {
  getAll(): Promise<Entity[]>;
  find(idEntity: number): Promise<Entity | null>;
  add(entity: Entity): Promise<number>;
  update(entity: Entity): Promise<number>;
  remove(idEntity: number): Promise<number>;
}
