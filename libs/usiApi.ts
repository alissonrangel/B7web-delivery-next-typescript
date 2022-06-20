import { Tenant } from "../types/Tenant";

// export type getTenantResponse = {
//   name: string;
//   mainColor: string;
//   secondColor: string;
// }

export const useApi = () => ({


  getTenant: (tenantSlug: string): boolean | Tenant => {

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
  }

})