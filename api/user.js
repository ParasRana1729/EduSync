import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}
