import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;
  res.cookie(email, password, { maxAge: 60000 });
  res.redirect("/index");
});

export default router;
