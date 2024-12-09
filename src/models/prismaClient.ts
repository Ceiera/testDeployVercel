import { PrismaClient } from "../../node_modules/prisma/prisma-client/";

const prismaClient = new PrismaClient();

async () => {
  try {
    prismaClient.$connect();
  } catch (error) {
    console.log(error);
  }
};

export default prismaClient;
