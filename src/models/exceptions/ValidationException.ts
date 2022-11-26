type ValidationExceptionArgs = {
  message: string;
  errors: string[];
};

class ValidationException {
  public message: string;

  public errors: string[];

  constructor({ message, errors }: ValidationExceptionArgs) {
    this.message = message;
    this.errors = errors;
  }
}

export { ValidationException, ValidationExceptionArgs };