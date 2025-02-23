import Link from "next/link";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom ui/DataTable";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import dotenv from "dotenv"

import { useEffect, useState } from "react";
import axios from "axios";


export default function Products() {

    const [products, setProducts] = useState<Article[]>([]);
    const router = useRouter(); // Define the router
    const [id, getid] = useState([]);


    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_IPHOST + '/StoreAPI/products/productGET',
            {
                query: `
                    query {
                        productGET {
                            _id
                            name
                            description
                            images
                            Price
                            category{
                            name}
                        }
                    }
                `
            }
        )
            .then(response => {
                setProducts(response.data.data.productGET);  // Store products data in state
                getid(response.data.data.productGET._id)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

    }, []);

    // Define the data type (replace this with the actual type of your data)
    interface Article {
        _id: string;
        name: string;
        description: string;
        price: string;
        createdAt: string;
        updatedAt: string;
    }

    // Define your columns
    const columns: ColumnDef<Article>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: (info) => info.getValue() || "N/A",
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: (info) => info.getValue() || "N/A",
        },
        {
            accessorKey: "Price",
            header: "Price",
            cell: (info) => info.getValue() || "N/A",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: (info) => {
                const value = info.getValue() as string; // Cast to string
                const date = new Date(value);
                return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: (info) => {
                const value = info.getValue() as string; // Cast to string
                const date = new Date(value);
                return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
            },
        },

    ];

    const handleDeleteProduct = async (id: string) => {
        try {
            const token = localStorage.getItem('authtoken'); // Retrieve token from local storage

            await axios.post(`${process.env.NEXT_PUBLIC_IPHOST}/StoreAPI/products/productPOST`, {
                query: `
                        mutation {
                        productDELETE(input: {
                            productId:"${id}"
                            password: "younes@" }) {
                            
                            
                            message
                        }
                        }
                `
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Use 'multipart/form-data' for FormData
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete the product. Please try again.");
        }
    };


    return (
        <div className="px-8 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#857B74] drop-shadow-lg">Products</h1>
                <Button
                    className="btn-primary"
                    onClick={() => router.push("/products/newproduct")}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create new product
                </Button>
            </div>

            {/* Pass the actual products data to DataTable */}
            <DataTable
                columns={columns}
                data={products}
                searchKey="name"
                editLinkBase="/products/edit/"
                onDelete={handleDeleteProduct}
            />

        </div>
    );
}
