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



export default function Index({ auth, users, queryParams = null, success }){

    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
            router.get(route("user.index"), queryParams);
        
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
        
        router.get(route("user.index"), queryParams);
    }

    const deleteUser = (user) => {
        if(!window.confirm("WARNING: All products associated with user will be deleted. Confirm Deletion?")){
            return;
        }
        console.log("Deleting user with ID:", user.id);
        router.delete(route("user.destroy", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h1 className="text-white">Users</h1>

                    <Link href={route("user.create")} className="bg-emerald-500 py-1 px-3 text-white rounded
                    shadow transition-all hover:bg-emerald-600">
                    Add New User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            

            <div className="py-12">
                <div className="p-6 w-full text-black-400 bg-slate-700">
                {success && (
                    <div className="bg-emerald-500 py-2 px-4 mb-2 text-white rounded">
                        {success}
                    </div>
                )}
                 <div className="overflow-auto">
                    <table className=" bg-gray-700 rounded border-collapse border border-gray-300 mx-auto">
                        <thead className="text-white">
                            <tr className="text-left">
                                <TableHeading 
                                    name="id"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        ID
                                </TableHeading>
                                <TableHeading 
                                    name="name"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        Name
                                </TableHeading>
                                <th className="px-3 py-2">Email</th>
                                <TableHeading 
                                    name="created_at"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                        Date Created
                                </TableHeading>
                                <th className="px-3 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <thead className="text-white">
                            <tr className="text-left border-b">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput 
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="User Name..."
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)}
                                    />
                                </th>
                                <th className="px-3 py-2">
                                    <TextInput 
                                    className="w-full"
                                    defaultValue={queryParams.email}
                                    placeholder="Email..."
                                    onBlur={e => searchFieldChanged('email', e.target.value)}
                                    onKeyPress={e => onKeyPress('email', e)}
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {users.data.map((user) => ( 
                            <tr className="border-b" key={user.id}>
                                <td className="px-3 py-2">{user.id}</td>
                                <td className="px-3 py-2">{user.name}</td>
                                <td className="px-3 py-2 text-nowrap">{user.email}</td>
                                <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href={route("user.edit", user.id)} 
                                    className="font-medium text-blue-600 hover:underline mx-1">
                                    Edit
                                    </Link>
                                    <button 
                                        onClick={(e) => deleteUser(user)}
                                        className="font-medium text-red-600 hover:underline mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
                 <Pagination links={users.meta.links} />
                </div>

            </div>



        </AuthenticatedLayout>





    )

}