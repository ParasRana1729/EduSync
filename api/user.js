import jwt from 'jsonwebtoken';
import students from '../src/data/students.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-not-for-production-use';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}
