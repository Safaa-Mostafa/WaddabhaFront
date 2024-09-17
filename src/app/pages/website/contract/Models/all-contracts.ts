import { User } from "../../auth/Models/user";
import { Service } from "../../service/models/service";

export interface AllContracts {
  id: string;
  price: number;
  startDate: string; // or Date, based on your preference
  endDate: string; // or Date, based on your preference
  workLocation: string;
  description: string;
  status: number;
  service: Service;
  buyer: User;
  seller: User;
  chatRoomId: string;
}
