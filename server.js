import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(cors());
app.use(express.json());

const users = [];

app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashedPassword, role };
  users.push(user);
  res.json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: 'Invalid password' });
  
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    res.json({ id: user.id, email: user.email, role: user.role });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
