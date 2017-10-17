// homepage controller
exports.homepage = (req, res) => {
  res.render("index", {
    title: "Welcome to the food club!"
  });
};

// show the add store view
exports.addStore = (req, res) => {
  res.render("editStore", {
    title: "Add Store"
  });
};


// saves a store to the DB
exports.saveStore = (req, res) => {
  res.json(req.body);
};
