import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    key?: string;
    items?: Product[];

   /* get productIds(){
        return Object.keys(this.items);
    }*/
    
    get totalItemCount(){
        let count = 0;
        for(let productId in this.items){
            count+=1;
        }
        console.log(count);
        return count;
    }
}
