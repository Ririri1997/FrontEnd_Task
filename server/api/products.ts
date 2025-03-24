import { readFile } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async () => {
  try {
    const filePath = join(process.cwd(), "server/data/products.json");
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { error: "Не удалось загрузить данные" };
  }
});
