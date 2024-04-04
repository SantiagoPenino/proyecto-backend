import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();

export default class Controllers {
  constructor(services) {
    this.services = services;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.services.getAll();
      return !data
        ? httpResponse.INTERNAL_SERVER_ERROR(res, "Error getting items")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.services.getById(id);
      return !data
        ? httpResponse.NOT_FOUND(res, "Error getting item")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.services.create(req.body);
      return !data
        ? httpResponse.NOT_FOUND(res, "Error creating item")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.services.getById(id);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Error updating item");
      } else {
        const itemUpdated = await this.services.update(id, req.body);
        return httpResponse.OK(res, itemUpdated);
      }
    } catch (error) {
      next(error.message);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.services.getById(id);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Error deleting item");
      } else {
        const itemRemoved = await this.services.delete(id);
        return httpResponse.OK(res, itemRemoved);
      }
    } catch (error) {
      next(error.message);
    }
  };
}
