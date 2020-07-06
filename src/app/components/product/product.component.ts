import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { AppComponent } from 'src/app/app.component';
import { SessionStorageService } from 'ngx-store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() inCart: boolean;
  @Input() purchase: boolean;

  constructor(
    public app: AppComponent,
    public sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
  }

  addToCart(product: Product, quantity: any): void {
    // check if product with same sku is already in the cart
    var cartProduct = _.findWhere(this.app.cartProducts, {sku: product.sku});
    if (cartProduct) {
      // update quantity of product in cart
      cartProduct.quantity += parseInt(quantity);
      // update session storage
      this.sessionStorageService.set('cartProducts', this.app.cartProducts);
    } else {
      // update quantity of new product
      product.quantity = parseInt(quantity);
      // add product to cart array
      this.app.cartProducts.push(product);
    }
    // update cart count display
    this.app.setCartCount();
    // update cart total
    this.app.calculateTotal();
    // show alert
    this.app.createAlert('<i class="fa fa-check"></i>&nbsp; Product added to your cart!', 'success');
  }

  removeFromCart(product: Product): void {
    // find product with sku in cart
    var cartProduct = _.findWhere(this.app.cartProducts, {sku: product.sku});
    if (cartProduct) {
      // remove product from cart
      var index = _.indexOf(this.app.cartProducts, cartProduct);
      this.app.cartProducts.splice(index, 1);
    }
    // update cart count display
    this.app.setCartCount();
    // update cart total
    this.app.calculateTotal();
    // show alert
    this.app.createAlert('<i class="fa fa-check"></i>&nbsp; Product removed from your cart!', 'warning');
  }

}
