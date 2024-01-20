import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoutes } from "./user/infraestructure/userRoutes";
import { hotelRoutes } from "./hotel/infraestructure/hotelRoutes";





const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/hotel', hotelRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
