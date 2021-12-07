import { createConnection, Connection, Schema } from "mongoose";

export interface ReturnState<T> {
  success: boolean;
  data?: T | T[];
}

export default class Database implements IDatabase {
  private connection: null | Connection;

  constructor() {
    this.connection = null;
  }

  connect(uri: string, dbName: string): Connection | null {
    if (this.connection) {
      return this.connection;
    }
    try {
      this.connection = createConnection(uri, { dbName });
      return this.connection;
    } catch (error) {
      //TODO db connection error log만들기
      return null;
    }
  }

  async create<T>({
    document,
    modelName,
    modelSchema,
  }: {
    document: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> {
    if (!this.connection) {
      return { success: false };
    }
    try {
      const model = this.connection.model(modelName, modelSchema);
      await model.create(document);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  async find<T>({
    filter,
    modelName,
    modelSchema,
  }: {
    filter: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> {
    if (!this.connection) {
      return { success: false };
    }
    try {
      const model = this.connection.model(modelName, modelSchema);
      const data = await model.find(filter);
      return { success: true, data: data as unknown as T[] };
    } catch (error) {
      return { success: true };
    }
  }

  async deleteOne<T>({
    filter,
    modelName,
    modelSchema,
  }: {
    filter: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> {
    if (!this.connection) {
      return { success: false };
    }
    try {
      const model = this.connection.model(modelName, modelSchema);
      await model.deleteOne(filter);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  async findById<T>({
    id,
    modelName,
    modelSchema,
  }: {
    id: string;
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> {
    if (!this.connection) {
      return { success: false };
    }
    try {
      const model = this.connection.model(modelName, modelSchema);
      const data = await model.findById(id);
      return { success: true, data: data as unknown as T };
    } catch (error) {
      return { success: false };
    }
  }

  async findByIdAndUpdate<T>({
    id,
    update,
    modelName,
    modelSchema,
  }: {
    id: string;
    update: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> {
    if (!this.connection) {
      return { success: false };
    }
    try {
      const model = this.connection.model(modelName, modelSchema);
      const data = await model.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });
      return { success: true, data: data as unknown as T };
    } catch (error) {
      return { success: false };
    }
  }
}

export interface IDatabase {
  connect: (uri: string, dbName: string) => null | Connection;
  create: <T>({
    document,
    modelName,
    modelSchema,
  }: {
    document: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }) => Promise<ReturnState<T>>;
  find: <T>({
    filter,
    modelName,
    modelSchema,
  }: {
    filter: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }) => Promise<ReturnState<T>>;
  deleteOne: <T>({
    filter,
    modelName,
    modelSchema,
  }: {
    filter: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }) => Promise<ReturnState<T>>;
  findById: <T>({
    id,
    modelName,
    modelSchema,
  }: {
    id: string;
    modelName: string;
    modelSchema: Schema;
  }) => Promise<ReturnState<T>>;
  findByIdAndUpdate: <T>({
    id,
    update,
    modelName,
    modelSchema,
  }: {
    id: string;
    update: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }) => Promise<ReturnState<T>>;
}
