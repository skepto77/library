import User from '../models/users.js';

const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  try {
    const user = await User.findById(id).select('-__v');
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `Пользователь не найден` });
  }
};

export { getUserById };
