import UserService from '../services/UserService';
import UnauthorizedError from '../error/error';

const UserController = {
  async store(req, res) {
    try {
      const { id, name, email } = await UserService.create(req.body);
      return res.status(201).json({ id, name, email });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id, name, email } = await UserService.update(req.body);
      return res.json({ id, name, email });
    } catch (error) {
      let code = 400;
      if (error instanceof UnauthorizedError) code = error.statusCode();
      return res.status(code).json({ error: error.message });
    }
  },
};

export default UserController;
