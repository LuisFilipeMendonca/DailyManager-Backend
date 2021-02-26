import Contact from "../models/Contact";

class HomeController {
  async get(req, res) {
    try {
      const contact = await Contact.create({
        name: "Filipe",
        email: "filipe@teste.com",
      });

      return res.json(contact);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new HomeController();
