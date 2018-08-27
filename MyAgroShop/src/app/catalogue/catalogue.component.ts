import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shoppingCart';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit , OnDestroy {

  products:Product[] =[];
  category:string;
  filteredProducts : Product[]=[];
  cart : ShoppingCart;
  subscription :Subscription;
  constructor(
    productService : ProductService , 
    route: ActivatedRoute,
    private shoppingCartService : ShoppingCartService) {
    

     productService.getAll().pipe(switchMap(products => {
       this.products =products;
       return route.queryParamMap;}))

       .subscribe(params => {
        this.category =  params.get('category');
  
        this.filteredProducts= (this.category) ? 
        this.products.filter(p =>p.category === this.category) :
        this.products;
      });


   }

    async ngOnInit(){
    this.subscription= (await this.shoppingCartService.getCart())
    .valueChanges().subscribe(cart => this.cart = cart);
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }

}
