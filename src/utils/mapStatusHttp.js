const httpError = {
  SUCCESSFUL: 200, 
  CREATED: 201, 
  INVALID_VALUE: 400,
}; 

const mapStatusHttp = (status) => httpError[status];

module.exports = {
  mapStatusHttp,
};