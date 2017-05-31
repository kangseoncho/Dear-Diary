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
        Entries.create({ user: req.body.user, password: req.body.password })
        //app wide declaration of user
        currentUser = req.body.user;
        return res.redirect('/welcome');
      }
    })
    return;
  },

  updateEntries(req, res) {
    //find user and save entry
    Entries.update({
      title: req.body.title,
      logTime: req.body.logTime,
      entry: req.body.entry
    }, {
        where: { user: currentUser, logTime: req.body.logTime } //got to check if logTime works
      }).then((result) => {
        //console.log("i am promise after updating user entry: ", result)
      })
    res.json(req.body);
  },

  getAllEntries(req, res) {
    Entries.findAll().then((result) => res.json(result));
  }
}

module.exports = entriesController;