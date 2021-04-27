const { Router } = require("express");
const bodyParser = require("body-parser");
const app = require("../app");
const ValidationError = require("../validationError");

const router = new Router();

// TODO: necessary?
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
router.use(urlencodedParser);

router.get("/info", async (req, res) => {
  const allTransactions = await app.then((app) =>
    // TODO: id
    app.info({ user: req.session.userId })
  );
  // TODO: id
  const total = await app.then((app) => app.currentCash(req.session.userID));
  res.json({
    total: total.toFixed(2),
    transactions: allTransactions,
  });
});

router.get("/history", async (req, res) => {
  const history = await app.then((app) =>
      // TODO: id
    app.history({ user: req.session.userId })
  );
  const transactions = history.map((transaction) => {
    return {
      symbol: transaction.Symbol.symbol,
      name: transaction.Symbol.companyName,
      shares: transaction.shares,
      price: transaction.price,
      total: transaction.price * transaction.shares,
      time: transaction.time,
    };
  });
  res.json(transactions);
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  await app
    .then((app) => app.logIn({ login, password }))
    .then((result) => {
      // TODO: change with jwt cookie
      res.send(result.id);
    })
    .catch((err) => {
      res.status(401);
      res.set("WWW-Authenticate", "Bearer realm=jobbing.com");
      res.json({
        errors: [err.message],
      });
    });
});

router.post("/register", urlencodedParser, async (req, res) => {
  const { login, password, password_confirm } = req.body;

  await app
    .then((app) =>
      app.register({
        login: login,
        password: password,
        password_confirmation: password_confirm,
      })
    )
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch((err) => {
      let messages = [];
      if (err instanceof ValidationError) {
        messages = err.messages;
      } else {
        messages.push(err.message);
      }
      res.status(422);
      res.json({
        errors: messages,
      });
    });
});

module.exports = router;
