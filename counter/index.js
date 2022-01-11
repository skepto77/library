import express from 'express';
import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'localhost';

const client = redis.createClient({ url: `redis://${REDIS_URL}` });

(async () => {
  await client.connect();
})();

client.on('connect', () => console.log('::> Redis Client Connected'));
client.on('error', (err) => console.log('<:: Redis Client Error', err));

const app = express();

app.post('/counter/:id/incr', async (req, res) => {
  const { id } = req.params;

  try {
    const value = await client.incr(id);
    res.json({ id: `${id}`, cnt: value });
  } catch (error) {
    res.status(500).json({ error: 'Redis error' });
  }
});

app.get('/counter/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const value = await client.get(id);
    res.json({ id: `${id}`, cnt: value });
  } catch (error) {
    res.status(500).json({ error: 'Redis error' });
  }

  console.log('hello counter');
});

app.get('/', (req, res) => {
  console.log('####hello####');
  res.json({ message: `hello` });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`Сервер Counter запущен на порту ${PORT}`));
