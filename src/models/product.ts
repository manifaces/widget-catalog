import { makeAutoObservable } from "mobx";
import { ApiProduct } from "services";
import { rootUrl } from "store/config";

export class Product {
  id: string = '';
  name: string = '';
  price: number = 0;
  image: string = '';

  constructor(apiProduct: ApiProduct) {
    if (apiProduct) {
      this.setFromApi(apiProduct);
    }

    makeAutoObservable(this);
  }

  get displayName(): string {
    return this.name;
  }

  get formattedPrice(): string {
    return `${Math.round(this.price)} ₽`;
  }

  get imagePath(): string {
    return `${rootUrl + this.image}`
  }

  setFromApi(apiProduct: ApiProduct) {
    this.id = apiProduct.id;
    this.name = apiProduct.name;
    this.price = Number(apiProduct.price) ?? 0;
    this.image = apiProduct.image;
  }
}