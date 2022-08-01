import { Tenant } from "../types/Tenant";

import { Product } from "../types/Product";

const TEMPORARYoneProduct: Product = {
  id: 1, 
  image:'/tmp/burger.png', 
  categoryName: 'Tradicional', 
  name:'Texas Burger', 
  price: 25.50,
  description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal, '
}

// export type getTenantResponse = {
//   name: string;
//   mainColor: string;
//   secondColor: string;
// }

export const useApi = (tenantSlug: string) => ({


  getTenant: (): boolean | Tenant => {

    switch (tenantSlug) {
      case 'b7burger':
        return {
          slug: 'b7burger',
          name: 'B7Burger',
          mainColor: '#f00',
          secondColor: '#0f0'
        }
      break;
      case 'b7pizza':
        return {
          slug: 'b7pizza',
          name: 'B7Pizza',
          mainColor: '#aa0',
          secondColor: '#0aa'
        }
      break;    
      default:
        return false
    }
  },

  getAllProducts: () => {
    let products = [];

    for (let i = 0; i < 10; i++) {
      products.push(TEMPORARYoneProduct);      
    }

    return products
  },

  getProduct: (id: string) => {
    return TEMPORARYoneProduct;
  }

})