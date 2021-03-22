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
        let data = { ...req.body, userId: req.userId };

        if (req.file) {
          data = { ...data, photo: req.file.filename };
        }

        const contact = await Contact.create(data);

        if (!contact) {
          return res.status(400).json({ errorMsg: "Something went wrong" });
        }

        const { id, name, email, phone, address, photo, photoUrl } = contact;

        return res
          .status(200)
          .json({ id, name, email, phone, address, photo, photoUrl });
      } catch (e) {
        console.log(e);
      }
    });
  }

  async get(req, res) {
    try {
      const userId = req.userId;

      const contacts = await Contact.findAll({
        where: { userId },
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "address",
          "photo",
          "photoUrl",
        ],
      });

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

        const { id: contactId } = req.params;

        if (req.file) {
          data = { ...data, photo: req.file.filename };
        }

        const contact = await Contact.findByPk(contactId);

        if (!contact) {
          return res.status(400).json({
            errorMsg: "The contact you're trying to update doesn't exist",
          });
        }

        const updatedContact = await contact.update(data);
        const {
          name,
          email,
          phone,
          address,
          photo,
          photoUrl,
          id,
        } = updatedContact;

        return res
          .status(200)
          .json({ id, name, email, phone, address, photo, photoUrl });
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
