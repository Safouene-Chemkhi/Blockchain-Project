import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Product } from '../models/product';
import { switchMap , take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products:Product[] =[];
  categories$;
  category:string;
  filteredProducts : Product[]=[];
  constructor(productService : ProductService , categoryService : CategoryService, route: ActivatedRoute) {
     productService.getAll().pipe(switchMap(products => {
       this.products =products;
       return route.queryParamMap;}))

       .subscribe(params => {
        this.category =  params.get('category');
  
        console.log(this.category);
        this.filteredProducts= (this.category) ? 
        this.products.filter(p =>p.category === this.category) :
        this.products;
      });
    this.categories$ = categoryService.getCategories();


   }


}
