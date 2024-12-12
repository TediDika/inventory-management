import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, user }) {
    const {data, setData, post, errors, reset} = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",

        _method: "PUT",
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("user.update", user.id))
    }



    return (
        <AuthenticatedLayout 
        user={auth.user}
        header={
            <div className="flex justify-between items-center">
                <h1 className="text-white">
                    Edit User "{user.name}"
                </h1>
            </div>
        }>
        <Head title="Create New User" />

        <div className="py-12">
            <div className="p-6 w-full text-black-400 bg-slate-700">
                <div className="overflow-auto">
                    <form 
                    onSubmit={onSubmit}
                    className="p-4 sm:p-8 shadow sm:rounded-lg">
                        
                        <div className="mt-4">
                            <InputLabel htmlFor="user_name" value="User Name"/>
                            <TextInput 
                            id="user_name" 
                            type="text" 
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={e => setData("name", e.target.value)} />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email"/>
                            <TextInput 
                            id="email" 
                            type="text" 
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={e => setData("email", e.target.value)} />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password"/>
                            <TextInput 
                            id="password" 
                            type="password" 
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={e => setData("password", e.target.value)} />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
                            <TextInput 
                            id="password_confirmation" 
                            type="password" 
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={e => setData("password_confirmation", e.target.value)} />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                        <div className="mt-4 text-right">
                            <Link
                                href={route("user.index")}
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