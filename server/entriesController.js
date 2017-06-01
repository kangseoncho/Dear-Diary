const Entries = require('./database');

const entriesController = {
  verification(req, res) {
    console.log("i am res.body from verification", req.body);
    Entries.findOne({ where: { user: req.body.user, password: req.body.password } }).then(entry => {
      if (entry === null) {
        // console.log("i am null entry: ", entry);
        return res.redirect('/');
      } else {
        // console.log("i am entry: ", entry);
        currentUser = req.body.user;
        currentPassword = req.body.password;
        return res.redirect('/welcome');
      }
    })
    return
  },

  newUser(req, res) {
    console.log("i am res.body from newuser", req.body)
    //find if user already exist, if so, do not make new DB entry
    Entries.findOne({ where: { user: req.body.user } }).then(entry => {
      if (entry) {
        // console.log("i am entry and i found stuff: ", entry);
        return res.redirect('/');
      } else {
        // console.log("i am entry and didnt find stuff: ", entry)
        //new user, therefore make new entry
        Entries.create({
          user: req.body.user,
          password: req.body.password
        })
        //app wide declaration of user
        currentUser = req.body.user;
        currentPassword = req.body.password;
        return res.redirect('/welcome');
      }
    })
    return;
  },

  updateEntries(req, res) {
    Entries.findOne({ where: { user: req.body.user, logTime: req.body.logTime } }).then(entry => {
      if (entry === null) {
        Entries.create({
          user: req.body.user,
          password: currentPassword,
          title: req.body.title,
          logTime: req.body.logTime,
          entry: req.body.entry
        }).then(result => {
          res.json(req.body);
        })
        return
      } else {
        Entries.update({
          title: req.body.title,
          logTime: req.body.logTime,
          entry: req.body.entry
        }, { where: { user: req.body.user, logTime: req.body.logTime }}).then(result => {
          res.json(req.body);
        })
        return
      }
    })
    return;
  },

  getAllEntries(req, res) {
    Entries.findAll().then((entries) => {
      //console.log("i am findAll: ", entries)
      res.json(entries)
    });
  },

  findEntries(req, res) {

  }
}

module.exports = entriesController;