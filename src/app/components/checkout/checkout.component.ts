import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    public app: AppComponent,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.app.calculateTotal();
  }

  purchase(): void {
    $('.purchase').hide();
    $('.processing').show();
    // simulate payment processing
    var $this = this;
    setTimeout(function () {
      // reset cart items
      $this.app.purchasedProducts = $this.app.cartProducts;
      $this.app.cartProducts = [];
      $this.app.setCartCount();
      // show alert
      $this.app.createAlert('<i class="fa fa-check"></i>&nbsp; Payment was processed successfully!', 'success', 2500);
      // go to purchase page
      $this.router.navigate(['/purchase']);
    }, 1500);
  }

}
