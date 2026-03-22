import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { serve } from 'inngest/express';
import { inngest, functions } from './lib/inngest.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
app.use("/api/inngest", serve({client: inngest, functions}));

// Routes
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from the backend testing!' });
});

app.get('/api/data', (req, res) => {
  const data = {
    name: 'BitEval',
    description: 'A platform for evaluating and comparing AI models.',
    features: [
      'Model evaluation',
      'Performance metrics',
      'User-friendly interface',
      'Community-driven insights'
    ]
  };
  res.status(200).json(data);
});


const __dirname = path.resolve();

// make our app ready for deployment
if(ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};
startServer();