import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      return !items
        ? httpResponse.ServerError(res, dictionary.ERROR_GET_ALL)
        : httpResponse.OK(res, items);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      return !item
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_FIND_ITEM)
        : httpResponse.OK(res, item);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      return !response
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_CREATE_ITEM)
        : httpResponse.OK(res, response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      return !response
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_UPDATE_ITEM)
        : await this.service
            .update(id, req.body)
            .then((updateItem) => httpResponse.Ok(res, updateItem));
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      const itemUpdated = !response
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_ITEM)
        : await this.service.remove(id);

      return !item
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_ITEM)
        : httpResponse.OK(res, itemUpdated);
    } catch (error) {
      next(error);
    }
  };
}
