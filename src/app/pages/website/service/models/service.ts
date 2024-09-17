import { User } from "../../auth/Models/user";

export interface Image {
  imageUrl: string;
  publicId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  images: Image[]; // Array of Image objects
  initialPrice: number;
  buyerInstruction: string;
  category: Category;
  seller: User;
  rating: number;
  status: string;
}
export interface Category {
  name: string;
  description: string;
}