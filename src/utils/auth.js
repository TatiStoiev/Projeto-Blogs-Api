const httpErrorMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  INVALID_VALUE: 400,
  NOT_FOUND: 401,
  EXPIRED_OR_INVALID: 401,
};

const mapStatusHttp = (status) => httpErrorMap[status] || 500;

module.exports = {
  mapStatusHttp,
};