class HttpError extends Error {
  constructor(message, errorStatus) {
    super(message);
    this.status = errorStatus;
  }
}

export default HttpError;
