export type Product = {
   _id: string,
   name: string,
   description: string,
   imageURL: string,
   price: number,
   stock: number,
   discount: boolean,
   discountPct: number,
   isHidden: boolean,
   _createdBy: string,
}

export type NewProduct = Omit<Product, '_id' | '_createdBy'> & { _createdBy?: string }

export type User = {
   id: string,
   name: string,
   email: string,
   password: string,
   registerDate: string
}