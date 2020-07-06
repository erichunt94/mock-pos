import { Injectable } from '@angular/core';
import ProductData from '../../assets/data/products.json';
import CategoryData from '../../assets/data/categories.json';
import PriceData from '../../assets/data/prices.json';
import { Product } from '../classes/product';
import { Category } from '../classes/category';
import { Price } from '../classes/price';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // product
  getProductData(): Product[] {
    return ProductData;
  }

  filterByProductNameOrSku(searchTerm: string, products?: Product[]): Product[] {
    // set array to filter from optional products array, default to data from json
    products = products || ProductData;
    // normalize search term
    searchTerm = searchTerm.trim().toLowerCase();
    // find products by name or sku
    return _.filter(products, function (pd) {
      return pd.name.trim().toLowerCase().indexOf(searchTerm) > -1 || pd.sku.trim().toLowerCase().indexOf(searchTerm) > -1;
    });
  }

  filterProductsByCategory(id: number, products?: Product[]): Product[] {
    // set array to filter from optional products array, default to data from json
    products = products || ProductData;
    // find products by category id
    return _.filter(products, function (pd) {
      return pd.categoryId == id;
    });
  }

  filterProductsByPrice(min: number, max: number, products?: Product[]): Product[] {
    // set array to filter from optional products array, default to data from json
    products = products || ProductData;
    // find products by price range
    return _.filter(products, function (pd) {
      return pd.price >= min && pd.price <= max;
    });
  }

  // category
  getCategoryData(): Category[] {
    return CategoryData;
  }

  // price
  getPriceData(): Price[] {
    return PriceData;
  }

}