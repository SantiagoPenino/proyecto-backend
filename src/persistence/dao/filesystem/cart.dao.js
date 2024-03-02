import fs from "fs";

export default class CartFsDao {
  constructor(path) {
    this.path = path;
  }

  #getMaxId = async () => {
    try {
      return items.reduce((maxId, item) => Math.max(maxId, item.id), 0);
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
      throw new Error("Error getting items");
    }
  };

  getById = async (id) => {
    try {
      const items = await this.getAll();
      return items.find((item) => item.id === id) || false;
    } catch (error) {
      throw new Error(`Error getting item by id: ${error}`);
    }
  };

  create = async (item) => {
    try {
      const items = await this.getAll();
      const newItem = { id: (await this.#getMaxId(items)) + 1, ...item };
      items.push(newItem);
      await fs.promises.writeFile(this.path, JSON.stringify(items));
      return newItem;
    } catch (error) {
      throw new Error(`Error creating item: ${error}`);
    }
  };

  update = async (id, item) => {
    try {
      const items = await this.getAll();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
      }
      items[index] = { ...items, id };
      await fs.promises.writeFile(this.path, JSON.stringify(items));
    } catch (error) {
      throw new Error(`Error updating item: ${error}`);
    }
  };

  delete = async (id) => {
    try {
      const items = await this.getAll();
      const filteredItems = items.filter((item) => item.id !== id);
      if (filteredItems.length === items.length) {
        throw new Error(`Item with ID ${id} not found`);
      }
      await fs.promises.writeFile(this.path, JSON.stringify(filteredItems));
    } catch (error) {
      throw new Error(`Error deleting item: ${error}`);
    }
  };
}
