const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Find all categories and include their associated Products
  Category.findAll({
    include: [Product],
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      res.status(500).json(err); // Handle errors with a 500 status code
    });
});

router.get('/:id', (req, res) => {
  // Find one category by its `id` value and include associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [Product],
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      res.status(500).json(err); // Handle errors with a 500 status code
    });
});

router.post('/', (req, res) => {
  // Create a new category
  Category.create({
    category_name: req.body.category_name, 
  })
    .then((newCategory) => {
      res.status(201).json(newCategory); // Send 201 status code for successful creation
    })
    .catch((err) => {
      res.status(500).json(err); // Handle errors with a 500 status code
    });
});

router.put('/:id', (req, res) => {
  // Update a category by its `id` value
  Category.update(
    { category_name: req.body.category_name },
    {
      where: { id: req.params.id },
    }
  )
    .then((updatedCategory) => {
      if (updatedCategory[0] === 0) {
        res.status(404).json({ message: 'Category not found' }); 
        return;
      }
      res.json(updatedCategory);
    })
    .catch((err) => res.status(500).json(err)); // Handle errors with a 500 status code
});

router.delete('/:id', (req, res) => {
  // Delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        res.status(404).json({ message: 'Category not found' }); 
        return;
      }
      res.json(deletedCategory);
    })
    .catch((err) => res.status(500).json(err)); // Handle errors with a 500 status code
});

module.exports = router;
