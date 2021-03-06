var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const mongoose = require("mongoose");

var Memory_rank = require("./models/Memory_rank.js");
var Tetris_rank = require("./models/Tetris_rank.js");
var Vote = require("./models/Vote.js");

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Ranking");

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Je suis connecté a mongoose");
});

router.route("/memory_rank/get").get((req, res) => {
  Memory_rank.find((err, item) => {
    if (err) console.log("erreur");
    else {
      res.json(item);
    }
  });
});

router.route("/memory_rank/:id").get((req, res) => {
  Memory_rank.findById(req.params.id, (err, item) => {
    if (err) console.log(err);
    else res.json(item);
  });
});

router.route("/memory_rank/update/:id").post((req, res) => {
  Memory_rank.findById(req.params.id, (err, item) => {
    if (!item) return next(new Error("Could not load Document"));
    else {
      item.id = req.body.id;
      item.name = req.body.name;
      item.guesses = req.body.guesses;

      item
        .save()
        .then(item => {
          res.json(item);
        })
        .catch(err => {
          res.status(400).send("Update failed");
        });
    }
  });
});

router.route("/memory_rank/add").post((req, res) => {
  let item = new Memory_rank(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({
        "Memory record": "Added successfully"
      });
    })
    .catch(err => {
      res.status(400).send("Failed to create new record");
    });
});

router.route("/tetris_rank/get").get((req, res) => {
  Tetris_rank.find((err, item) => {
    if (err) console.log("erreur");
    else {
      res.json(item);
    }
  });
});

router.route("/tetris_rank/add").post((req, res) => {
  let item = new Tetris_rank(req.body);
  item
    .save()
    .then(item => {
      res.status(200).json({
        "Tetris record": "Added successfully"
      });
    })
    .catch(err => {
      res.status(400).send("Failed to create new record");
    });
});

router.route("/corona/addvote").post((req, res) => {
  let item = new Vote(req.body);
  Vote.deleteMany({ from: item.from }, (err, item) => {});
  item
    .save()
    .then(item => {
      res.status(200).json({
        "Vote sauvé": "Added successfully"
      });
    })
    .catch(err => {
      res.status(400).send("Erreur sauvegarde vote");
    });
});

router.route("/corona/getvote").get((req, res) => {
  Vote.find({ to: "younes" }, (err, list1) => {
    nb_younes = list1.length;
    Vote.find({ to: "lucas" }, (err, list2) => {
      nb_lucas = list2.length;
      Vote.find({ to: "lapuerta" }, (err, list3) => {
        nb_lapuerta = list3.length;
        Vote.find({ to: "bau" }, (err, list4) => {
          nb_bau = list4.length;
          Vote.find({ to: "romain" }, (err, list5) => {
            nb_romain = list5.length;
            Vote.find({ to: "dudu" }, (err, list6) => {
              nb_dudu = list6.length;
              Vote.find({ to: "jerem" }, (err, list7) => {
                nb_jerem = list7.length;
                res.json({
                  nb_younes,
                  nb_lucas,
                  nb_lapuerta,
                  nb_bau,
                  nb_romain,
                  nb_dudu,
                  nb_jerem
                });
              });
            });
          });
        });
      });
    });
  });

  // Vote.find((err, item) => {
  //   if (err) console.log("erreur");
  //   else {
  //     let younes = res.json(item);
  //   }
  // });
});

app.use("/", router);

app.listen(4001, () => console.log("Serveur Express sur le port 4001"));
