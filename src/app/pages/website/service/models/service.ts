export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  images: [];
  initialPrice: number;
  buyerInstruction: string;
}
