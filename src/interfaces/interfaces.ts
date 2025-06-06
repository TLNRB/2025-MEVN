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

export type CartItem = {
   _id: string,
   name: string,
   price: number,
   quantity: number,
   imageURL: string
}

export type OrderItems = {
   _id: string,
   orderData: string,
   total: number,
   userName: string,
   orderSatus: string,
   orderNumber: number,
   orderLine: Array<{ product: Product, quantity: number }>
}