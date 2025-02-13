import CategoryModel from "../../database/models/category.model.js";
import { HTTP_CODES } from "../../utils/constants.js";


const { SUCCESS, CREATE, CONFLICT, UNAUTHORIZE } = HTTP_CODES;

const categoryController = {
  /**
   * @route GET /categories
   * @desc fetch categories
   * @access Private
   */
  async find(req, res) {
    try {
      const categories = await CategoryModel.find();
      return res.status(SUCCESS).json(categories);
    } catch (error) {
      console.log("API: categories find error", error.message);
      throw new Error(error.message);
    }
  },
  
};

export default categoryController;
