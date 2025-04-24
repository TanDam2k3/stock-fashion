const authService = require('../services/authService');
const httpErrorService = require('../services/httpErrorService');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) res.status(400).json({ message: 'Please fill out the registration form completely.' });
    const auth = await authService.register(username, password, email);
    if (auth) {
      res.status(201).json(true);
    } else {
      res.status(400).json(false);
    }
  } catch (e) {
    await httpErrorService.create(e, 'Register');
    res.status(500).json({ message: e });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) res.status(400).json({ message: 'Please fill in all information.' });
    const token = await authService.login(username, password);
    if (token) {
      res.status(201).json({ token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (e) {
    await httpErrorService.create(e, 'Login');
    res.status(500).json({ message: e });
  }
};
