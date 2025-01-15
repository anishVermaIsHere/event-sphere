import createDBModel from "../../utils/create-model.js";

const categorySchema = {
  name: { type: String, required: [true, "Please provide category name"] },
  slug: { type: String, index: true, required: true },
};

const CategoryModel = createDBModel(categorySchema, "Categories");

export default CategoryModel;
