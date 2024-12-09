interface BookingEntity {
  bookingId?: string;
  userId: string;
  serviceId: string;
  scheduleDate: Date;
  notes?: string;
  createdAt?: Date;
  updateAt?: Date;
  deletedAt?: Date;
}

export default BookingEntity;
