import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import students from './src/data/students.js';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-not-for-production-use';

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const student = students.find(s => s.email === email && s.password === password);
  if (!student) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const { password: _, ...user } = student;
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user });
});

app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const student = students.find(s => s.id === decoded.id);
    if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password: _, ...user } = student;
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

export default app;
