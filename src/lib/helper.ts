import { Prisma } from "@prisma/client";

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const waitFor = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const throwPrismaErrors = (e: unknown, input?: any) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2000") {
      throw e;
    }
    if (e.code === "P2001") {
      throw new Error(`Record not found..!`);
    }
    if (e.code === "P2002") {
      if (input) {
        for (const key in input) {
          if (e.meta?.target?.toString().includes(key)) {
            throw new Error(
              `Unique constraint violation..!, A new user cannot be created with this ${key}`,
            );
          }
        }
      } else {
        throw e;
      }
    }
  }
};
