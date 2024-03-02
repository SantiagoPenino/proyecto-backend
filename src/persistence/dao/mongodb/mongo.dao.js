export default class MongoDao {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  };
  update = async (id, data) => {
    try {
      return await this.model.updateOne({ _id: id }, data);
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  };
}
