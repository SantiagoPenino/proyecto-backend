import * as service from "../services/userService.js";

export const create = async (req, res, next) => {
  try {
    const user = await service.create(req.body);
    if (!user) res.status(400).json({ error: "User not created" });
    res.redirect("/index");
  } catch (error) {
    next(error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email, password);
    if (user) {
      req.session.email = email;
      req.session.password = password;
      res.redirect("/index");
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    next(error.message);
  }
};

export const findByEmail = async (req, res, next) => {
  try {
    const user = await service.findByEmail(req.body);
    if (!user) res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    next(error.message);
  }
};
