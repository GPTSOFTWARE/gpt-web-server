export type InputGetByCategory = {
  categoryId: string;
  productId?: string;
};

export type InputSetCategory = {
  id?: string;
  name: string;
  description: string;
  banner?: string;
}

export type InputSetProduct = {
  id?: string;
  name: string;
  description: string;
  banner?: string;
  categoryID: string;
  partnerID: string;
}