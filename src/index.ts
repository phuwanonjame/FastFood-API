import express, { Application } from "express";
import dotenv from "dotenv";
import healthRoutes from "./routes/healthRoutes";
import organizationRoutes from "./routes/organizationRoutes";
import ProfilesRoutes from "./routes/profilesRoutes"
import { setupSwagger } from "./swagger";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import morgan from "morgan"; 

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan("dev"));

const API_PREFIX = "/api/v1";


app.use(`${API_PREFIX}/organizations`, organizationRoutes);
app.use(`${API_PREFIX}/profiles`, ProfilesRoutes);
app.use(`${API_PREFIX}/health`, healthRoutes);


setupSwagger(app);


app.use(notFound);       
app.use(errorHandler);    

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}${API_PREFIX}`);
});
