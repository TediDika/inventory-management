import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

const pop_map = {
    "low" : "Low",
    "medium" : "Medium",
    "high" : "High",
}

const color_map = {
    "low" : "bg-red-500",
    "medium" : "bg-amber-500",
    "high" : "bg-green-500",
}

const category_map = {
    "electronics" : "Electronics",
    "clothing" : "Clothing",
    "beauty" : "Beauty",
    "appliances" : "Appliances",
    "automotive" : "Automotive",
}



export default function Index({ auth, products, queryParams = null, success }){

    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
            router.get(route("products.index"), queryParams);
        
    }

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if(queryParams.sort_direction === "asc"){
                queryParams.sort_direction = "desc"
            }
            else {
                queryParams.sort_direction = "asc"
            }
        }
        else {
            queryParams.sort_field = name
            queryParams.sort_direction = "asc"
        }
        
        router.get(route("products.index"), queryParams);
    }

    const deleteProduct = (product) => {
        if(!window.confirm("Confirm Deletion?")){
            return;
        }
        console.log("Deleting product with ID:", product.id);
        router.delete(route("products.destroy", product.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">Products</h1>

                    <Link href={route("products.create")} className="bg-emerald-500 py-1 px-3 text-white rounded
                    shadow transition-all hover:bg-emerald-600">
                    Add New Product
                    </Link>
                </div>
            }
        >
            <Head title="Products" />

            

            <div className="py-12">
                <div className="p-6 max-w-[90rem] shadow-2xl rounded-lg mx-auto text-black-400 bg-slate-700">
                {success && (
                    <div className="bg-emerald-500 max-w-[85rem] mx-auto py-2 px-4 mb-4 text-white rounded">
                        {success}
                    </div>
                )}
                 <div className="overflow-auto">
                    <table className=" bg-gray-700 rounded border-collapse border border-gray-300 mx-auto">
                        <thead className="text-white bg-sky-950">
                            <tr className="text-left">
                                <TableHeading 
                                    name="id"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        ID
                                </TableHeading>
                                <th className="px-3 py-2">Image</th>
                                <TableHeading 
                                    name="name"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        Name
                                </TableHeading>
                                <TableHeading 
                                    name="price"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        Price
                                </TableHeading>
                                <TableHeading 
                                    name="stock"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        Stock Quantity
                                </TableHeading>
                                <TableHeading 
                                    name="popularity"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        Popularity
                                </TableHeading>
                                <th className="px-3 py-2">Category</th>
                                <TableHeading 
                                    name="created_at"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        Date Created
                                </TableHeading>
                                <th className="px-3 py-2">Created By</th>
                                <th className="px-3 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <thead className="text-white bg-sky-950">
                            <tr className="text-left border-b">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput 
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Product Name..."
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)}
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput 
                                    className="w-full"
                                    defaultValue={queryParams.category} 
                                    onChange={e => searchFieldChanged('category', e.target.value)}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="beauty">Beauty</option>
                                        <option value="appliances">Appliances</option>
                                        <option value="automotive">Automotive</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {products.data.map((product) => ( 
                            <tr className="border-b" key={product.id}>
                                <td className="px-3 py-2">{product.id}</td>
                                <td className="px-3 py-2">
                                    <img src={product.image_path} className="w-[50px] h-[50px] object-cover" alt="Product" />
                                </td>
                                <td className="px-3 py-2">{product.name}</td>
                                <td className="px-3 py-2">${product.price}</td>
                                <td className="px-3 py-2">{product.stock}</td>
                                <td className="px-3 py-2">
                                    <span className={"px-2 py-1 rounded " + 
                                    color_map[product.popularity]
                                    }>
                                        {pop_map[product.popularity]}
                                    </span>
                                </td>
                                <td className="px-3 py-2">
                                    <span>
                                        {category_map[product.category]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">{product.created_at}</td>
                                <td className="px-3 py-2">{product.createdBy.name}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href={route("products.edit", product.id)} 
                                    className="font-medium text-blue-600 hover:underline mx-1">
                                    Edit
                                    </Link>
                                    <button 
                                        onClick={(e) => deleteProduct(product)}
                                        className="font-medium text-red-600 hover:underline mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
                 <Pagination links={products.meta.links} />
                </div>

            </div>



        </AuthenticatedLayout>





    )

}