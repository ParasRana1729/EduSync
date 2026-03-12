import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-not-for-production-use';

app.use(cors());
app.use(express.json());

const userCredentials = {
  "paras1556.becse24@chitkara.edu.in": "12345678",
  "ananya1342.becse24@chitkara.edu.in": "2410991342",
  "rahul1478.becse24@chitkara.edu.in": "2410991478",
  "pritish1593.becse24@chitkara.edu.in": "12345678",
  "test0000.becse24@chitkara.edu.in": "12345678",
};

const users = [
  {
    id: 1,
    name: "Paras Rana",
    rollNo: "2410991556",
    email: "paras1556.becse24@chitkara.edu.in",
    branch: "B.E. CSE",
    batch: "2024-2028",
    section: "24-CSE-C2",
    semester: 4,
    fatherName: "Mr. Surinder Singh Rana",
    motherName: "Mrs. Nisha",
    phone: "9876543210",
    dob: "2006-03-10",
    gender: "Male",
    address: "Chandigarh, Punjab",
  },
  {
    id: 2,
    name: "Ananya Gupta",
    rollNo: "2410991342",
    email: "ananya1342.becse24@chitkara.edu.in",
    branch: "B.E. CSE",
    batch: "2024-2028",
    section: "24-CSE-C1",
    semester: 2,
    fatherName: "Mr. Vikram Gupta",
    motherName: "Mrs. Priya Gupta",
    phone: "9876543211",
    dob: "2006-08-22",
    gender: "Female",
    address: "Panchkula, Haryana",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    rollNo: "2410991478",
    email: "rahul1478.becse24@chitkara.edu.in",
    branch: "B.E. CSE",
    batch: "2024-2028",
    section: "24-CSE-C2",
    semester: 2,
    fatherName: "Mr. Sunil Kumar",
    motherName: "Mrs. Meena Kumar",
    phone: "9876543212",
    dob: "2006-01-10",
    gender: "Male",
    address: "Mohali, Punjab",
  },
  {
    id: 4,
    name: "Sunil Kumar",
    rollNo: "2410991593",
    email: "pritish1593.becse24@chitkara.edu.in",
    branch: "B.E. CSE",
    batch: "2024-2028",
    section: "24-CSE-C2",
    semester: 4,
    fatherName: "Mr. Suresh Kumar",
    motherName: "Mrs. Meena Kumar",
    phone: "9876543212",
    dob: "2006-01-10",
    gender: "Male",
    address: "Mohali, Punjab",
  },
  {
    id: 5,
    name: "Test",
    rollNo: "2410990000",
    email: "test0000.becse24@chitkara.edu.in",
    branch: "B.E. CSE",
    batch: "2024-2028",
    section: "24-CSE-C2",
    semester: 4,
    fatherName: "Mr. Sunil Kumar",
    motherName: "Mrs. Meena Kumar",
    phone: "9876543212",
    dob: "2006-01-10",
    gender: "Male",
    address: "Mohali, Punjab",
  }
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (userCredentials[email] !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

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
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });
}

export default app;
