"use client";

import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom ui/DataTable";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import axios from "axios";

interface DataWithId {
    _id: string;
    [key: string]: unknown;
}
export default function Products() {
    const [products, setProducts] = useState<Article[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios
            .post(process.env.NEXT_PUBLIC_IPHOST + "/StoreAPI/products/productGET", {
                query: `
                    query {
                        productGET {
                            _id
                            name
                            description
                            images
                            Price
                            category {
                                name
                            }
                            createdAt
                            updatedAt
                        }
                    }
                `,
            })
            .then((response) => {
                setProducts(response.data.data.productGET);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    // Define the data type
    interface Article extends DataWithId {
        name: string;
        description: string;
        price: string;
        createdAt: string;
        updatedAt: string;
    }

    // Define your columns
    const columns: ColumnDef<DataWithId, unknown>[] = [
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
                const value = info.getValue() as string;
                const date = new Date(value);
                return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: (info) => {
                const value = info.getValue() as string;
                const date = new Date(value);
                return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
            },
        },
    ];


    const handleDeleteProduct = async (id: string) => {
        try {
            const token = localStorage.getItem("authtoken");

            await axios.post(
                `${process.env.NEXT_PUBLIC_IPHOST}/StoreAPI/products/productPOST`,
                {
                    query: `
                        mutation {
                            productDELETE(input: {
                                productId: "${id}"
                                password: "younes@"
                            }) {
                                message
                            }
                        }
                    `,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Product deleted successfully!");
            // Optionally, refresh the products list
            setProducts((prev) => prev.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete the product. Please try again.");
        }
    };

    return (
        <div className="px-8 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#857B74] drop-shadow-lg">
                    Products
                </h1>
                <Button
                    className="btn-primary"
                    onClick={() => router.push("/products/newproduct")}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create new product
                </Button>
            </div>
            <DataTable<DataWithId, unknown>
                columns={columns as ColumnDef<DataWithId, unknown>[]}
                data={products}
                searchKey="name"
                editLinkBase="/collections/edit"
                onDeleteAction={handleDeleteProduct}
            />



        </div>
    );
}
