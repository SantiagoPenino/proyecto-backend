export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const items = await this.dao.getAll();
      return !items ? false : items;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      return !item ? false : item;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (obj) => {
    try {
      const item = await this.dao.create(obj);
      return !item ? false : item;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id, obj) => {
    try {
      let item = await this.dao.getById(id);
      return !item ? false : await this.dao.update(id, obj);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  delete = async (id) => {
    try {
      let item = await this.dao.getById(id);
      return !item ? false : await this.dao.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
