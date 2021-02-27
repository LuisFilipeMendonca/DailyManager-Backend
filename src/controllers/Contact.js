import Contact from "../models/Contact";
import multer from "multer";

import multerConfig from "../config/multer";

const upload = multer(multerConfig).single("contactPhoto");

class ContactController {
  async post(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        // NEEDS UPDATE
        return res.status(400).json({ errorMsg: err.code });
      }

      try {
        let data = { ...req.body, userId: 1 };

        if (req.file) {
          data = { ...data, photo: req.file.filename };
        }

        const contact = await Contact.create(data);

        if (!contact) {
          return res.status(400).json({ errorMsg: "Something went wrong" });
        }

        return res.status(200).json(contact);
      } catch (e) {
        console.log(e);
      }
    });
  }

  async get(req, res) {
    try {
      const { userId } = req.params;

      const contacts = await Contact.findAll({ where: { userId } });

      return res.status(200).json(contacts);
    } catch (e) {
      console.log(e);
    }
  }

  async update(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        // NEEDS UPDATE
        return res.status(400).json({ errorMsg: err.code });
      }

      try {
        let data = { ...req.body };

        const { id } = req.params;

        if (req.file) {
          data = { ...data, photo: req.file.filename };
        }

        const contact = await Contact.findByPk(id);

        if (!contact) {
          return res.status(400).json({
            errorMsg: "The contact you're trying to update doesn't exist",
          });
        }

        await contact.update(data);

        return res.status(200).json(contact);
      } catch (e) {
        console.log(e);
      }
    });
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const contact = await Contact.findByPk(id);

      if (!contact) {
        return res.status(400).json({
          errorMsg: "The contact you're trying to delete doesn't exist",
        });
      }

      await contact.destroy();

      return res.status(200).json({ msg: "Contact deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ContactController();
