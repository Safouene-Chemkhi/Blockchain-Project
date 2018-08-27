import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from '../../../node_modules/rxjs';
import { Product } from '../models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products : Product[];
  filteredProducts : Product[];
  subscription :Subscription;
  products$;
  
  constructor(private productService: ProductService) {
   this.subscription=this.productService.getAll_u().subscribe(products => this.filteredProducts = this.products = products);

    //this.products$ = this.productService.getAll();

  }

  filter(query ){
    console.log(query.value)
     this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }
}
