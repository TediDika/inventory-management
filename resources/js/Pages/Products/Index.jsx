import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, products }){
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h1>Products</h1>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="p-6 w-full text-black-400">
                 <table>
                    <thead>
                        <tr>
                            <th className="px-3 py-2">ID</th>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Price</th>
                            <th className="px-3 py-2">Stock Quantity</th>
                            <th className="px-3 py-2">Popularity</th>
                            <th className="px-3 py-2">Category</th>
                            <th className="px-3 py-2">Date Created</th>
                            <th className="px-3 py-2">Created By</th>
                            <th className="px-3 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((product) => ( 
                        <tr className="border-b" key={product.id}>
                            <td className="px-3 py-2">{product.id}</td>
                            <td className="px-3 py-2">{product.name}</td>
                            <td className="px-3 py-2">{product.price}</td>
                            <td className="px-3 py-2">{product.stock}</td>
                            <td className="px-3 py-2">{product.popularity}</td>
                            <td className="px-3 py-2">{product.category}</td>
                            <td className="px-3 py-2">{product.created_at}</td>
                            <td className="px-3 py-2">{product.createdBy.name}</td>
                            <td className="px-3 py-2">
                                <Link href={route("products.edit", product.id)} 
                                className="font-medium text-blue-600 hover:underline mx-1">
                                Edit
                                </Link>
                                <Link href={route("products.destroy", product.id)} 
                                className="font-medium text-red-600 hover:underline mx-1">
                                Delete
                                </Link>
                            </td>
                        </tr>
                         ))}
                    </tbody>
                 </table>
                 <Pagination links={products.meta.links} />
                </div>

            </div>



        </AuthenticatedLayout>





    )

}