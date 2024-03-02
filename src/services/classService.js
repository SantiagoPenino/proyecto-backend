export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const response = await this.dao.getAll();
      return response || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      return response || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (item) => {
    try {
      const response = await this.dao.create(item);
      return response || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, item) => {
    try {
      const response = await this.dao.update(id);
      if (!response) return false;
      await this.dao.update(id, item);
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) return false;
      await this.dao.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
