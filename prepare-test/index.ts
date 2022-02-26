import { Connection, createConnection } from "typeorm";
import { ExceptionDataEntity } from "../src/exception-data.entity";

export class TestingHelper {
  private static connection: Connection;

  public static async getConnection() {
    if (!TestingHelper.connection) {
      console.log("getConnection");
      TestingHelper.connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "qwerty",
        database: "test",
        synchronize: true,
        logging: false,
        entities: ["src/**/*.entity.ts"],
      });
    }
    return TestingHelper.connection;
  }

  public static async close(): Promise<void> {
    if (this.connection) await this.connection.close();
  }
}
