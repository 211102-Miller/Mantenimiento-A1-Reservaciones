import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoutes } from "./user/infraestructure/userRoutes";
import { roomRoutes } from "./RoomandpromotionsManagement/room/infraestructure/roomRoutes";
import { reservationRouter } from "./reservationsPaymentsManagement/reservation/infraestructure/reservationRoutes";
import { hotelRoutes } from "./hotel/infraestructure/hotelRoutes";
import { CouponRoutes } from "./promotions/infraestructure/couponRoutes";




const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/room', roomRoutes);
app.use('/api/v1/reservation', reservationRouter);
app.use('/api/v1/hotel', hotelRoutes);
app.use('/api/v1/coupon', CouponRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
