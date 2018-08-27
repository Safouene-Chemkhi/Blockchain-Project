import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { take} from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product :Product;
  product$;
  id : string;
  owner : {
    uid?: string;
    email?: string ;
    name?: string;
    tel?:number;
    uproduct?: Product[];
};
  constructor(private productService: ProductService, private route :ActivatedRoute,private userService: UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.productService.getProd(this.id).pipe(take(1)).subscribe(p => {
      this.product = p
      this.userService.get("vkk9BN2J6FcOYnbnjliFRxhf7XJ3").pipe(take(1)).subscribe(o =>this.owner = o);;
    });

  }

}
