import Chronometer from "../models/Chronometer";

class ChronometerController {
  async post(req, res) {
    try {
      const data = { ...req.body, userId: req.userId };

      const chronometer = await Chronometer.create(data);

      if (!chronometer) {
        return res.status(400).json({ errorMsg: "Something went wrong" });
      }

      return res.status(200).json(chronometer);
    } catch (e) {
      return res.status(400).json({ errorMsg: "Something went wrong" });
    }
  }

  async get(req, res) {
    try {
      const userId = req.userId;

      const chronometers = await Chronometer.findAll({
        where: {
          userId,
        },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(chronometers);
    } catch (e) {
      return res.status(400).json({ errorMsg: "Something went wrong" });
    }
  }

  async update(req, res) {
    try {
      let data = { ...req.body };
      const { id } = req.params;

      const chronometer = await Chronometer.findByPk(id);

      if (!chronometer) {
        return res.status(400).json({
          errorMsg: "The chronometer you're trying to update doesn't exist",
        });
      }

      await chronometer.update(data);

      return res.status(200).json(chronometer);
    } catch (e) {
      return res.status(400).json({ errorMsg: "Something went wrong" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const chronometer = await Chronometer.findByPk(id);

      if (!chronometer) {
        return res.status(400).json({
          errorMsg: "The chronometer you're trying to delete doesn't exist",
        });
      }

      await chronometer.destroy();

      return res.status(200).json({ msg: "Chronometer deleted successfully" });
    } catch (e) {
      return res.status(400).json({ errorMsg: "Something went wrong" });
    }
  }
}

export default new ChronometerController();
