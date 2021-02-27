class HomeController {
  async get(req, res) {
    return res.status(200).send("Welcome to DailyManager API");
  }
}

export default new HomeController();
