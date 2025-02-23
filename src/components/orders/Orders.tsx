'use client';
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom ui/DataTable";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import dotenv from "dotenv";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});
    const router = useRouter();
    const [orderitems, setorderitems] = useState();

    useEffect(() => {
        const handleOrder = async () => {
            try {
                const token = localStorage.getItem("authtoken");
                const response = await axios.post(
                    process.env.NEXT_PUBLIC_IPHOST + "/StoreAPI/orders/orderGET",
                    {
                        query: `
                            query {
                                userorderGET {
                                    order {
                                        _id
                                        idorder
                                        orderitems {
                                            _id
                                            quantity
                                            product {
                                                name
                                                images
                                                Price
                                            }
                                            size
                                            color
                                            priceproduct
                                            createdAt
                                            updatedAt
                                        }
                                        adress
                                        wilaya
                                        commune
                                        phonenumber
                                        status
                                        totalprice
                                        quantityOrder
                                        user {
                                            _id
                                            username
                                        }
                                        dateordered
                                        createdAt
                                        updatedAt
                                    }
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

                // Check if data exists and update orders state
                if (response.data?.data?.userorderGET?.order) {
                    setOrders(response.data.data.userorderGET.order);
                } else {
                    console.error("No orders found");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        handleOrder();
    }, []);



    interface orderitems {
        product: string;
        quantity: number;

    }

    interface Order {
        _id: string;
        idorder: string;
        orderdBy: string;
        adress: string;
        Totalprice: string;
        orderdAt: string;
        productNB: number;
        state: string;
        items: orderitems[]; // Assuming each order contains an array of products
    }

    const toggleOrder = (orderId: string) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    const renderProductDetails = (order: Order): React.ReactNode | null => {
        if (!expandedOrders[order._id]) return null; // If the row is not expanded, return null

        return (
            <div key={order._id} className="pl-5 py-5">
                <h4 className="font-bold">Products:</h4>
                <ul>
                    {order.items.length > 0 ? (
                        order.items.map((item, index) => (
                            <li key={index}>
                                <span>Product: {item.product}, Quantity: {item.quantity}</span>
                            </li>
                        ))
                    ) : (
                        <li>No products found.</li>
                    )}
                </ul>
            </div>
        );
    };

    // Define your columns
    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "_id",
            header: "ID",
            cell: (info) => info.getValue() || "N/A",


            // cell: (info) => (
            //     <div onClick={() => toggleOrder(info.row.original._id)} style={{ cursor: "pointer" }}>
            //         {info.getValue() || "N/A"}
            //     </div>
            // ),
        },
        {
            accessorKey: "user.username",
            header: "Ordered By",
            cell: (info) => info.getValue() || "N/A",
        },
        {
            accessorKey: "quantityOrder",
            header: "Number",
            cell: (info) => info.getValue() as number,


        },
        {
            accessorKey: "totalprice",
            header: "Total",
            cell: (info) => info.getValue() || "N/A",
        },
        {
            accessorKey: "dateordered",
            header: "Ordered At",
            cell: (info) => info.getValue() || "N/A",
        },
        {
            accessorKey: "status",
            header: "State",
            cell: (info) => info.getValue() || "N/A",
        },
    ];

    const handleDeleteProduct = async (id: string) => {
        
    };

    return (
        <div >
            <div className="flex items-center justify-between">
                <p className="text-heading1-bold">Orders List</p>
            </div>

            <DataTable
                columns={columns}
                data={orders}
                searchKey="status"
                editLinkBase="/products/edit/"
                onDelete={handleDeleteProduct}
            />

        </div>
    );
}
