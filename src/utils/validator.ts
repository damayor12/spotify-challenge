const whiteListedChars =
  'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789. ';
import validator from 'validator';

export const validate = (input: string) =>
  validator.whitelist(input, whiteListedChars);
