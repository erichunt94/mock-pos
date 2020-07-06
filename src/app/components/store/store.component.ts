import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  products = [];

  constructor(
    public app: AppComponent,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    // set our scoped array to the global products array
    this.products = this.app.storeProducts;
  }

  searchFilter(searchTerm: string): void {
    if (searchTerm.length) {
      // filter by product name or sku based on search term
      this.products = this.productService.filterByProductNameOrSku(searchTerm, this.products);
    }
  }

  filterByCategory(id: number): void {
    if (id > 0) {
      // get products by category id
      this.products = this.productService.filterProductsByCategory(id, this.products);
    }
  }

  filterByPrice(price: any): void {
    var option = $(price).find('option:selected');
    var min = option.data('min');
    var max = option.data('max');
    if (min >= 0 && max >= 0) {
      // get products by price range
      this.products = this.productService.filterProductsByPrice(min, max, this.products);
    }
  }

  applyFilters(searchTerm: string, categoryId: number, price: any): void {
    // reset product array to apply filters
    this.products = this.app.storeProducts;
    // apply filters cumulatively
    this.searchFilter(searchTerm);
    this.filterByCategory(categoryId);
    this.filterByPrice(price);
  }

  resetFilters(): void {
    // reset all filters
    $('#search').val('');
    $('#category').val(0);
    $('#price').val(0);
    // reset product array
    this.products = this.app.storeProducts;
  }

}
