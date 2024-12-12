import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeading from "@/Components/TableHeading";
import { BarChart, PieChart } from '@mui/x-charts';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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


export default function Dashboard({ auth, products, queryParams = null, success, stockCounts, popularityCounts, categoryCounts, totalInventoryValue }) {
    
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
            router.get(route("products.myProducts"), queryParams);
        
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
        
        router.get(route("products.myProducts"), queryParams);
    }

    const customTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    
    console.log(totalInventoryValue)
    const lowData = popularityCounts.map(item => item.low);
    const mediumData = popularityCounts.map(item => item.medium);
    const highData = popularityCounts.map(item => item.high);

    // Combine data into an array of series for the chart
    const chartData = [
        { label: 'Low', data: lowData },
        { label: 'Medium', data: mediumData },
        { label: 'High', data: highData },
    ];
      //const valueFormatter = (item) => `${item.value}%`;
      

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
                    

                    <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
                        <p className="text-white">Total Inventory Value: </p>
                        <p className="text-green-500">${totalInventoryValue}</p>
                    </div>

                    <div className="flex flex-row items-center justify-center">

                    
                        <ThemeProvider theme={customTheme}> 
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: popularityCounts.map(item => item.category) }]}
                            series={chartData}
                            width={500}
                            height={400}
                            grid={{ horizontal: true }}
                        />
                        </ThemeProvider>

                        <ThemeProvider theme={customTheme}>
                            <PieChart
                                series={[
                                    {
                                    data: categoryCounts.map(data => ({
                                        label: data.category.charAt(0).toUpperCase() + data.category.slice(1),
                                        value: data.total_count,
                                    })),
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    },
                                ]}
                                width={500}
                                height={300}
                                
                            />
                        </ThemeProvider>

                        
                        <ThemeProvider theme={customTheme}> 
                            <BarChart
                                dataset={stockCounts.map(data => ({
                                    category: data.category.charAt(0).toUpperCase() + data.category.slice(1),
                                    total_count: Number(data.total_count),
                                }))}
                                yAxis={[
                                    { scaleType: 'band', dataKey: 'category', },
                                ]}
                                xAxis={[
                                    { scaleType: 'linear', label: 'Stock Quantity' },
                                ]}
                                series={[
                                    { dataKey: 'total_count', label: 'Total Stock Quantity' },
                                ]}
                                layout="horizontal"
                                width={500}
                                height={400}
                                grid={{ vertical: true}}
                                
                            />
                        </ThemeProvider>
                    </div>



                    <div className="bg-blue-300 p-6 rounded-lg shadow-lg">My Products</div>


                    
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
                                </tr>
                            </thead>
                            <thead className="text-white">
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
                                        defaultValue={queryParams.status} 
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
                                </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                     <Pagination links={products.meta.links} />
                    </div>
    
                </div>
        </AuthenticatedLayout>
    );
}
