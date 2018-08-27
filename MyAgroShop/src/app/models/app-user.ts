import { Product } from "./product";

export interface AppUser {
    uid?: string;
    uemail?: string | null;
    uname?: string;
    utel?:number;
    uproduct?: Product[];
}