interface ServiceRequest {
  serviceId?: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  location: string;
  rating?: number;
  createdAt?: Date;
  updateAt?: Date;
  deletedAt?: Date;
}

export default ServiceRequest;
