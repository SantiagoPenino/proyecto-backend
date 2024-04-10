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
        ? httpResponse.INTERNAL_SERVER_ERROR(res, "Error getting data")
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
        ? httpResponse.NOT_FOUND(res, "Error getting data")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.services.create(req.body);
      return !data
        ? httpResponse.NOT_FOUND(res, "Error creating data")
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
        return httpResponse.NOT_FOUND(res, "Error updating data");
      } else {
        const dataUpdated = await this.services.update(id, req.body);
        return httpResponse.OK(res, dataUpdated);
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
        return httpResponse.NOT_FOUND(res, "Error deleting data");
      } else {
        const dataRemoved = await this.services.delete(id);
        return httpResponse.OK(res, dataRemoved);
      }
    } catch (error) {
      next(error.message);
    }
  };
}
