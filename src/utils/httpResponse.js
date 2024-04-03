const httpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

export const dictionary = {
  ERROR_CREATE_ITEM: "Error creating item",
  ERROR_UPDATE_ITEM: "Error updating item",
  ERROR_DELETE_ITEM: "Error deleting item",
  ERROR_ADD_ITEM_TO_CART: "Error adding item to cart",
  ERROR_DELETE_ITEM_TO_CART: "Error deleting item to cart",
  ERROR_CREATE_USER: "Error creating user",
  ERROR_LOGIN_USER: "Error login user",
  ERROR_DELETE_CART: "Error deleting cart",
  ERROR_FIND_ITEM: "Error finding item",
  ERROR_TOKEN: "Error token",
  ERROR_PASSWORD: "Error password",
  ERROR_GET_ALL: "Error getting all",
};

export class HttpResponse {
  OK(res, data) {
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Success",
      data: data,
    });
  }
  NOT_FOUND(res, data) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: "Not Found",
      error: data,
    });
  }
  UNAUTHORIZED(res, data) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: httpStatus.UNAUTHORIZED,
      message: "Unauthorized",
      error: data,
    });
  }
  FORBIDDEN(res, data) {
    return res.status(httpStatus.FORBIDDEN).json({
      status: httpStatus.FORBIDDEN,
      message: "Forbidden",
      error: data,
    });
  }
  INTERNAL_SERVER_ERROR(res, data) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: data,
    });
  }
}
