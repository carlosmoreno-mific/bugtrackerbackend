import sql, { ConnectionPool } from "mssql";
import config from "../config";

const sqlConfig = {
  server: config.databaseURL,
  port: config.databasePort,
  user: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export default async (): Promise<ConnectionPool> => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    const connection = new ConnectionPool(sqlConfig).connect();
    return connection;
  } catch (err) {
    throw new Error(`Error connecting to database: ${err}`);
  }
};
