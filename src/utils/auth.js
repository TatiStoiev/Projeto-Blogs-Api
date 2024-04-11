const httpErrorMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  INVALID_VALUE: 400,
};

const mapStatusHttp = (status) => httpErrorMap[status] || 500;

module.exports = {
  mapStatusHttp,
};