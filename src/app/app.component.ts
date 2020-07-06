import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { SessionStorage } from 'ngx-store';
import { Product } from './classes/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mock-pos';
  categories = [];
  prices = [];
  storeProducts = [];
  alertClass = 'success';
  alertText = '';

  @SessionStorage() cartProducts = [];
  @SessionStorage() purchasedProducts = [];
  cartCount = 0;
  orderSubtotal = 0;
  orderTax = 0;
  orderTotal = 0;
  taxRate = 0.08;

  constructor(
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    // load product data
    this.storeProducts = this.productService.getProductData();
    // load category data
    this.categories = this.productService.getCategoryData();
    // load category data
    this.prices = this.productService.getPriceData();
    // set initial cart count
    this.setCartCount();
  }

  setCartCount(): void {
    // update cart count display
    var quantities = _.map(this.cartProducts, function (cp) { return cp.quantity; });
    this.cartCount = _.reduce(quantities, function (memo, num) { return memo + num; }, 0);
  }

  calculateTotal(products?: Product[]): void {
    // set array optional products array, default to data cart products
    products = products || this.cartProducts;
    // calculate totals
    this.orderSubtotal = this.calculateSubtotal(products);
    this.orderTax = this.calculateTax();
    this.orderTotal = this.orderSubtotal + this.orderTax;
  }

  calculateSubtotal(products: Product[]): number {
    var subtotal = 0;
    var prices = _.map(products, function (cp) { return cp.price * cp.quantity; });
    subtotal = _.reduce(prices, function (memo, num) { return memo + num; }, 0);
    return subtotal;
  }

  calculateTax(): number {
    return this.orderSubtotal * this.taxRate;
  }

  createAlert(text: string, cssClass: string, timeout?: number): void {
    this.alertText = text;
    this.alertClass = cssClass;
    // show alert
    $('#globalAlert').css('z-index', '9999');
    $('#globalAlert').addClass('show');
    // fade out alert
    setTimeout(function () {
      $('#globalAlert').removeClass('show');
      // change z-index of alert after fade out to prevent blocking UI
      setTimeout(function () {
        $('#globalAlert').css('z-index', '-1');
      }, 150);
    }, timeout || 1500);
  }

}