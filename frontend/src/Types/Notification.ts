import { Person } from "./Person";

export interface NotificationData {
id: number;
person?: Person;
message: string;
modifiedDate: string
}