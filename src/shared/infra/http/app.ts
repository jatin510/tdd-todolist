import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { v1Router } from './api/v1';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api/v1', v1Router);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
