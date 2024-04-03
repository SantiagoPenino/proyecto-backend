export default class ViewControllers {
  login = (req, res) => {
    res.render("login");
  };
  register = (req, res) => {
    res.render("register");
  };
  profile = (req, res) => {
    const user = req.session.user;
    return user
      ? res.render("profile", { user, name: user.name })
      : res.redirect("/login-error");
  };
  errorRegister = (req, res) => {
    res.render("register-error");
  };
  errorLogin = (req, res) => {
    res.render("login-error");
  };
}
