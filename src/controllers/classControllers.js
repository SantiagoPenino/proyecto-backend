import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();

export default class Controllers {
  constructor(services) {
    this.services = services;
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.services.getAll();
      return !items
        ? httpResponse.INTERNAL_SERVER_ERROR(res, dictionary.ERROR_GET_ALL)
        : httpResponse.OK(res, items);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.services.getById(id);
      return !item
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_FIND_ITEM)
        : httpResponse.OK(res, item);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const item = await this.services.create(req.body);
      return !item
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_CREATE_ITEM)
        : httpResponse.OK(res, item);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      let item = await this.services.getById(id);
      if (!item) {
        return httpResponse.NOT_FOUND(res, dictionary.ERROR_FIND_ITEM);
      } else {
        const itemUpdated = await this.services.update(id, req.body);
        return httpResponse.OK(res, itemUpdated);
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      let item = await this.services.getById(id);
      if (!item) {
        return httpResponse.NOT_FOUND(res, dictionary.ERROR_FIND_ITEM);
      } else {
        const itemRemoved = await this.services.delete(id);
        return httpResponse.OK(res, itemRemoved);
      }
    } catch (error) {
      next(error);
    }
  };
}
