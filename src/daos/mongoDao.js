export default class MongoDao {
  constructor(model) {
    this.model = model;
  }

  create = async (obj) => {
    try {
      const newObj = await this.model.create(obj);
      return newObj;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  getAll = async () => {
    try {
      const data = await this.model.find({});
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getById = async (id) => {
    try {
      const data = await this.model.findById(id);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  update = async (id, obj) => {
    try {
      const data = await this.model.findByIdAndUpdate(id, obj, { new: true });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  delete = async (id) => {
    try {
      const data = await this.model.findByIdAndDelete(id);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
