
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
}
export interface Category {
  name: string;
  description: string;
}