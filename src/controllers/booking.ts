import ResponseClass from "../utils/responseClass";
import { HttpError } from "../utils/errorClass";
import { Request, Response } from "express";
import BookingRequest from "../models/dto/booking";
import BookingService from "../services/booking";

class BookingController {
  async createBooking(req: Request, res: Response): Promise<any> {
    try {
      const booking: BookingRequest = {
        userId: req.body.user_id,
        serviceId: req.body.service_id,
        scheduleDate: req.body.schedule_date,
        notes: req.body.notes,
      };
      if (!booking.userId || !booking.serviceId || !booking.scheduleDate) {
        return res
          .status(400)
          .json(new ResponseClass("Missing fields", null, 400));
      }

      const result = await new BookingService().createBooking(booking);
      return res.status(201).json(new ResponseClass("success", result, 201));
    } catch (error) {
      const httpError = error as HttpError;
      res
        .status(httpError.statusCode)
        .json(
          new ResponseClass("" + httpError.message, null, httpError.statusCode)
        );
    }
  }
  async getAllBookingsByUserId(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.params.userId as string;
      if (!userId) {
        res.status(400).json(new ResponseClass("Missing Params", null, 400));
      }

      const result = await new BookingService().getAllBookingsByUserId(userId);
      return res.status(200).json(new ResponseClass("success", result, 200));
    } catch (error) {}
  }
}
export default BookingController;
