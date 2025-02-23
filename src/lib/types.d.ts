type CollectionType = {
    _id: string;
    name: string;
    icon: string;
    color: string;
    typestore: string;
    createdAt: string;
    updatedAt: string;
};

type ProductDetailType = {
    color: string;
    sizes: {
        size: number;
        stock: number;
    }[];
};

type ProductType = {
    _id: string;
    name: string;
    description: string;
    richDescription: string;
    images: string[];
    brand: string;
    Price: string;
    category: string;
    CountINStock: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
    IsFeatured: boolean;
    productdetail: ProductDetailType[];
};

type UserType = {
    id: string;
    username: String;
    wishlist: string[];
    createdAt: string;
    updatedAt: string;
};

type OrderItem = {
    product: ProductType[];
    quantity: number;
    color:string;
    size:string;
    _id: string;
};

type OrderType = {

    _id: string;
    orderitems: [OrderItem];
    adress: String;
    city: String;
    postalcode: String;
    phonenumber: String;
    status: String;
    totalprice: Number;
    quantityOrder: Number;
    user: User;
    dateordered: String!
    createdAt: String;
    updatedAt: String;
};
