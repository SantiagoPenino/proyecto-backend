export default class ViewsController {
  login(req, res) {
    res.render("login");
  }
  register(req, res) {
    res.render("register");
  }
  profile(req, res) {
    const user = req.session.user;
    return user
      ? (console.log("Name:", user.name),
        res.render("profile", { user, name: user.name }))
      : res.redirect("/views/login-error");
  }
  errorRegister(req, res) {
    res.render("register-error");
  }
  errorLogin(req, res) {
    res.render("login-error");
  }
}
