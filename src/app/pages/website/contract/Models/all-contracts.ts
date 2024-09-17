export interface AllContracts {
  id: string;
  price: number;
  startDate: string; // or Date, based on your preference
  endDate: string; // or Date, based on your preference
  workLocation: string;
  description: string;
  status: number;
  service: {
    name:string
  };
  buyer: {
    name:string,
    image:{
        imageUrl :string
    }
  }
}
