import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { take} from 'rxjs/operators';
import { Subscription } from '../../../node_modules/rxjs';
import { Product } from '../models/product';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$ ;
  product : {    key?: string,
    title?: string,
    price?: number,
    quantity?: number,
    category?: string,
    imageUrl?: string,
    owner?: string,
    dateOfHarvest?:string,
    spieces?:string} ={}
  id;
  subscription : Subscription;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private categoryService : CategoryService, 
    private productService : ProductService) {

    this.categories$=categoryService.getCategories();
    this.id =this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => {this.product = p;});
    if (this.id) {
      //this.subscription=this.productService.get(this.id).subscribe(p => {this.product = p; console.log(p)});
    
    }
   }

  save(product){
    if(this.id) this.productService.update(this.id,product);
    else {this.productService.create(product);
    }
    this.router.navigate(['/products']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete yhe product? ')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/products']);
     
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }

}
