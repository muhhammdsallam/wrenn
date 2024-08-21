class AppError extends Error {
  constructor(message, statusCode, errorArr) {
    super(message);
    this.errorArr = errorArr;
    this.statusCode = statusCode;
  }
}

export default AppError;
