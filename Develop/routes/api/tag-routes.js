const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      res.status(500).json(err); // Handle errors with a 500 status code
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'tag not found' }); 
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      res.status(500).json(err); // Handle errors with a 500 status code
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name, 
  })
    .then((newTag) => {
      res.status(201).json(newTag); // Send 201 status code for successful creation
    })
    .catch((err) => {
      res.status(500).json(err); // Handle errors with a 500 status code
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    { tag_name: req.body.tag_name },
    {
      where: { id: req.params.id },
    }
  )
    .then((updatedTag) => {
      if (updatedTag[0] === 0) {
        res.status(404).json({ message: 'Tag not found' }); 
        return;
      }
      res.json(updatedTag);
    })
    .catch((err) => res.status(500).json(err)); // Handle errors with a 500 status code
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      if (!deletedTag) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json(deletedTag);
    })
    .catch((err) => res.status(500).json(err)); // Handle errors with a 500 status code
});
module.exports = router;
