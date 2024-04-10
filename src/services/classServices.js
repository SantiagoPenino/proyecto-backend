export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const data = await this.dao.getAll();
      return !data ? false : data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getById = async (id) => {
    try {
      const data = await this.dao.getById(id);
      return !data ? false : data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (obj) => {
    try {
      const newObj = await this.dao.create(obj);
      return !newObj ? false : newObj;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id, obj) => {
    try {
      const data = await this.dao.getById(id);
      if (!data) {
        return false;
      } else {
        const updateObj = await this.dao.update(id, obj);
        return updateObj;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  delete = async (id) => {
    try {
      const data = await this.dao.getById(id);
      if (!data) {
        return false;
      } else {
        const deleteObj = await this.dao.delete(id);
        return deleteObj;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
