const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

//not working
// exports.updateCategory = (req, res) => {
//     const category = req.category;
//     category.name = req.body.name;

//     category.save((err, updatedCategory) => {
//         if(err) {
//             return res.status(400).json({
//                 error: "Failed to update category"
//             });
//         }
//         res.json(updatedCategory);
//     });
// }

//this one works
exports.updateCategory = (req, res) => {
  const category = req?.category;
  if (!req.body.name) return res.send("Please send name");
  if (!category?.name) return res.send("No category found");

  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err || !updatedCategory) {
      console.log(err);
      return res.status(400).json({
        error: "Failed to Update Category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req?.category;

  category.remove((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: `Deleted category successfully: ${category.name}`,
    });
  });
};
