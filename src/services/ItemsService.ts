import { apiRequest } from "@/api";
import { Auth0ContextInterface, User } from "@auth0/auth0-react";

interface IItem {
  code: string;
  name: string;
  salesName: string;
  description: string;
  uom: string;
  anvisaCode: string;
  anvisaDueDate: string;
  supplierCode: string;
  cst: string;
  susCode: string;
  ncmCode: string;
}

export class ItemsService {
  static async getAll(instance: Auth0ContextInterface<User>, currentPage = 1, pageSize = 10) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { data } =
      await apiRequest({
        instance,
        model: `items?currentPage=${currentPage}&pageSize=${pageSize}`,
        method: 'GET',
      });

    return data;
  }
}
