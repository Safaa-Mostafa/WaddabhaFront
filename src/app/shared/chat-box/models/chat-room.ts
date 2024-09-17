import { User } from "../../../pages/website/auth/Models/user";

export interface ChatRoom {
    id: string;
    buyer: User;
    seller: User;
    createdAt: Date;
}
