import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create required directories if they don't exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure the data and uploads directories exist
await fs.mkdir(dataDir, { recursive: true });
await fs.mkdir(uploadsDir, { recursive: true });

// Configure file upload middleware
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      // Create a folder for each report using its ID
      const reportId = req.reportId || uuidv4();
      req.reportId = reportId;
      
      const reportUploadsDir = path.join(uploadsDir, reportId);
      await fs.mkdir(reportUploadsDir, { recursive: true });
      
      cb(null, reportUploadsDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Generate unique filename while preserving extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Filter files by type
const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Max 5 files
  } 
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data file path
const dataFile = path.join(dataDir, 'missing-persons.json');

// Helper function to read persons data
const readPersonsData = async () => {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or has invalid JSON, return empty array
    return [];
  }
};

// Helper function to write persons data
const writePersonsData = async (data) => {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf-8');
};

// API endpoints
// Get all missing persons
app.get('/api/all', async (req, res) => {
  try {
    const persons = await readPersonsData();
    res.json(persons);
  } catch (error) {
    console.error('Error fetching all missing persons:', error);
    res.status(500).json({ error: 'Failed to fetch missing persons data' });
  }
});

// Get a specific missing person by ID
app.get('/api/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const persons = await readPersonsData();
    const person = persons.find(p => p.id === id);
    
    if (!person) {
      return res.status(404).json({ error: 'Missing person not found' });
    }
    
    res.json(person);
  } catch (error) {
    console.error(`Error fetching missing person with ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch missing person data' });
  }
});

// Add a new missing person report
app.post('/api/add', upload.array('photos', 5), async (req, res) => {
  try {
    const reportId = req.reportId;
    const files = req.files;
    
    // Create file paths relative to uploads folder for storing in the database
    const photoPaths = files.map(file => {
      return `uploads/${reportId}/${file.filename}`;
    });
    
    // Create a new person object
    const newPerson = {
      id: reportId,
      name: req.body.name,
      age: req.body.age ? parseInt(req.body.age) : undefined,
      gender: req.body.gender,
      height: req.body.height ? parseFloat(req.body.height) : undefined,
      weight: req.body.weight ? parseFloat(req.body.weight) : undefined,
      lastSeenDate: req.body.lastSeenDate,
      lastSeenLocation: req.body.lastSeenLocation,
      description: req.body.description,
      identifyingFeatures: req.body.identifyingFeatures,
      medicalConditions: req.body.medicalConditions,
      contactPerson: req.body.contactPerson,
      contactPhone: req.body.contactPhone,
      photos: photoPaths,
      status: 'missing', // Default status
      dateReported: new Date().toISOString()
    };
    
    // Read existing data, add new person, and write back
    const persons = await readPersonsData();
    persons.push(newPerson);
    await writePersonsData(persons);
    
    res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error adding missing person report:', error);
    res.status(500).json({ error: 'Failed to add missing person report' });
  }
});

// Update a missing person's status
app.patch('/api/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['missing', 'found', 'critical'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    // Read existing data
    const persons = await readPersonsData();
    const personIndex = persons.findIndex(p => p.id === id);
    
    if (personIndex === -1) {
      return res.status(404).json({ error: 'Missing person not found' });
    }
    
    // Update status
    persons[personIndex].status = status;
    
    // Write updated data
    await writePersonsData(persons);
    
    res.json(persons[personIndex]);
  } catch (error) {
    console.error(`Error updating status for person with ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Error handler for multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 5 files.' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});