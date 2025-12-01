import { makeAutoObservable } from "mobx";
import { ApiProduct } from "services";
import { rootUrl } from "store/config";

export class Product {
  id = '';
  name = '';
  price = 0;
  image = '';

  constructor(apiProduct: ApiProduct) {
    this.setFromApi(apiProduct);

    makeAutoObservable(this);
  }

  get displayName(): string {
    return this.name;
  }

  get formattedPrice(): string {
    return `${Math.round(this.price).toString()} ₽`;
  }

  get imagePath(): string {
    return rootUrl + this.image
  }

  setFromApi(apiProduct: ApiProduct) {
    this.id = apiProduct.id;
    this.name = apiProduct.name;
    this.price = typeof apiProduct.price === 'string' ? Number(apiProduct.price) : apiProduct.price;
    this.image = apiProduct.image;
  }
}