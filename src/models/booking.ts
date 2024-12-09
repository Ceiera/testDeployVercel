import prismaClient from "./prismaClient";
import BookingEntity from "./entity/booking";
import BookingRequest from "./dto/booking";

class BookingModel {
  static async createBooking(
    booking: BookingRequest
  ): Promise<BookingEntity | any> {
    try {
      booking.scheduleDate = new Date(booking.scheduleDate);
      const result = await prismaClient.booking.create({
        data: booking,
      });
      return result;
    } catch (error) {
      throw new Error("Error creating booking");
    }
  }
  static async getAllBookingsByUserId(
    userId: string
  ): Promise<BookingEntity | any> {
    try {
      const result = await prismaClient.booking.findMany({
        where: { userId: userId },
      });
      return result;
    } catch (error) {
      throw new Error("Error getting all booking by user id");
    }
  }
}

export default BookingModel;
