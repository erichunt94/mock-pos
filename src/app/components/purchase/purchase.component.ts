import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  constructor(
    public app: AppComponent,
    public router: Router
  ) { }

  ngOnInit(): void {
    // go back to store if purchased products array is not populated
    if (!this.app.purchasedProducts.length) {
      this.router.navigate(['/store']);
    }
    // calculate total based on purchased products
    this.app.calculateTotal(this.app.purchasedProducts);
    // go to top of page
    document.body.scrollTop = 0;
  }

}
