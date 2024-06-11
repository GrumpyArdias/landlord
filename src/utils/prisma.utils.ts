import { PrismaClient } from "@prisma/client";

export class DBInstance {
  private static client: PrismaClient;

  static getClient(): PrismaClient {
    if (this.client) {
      return this.client;
    } else {
      this.client = new PrismaClient();
      return this.getClient();
    }
  }
}
