const express = require('express');
const Cat = require('../models/cat');
const router = new express.Router();

router.post('/cats', async (req, res) => {
  const cat = new Cat(req.body);

  try {
    await cat.save();
    res.status(201).send(cat);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/cats', async (req, res) => {
  try {
    const cats = await Cat.find({});
    res.send(cats);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/cats/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const cat = await Cat.findById(_id);

    if (!cat) {
      return res.status(404).send({ error: 'No cat found!' });
    }

    res.send(cat);
  } catch (e) {
    res.status(500).send();
  }
});

router.put('/cats/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'breed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const cat = await Cat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cat) {
      return res.status(404).send();
    }

    res.send(cat);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/cats/:id', async (req, res) => {
  try {
    const cat = await Cat.findByIdAndDelete(req.params.id);

    if (!cat) {
      return res.status(404).send({ error: 'No cat found!' });
    }

    res.send(cat);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
