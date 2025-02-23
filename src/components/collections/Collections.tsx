"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Plus } from "lucide-react";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import axios from "axios";
import dotenv from "dotenv"

const CollectionsPage = () => {
    const [categories, setCategories] = useState<Collection[]>([]);
    const router = useRouter(); // Define the router
    const [id, getid] = useState([]);



    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_IPHOST + '/StoreAPI/categories/categoryGET',
            {
                query: `
                    query {
                        CategoryGET {
                            _id
                            name
                            description
                            icon
                            typestore
                            
                        }
                    }
                `
            }
        )
            .then(response => {
                setCategories(response.data.data.CategoryGET);  // Store products data in state
                getid(response.data.data.productGET._id)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

    }, [categories]);

    // Define your data type
    interface Collection {
        _id: string;
        name: string;
        icon: string;
        color: string;
        type: string;
        createdAt: string;
        updatedAt: string;
    }

    const handleDeleteCollection = async (id: string) => {
        try {
            const token = localStorage.getItem('authtoken'); // Retrieve token from local storage
            await axios.delete(`${process.env.NEXT_PUBLIC_IPHOST}/StoreAPI/categories/delete/${id}`,
                {
                    headers: {

                        Authorization: `Bearer ${token}`
                    },
                }
            );
            setCategories((prevCollections) => prevCollections.filter(collection => collection._id !== id)); // Remove the deleted product from state
            alert("Product deleted successfully!");
            
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete the product. Please try again.");
        }
    };

    // Define your columns
    const columns: ColumnDef<Collection>[] = [
        {
            accessorKey: "icon",
            header: "Icon",
            cell: (info) => {
                const iconValue = info.getValue() as string; // Type assertion
                return (
                    <img
                        src={iconValue} // Using the asserted string type
                        alt="Collection Icon"
                        className="h-8 w-8 object-cover" // Adjust the size and style as needed
                    />
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "typestore",
            header: "Store",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: (info) => info.getValue(),
        },
    ];

    return (
        <div >
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#857B74] drop-shadow-lg m-8">Collections</h1>
                <Button
                    className="btn-primary"
                    onClick={() => router.push("/collections/CreateCollection")}
                >
                    <Plus className="h-4 w- 2" />
                    Create new Collection
                </Button>
            </div>


            {/* Use categories state to display data in the table */}
            <DataTable
                columns={columns}
                data={categories}
                searchKey="name"
                editLinkBase="/collections/edit" // Base URL for editing collections
                onDelete={handleDeleteCollection}
            />

        </div>
    );
};

export default CollectionsPage;
