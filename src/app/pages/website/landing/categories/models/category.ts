import { Image } from '../../../service/models/service';

export interface Category {
  id: string;
  name: string;
  description: string;
  image: Image;
}
