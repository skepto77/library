const authUser = async (req, res) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' });
};

export { authUser };
