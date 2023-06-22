const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require("../models/baker.js");

// in the new route
breads.get("/new", (req, res) => {
  Baker.find().then((foundBakers) => {
    res.render("new", {
      bakers: foundBakers,
    });
  });
});

// Index:
breads.get("/", async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(2).lean()
  res.render("index", {
    breads: foundBreads,
    bakers: foundBakers,
    title: "Index Page",
  });
});
//.then

//EDIT
breads.get("/:id/edit", (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.findById(req.params.id).then((foundBread) => {
      res.render("edit", {
        bread: foundBread,
        bakers: foundBakers,
      });
    });
  });
});

//SHOW
breads.get("/:id", (req, res) => {
  // res.send(Bread[req.params.arrayIndex])
  Bread.findById(req.params.id)
    .populate("baker")
    .then((foundBread) => {
      const bakedBy = foundBread.getBakedBy();
      console.log(bakedBy);
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send(`<h1>This is not a page you should on</h1>`);
    });
});

// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

//CREATE
breads.post("/", express.urlencoded({ extended: true }), (req, res) => {
  //console.log(req.body)

  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = "true";
  } else {
    req.body.hasGluten = "false";
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
breads.put("/:id", express.urlencoded({ extended: true }), (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBread) => {
      console.log(updatedBread);
      res.redirect(`/breads/${req.params.id}`);
    }
  );
});

module.exports = breads;