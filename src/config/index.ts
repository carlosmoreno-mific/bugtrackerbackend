import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: process.env.PORT || "5000",

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MSSQLSERVER_URI || "",
  databasePort: parseInt(process.env.MSSQLSERVER_PORT || "1433"),
  databaseUser: process.env.MSSQLSERVER_USER || "",
  databasePassword: process.env.MSSQLSERVER_PASSWORD || "",
  databaseName: process.env.MSSQLSERVER_DATABASE || "",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "",

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: process.env.AGENDA_CONCURRENCY,
  },

  /**
   * Agendash config
   */
  agendash: {
    user: "agendash",
    password: "123456",
  },
  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
