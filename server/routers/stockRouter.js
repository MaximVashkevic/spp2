const { Router } = require("express");
const app = require("../app");

const stockRouter = new Router();

stockRouter.get("/search", async (req, res) => {
  const query = req.query.query;
  const results = await app.then((app) => app.search(query));
  res.json(results);
});

stockRouter.get("/:symbol", cors(corsOptions), async (req, res) => {
  let symbol = req.params.symbol;
  // TODO: id
  let info = await app.then((app) =>
    app.getStockInfo(symbol, req.session.userId)
  );
  res.render(info);
});

stockRouter.post("/buy", async (req, res) => {
  const symbol = req.body.symbol;
  const amount = req.body.amount;
  await app
    // TODO: id
    .then((app) => app.buy({ symbol, amount, user: req.session.userId }))
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(() => {
      res.status(422);
      res.json({ errors: ["Can't buy shares"] });
    });
});

stockRouter.post("/sell", async (req, res) => {
  const symbol = req.body.symbol;
  const amount = req.body.amount;
  await app
    // TODO: id
    .then((app) => app.sell({ symbol, amount, user: req.session.userId }))
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(() => {
      res.status(422);
      res.json({ errors: ["Can't sell shares"] });
    });
});

module.exports = stockRouter;
