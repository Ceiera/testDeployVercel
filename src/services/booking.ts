import BookingRequest from "../models/dto/booking";
import { NotFoundError } from "../utils/errorClass";
import ServiceModel from "../models/service";
import BookingModel from "../models/booking";
class BookingService {
  async createBooking(booking: BookingRequest) {
    try {
      if (!booking.serviceId) {
        throw new NotFoundError("Service ID not found");
      }
      const checkService = await ServiceModel.getServiceById(booking.serviceId);
      if (!checkService) {
        throw new NotFoundError("Service not found");
      }
      const result = await BookingModel.createBooking(booking);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAllBookingsByUserId(userId: string) {
    try {
      const result = await BookingModel.getAllBookingsByUserId(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingService;
