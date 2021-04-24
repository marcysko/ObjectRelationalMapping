const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [Product]
  })
    .then(allCategories => res.json(allCategories))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [Product]
  })
  .then(allCategories => res.json(allCategories))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => res.json(newCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(updatedCategory => {
    if (!updatedCategory) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(updatedCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(updatedCategory => {
      if (!updatedCategory) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(updatedCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
