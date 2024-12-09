import express, { Router } from "express";
import BookingController from "../controllers/booking";

const BookingRouter: Router = express.Router();
const bookingController = new BookingController();

BookingRouter.post("/bookings", bookingController.createBooking);
BookingRouter.get("/bookings/:userId", bookingController.getAllBookingsByUserId);

export default BookingRouter;
