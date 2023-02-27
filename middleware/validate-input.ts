const { validationResult } = require('express-validator');

// validationResult: extracts the validation errors from a request and makes them available in a Result object.
export const validateInput = (req: Request, res: Response & { status: Function; }, next: () => void) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

