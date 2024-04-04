const httpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

export class HttpResponse {
  OK(res, data) {
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "SUCCESS",
      data: data,
    });
  }
  NOT_FOUND(res, data) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: "NOT_FOUND",
      error: data,
    });
  }
  UNAUTHORIZED(res, data) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: httpStatus.UNAUTHORIZED,
      message: "UNAUTHORIZED",
      error: data,
    });
  }
  FORBIDDEN(res, data) {
    return res.status(httpStatus.FORBIDDEN).json({
      status: httpStatus.FORBIDDEN,
      message: "FORBIDDEN",
      error: data,
    });
  }
  INTERNAL_SERVER_ERROR(res, data) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "INTERNAL_SERVER_ERROR",
      error: data,
    });
  }
}
