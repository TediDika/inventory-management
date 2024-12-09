import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const {data, setData, post, errors, reset} = useForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        popularity: "",
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("products.store"))
    }

    return (
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex justify-between items-center">
                <h1 className="text-white">
                    Create New Product
                </h1>
            </div>
        }>
        <Head title="Create New Product" />

        <div className="py-12">
            <div className="p-6 w-full text-black-400 bg-slate-700">
                <div className="overflow-auto">
                    <form 
                    onSubmit={onSubmit}
                    className="p-4 sm:p-8 shadow sm:rounded-lg">
                        <div>
                            <InputLabel htmlFor="product_image_path" value="Product Image"/>
                            <TextInput 
                            id="product_image_path" 
                            type="file" 
                            name="image"
                            className="mt-1 block w-full"
                            onChange={e => setData("image", e.target.files[0])} />
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="product_name" value="Product Name"/>
                            <TextInput 
                            id="product_name" 
                            type="text" 
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData("name", e.target.value)} />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="product_price" value="Product Price"/>
                            <TextInput 
                            id="product_price" 
                            type="number" 
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full"
                            min="0"
                            step="0.01"
                            onChange={e => setData("price", e.target.value)} />
                            <InputError message={errors.price} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="product_stock" value="Stock Quanitity"/>
                            <TextInput 
                            id="product_stock" 
                            type="number" 
                            name="stock"
                            value={data.stock}
                            className="mt-1 block w-full"
                            min="0"
                            onChange={e => setData("stock", e.target.value)} />
                            <InputError message={errors.stock} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="product_pop" value="Product Popularity" />

                            <SelectInput
                                name="popularity"
                                id="product_pop"
                                className="mt-1 block w-full"
                                onChange={(e) => setData("popularity", e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </SelectInput>

                            <InputError message={errors.popularity} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="product_cat" value="Product Category" />

                            <SelectInput
                                name="category"
                                id="product_cat"
                                className="mt-1 block w-full"
                                onChange={(e) => setData("category", e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="beauty">Beauty</option>
                                <option value="appliances">Appliances</option>
                                <option value="automotive">Automotive</option>
                            </SelectInput>

                            <InputError message={errors.category} className="mt-2" />
                        </div>
                        <div className="mt-4 text-right">
                            <Link
                                href={route("products.index")}
                                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                            >
                                Cancel
                            </Link>
                            <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}