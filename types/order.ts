export interface Order {
  id: string
  userId: string
  items: { productId: string; quantity: number; size: string }[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  address: Address
  createdAt: number
}

export interface Address {
  name: string
  line1: string
  city: string
  state: string
  pincode: string
  phone: string
}
