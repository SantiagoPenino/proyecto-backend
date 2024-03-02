import fs from "fs";

export default class ProductFsDao {
  constructor(path) {
    this.path = path;
  }

  #getMaxId = async () => {
    try {
      const items = await this.getAll();
      return items.reduce(
        (maxId, item) => (item.id > maxId ? item.id : maxId),
        0
      );
    } catch (error) {
      throw new Error("Error getting max id");
    }
  };

  getAll = async () => {
    try {
      return fs.existsSync(this.path)
        ? JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        : [];
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  };

  getById = async (id) => {
    try {
      const items = await this.getAll();
      const item = items.find((item) => item.id === id);
      return item || false;
    } catch (error) {
      throw new Error(`Error getting item by id: ${error.message}`);
    }
  };

  create = async (item) => {
    try {
      const items = await this.getAll();
      const newItem = { id: (await this.#getMaxId()) + 1, ...item };
      items.push(newItem);
      await fs.promises.writeFile(this.path, JSON.stringify(items));
      return newItem;
    } catch (error) {
      throw new Error(`Error creating item: ${error.message}`);
    }
  };

  update = async (item, id) => {
    try {
      const items = await this.getAll();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
      }
      items[index] = { ...item, id };
      await fs.promises.writeFile(this.path, JSON.stringify(items));
    } catch (error) {
      throw new Error(`Error updating item: ${error.message}`);
    }
  };

  delete = async (id) => {
    try {
      const items = await this.getAll();
      const newArray = items.filter((item) => item.id !== id);
      if (newArray.length === items.length) {
        throw new Error(`Item with ID ${id} not found`);
      }
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    } catch (error) {
      throw new Error(`Error deleting item: ${error.message}`);
    }
  };
}
