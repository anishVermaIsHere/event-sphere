import { hashSync, compareSync } from "bcrypt";
import AppConfig from "../config/app.config.js";

const encrypt = {
  SALT: parseInt(AppConfig.salt),
  hashPassword(plainPassword) {
    return hashSync(plainPassword, this.SALT);
  },
  comparePassword(plainPassword, dbPassword) {
    return compareSync(plainPassword, dbPassword);
  },
};

export default encrypt;
