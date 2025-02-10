import crypto from "crypto";

export const generateToken = () => crypto.randomBytes(32).toString('hex');

export const generatePassCode = (length = 6) => {
    const digits = "0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, digits.length);
      code += digits[randomIndex];
    }
    return code;
};
  