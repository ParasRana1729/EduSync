import jwt from 'jsonwebtoken';
import students from '../src/data/students.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-not-for-production-use';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const student = students.find(s => s.email === email && s.password === password);
  if (!student) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const { password: _, ...user } = student;
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user });
}
