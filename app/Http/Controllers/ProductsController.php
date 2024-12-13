<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use App\Http\Resources\ProductsResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Products::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name","like","%".request("name")."%");
        }
        if (request("category")) {
            $query->where("category", request("category"));
        }

        $products = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)->onEachSide(1);

        return inertia("Products/Index", [
            "products" => ProductsResource::collection($products),
            "queryParams" => request()->query() ?: null,
            "success" => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Products/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductsRequest $request)
    {
        $data = $request->validated();
        $image = $data["image"] ?? null;
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();
        if($image) {
            $data["image_path"] = $image->store("product/" . $data["name"], "public");
        }
        Products::create($data);

        return to_route("products.index")
            ->with("success", "Product was created!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $product)
    {
        return inertia("Products/Edit", [
            "product" => new ProductsResource($product),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductsRequest $request, Products $product)
    {

        $data = $request->validated();
        $image = $data["image"] ?? null;
        $data["updated_by"] = Auth::id();
        if($image) {
            if($product->image_path) {
                Storage::disk("public")->deleteDirectory(dirname($product->image_path));
            }
            $data["image_path"] = $image->store("product/" . $data["name"], "public");
        }
        $product->update($data);

        return to_route("products.index")
            ->with("success", "Product \"$product->name\" was updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $product)
    {
        //logger("Delete request received for product: " . ($products->id ?? 'unknown'));
        
            $name = $product->name;

            $product->delete();
            if($product->image_path) {
                Storage::disk("public")->deleteDirectory(dirname($product->image_path));
            }

            return to_route("products.index")
                    ->with("success", "Product \"$name\" was deleted!");
    }


    public function myProducts()
    {
        logger("My Products list: ");
        $user_id = Auth::id();
        $query = Products::query()->where("created_by", $user_id);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name","like","%".request("name")."%");
        }
        if (request("category")) {
            $query->where("category", request("category"));
        }

        $products = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)->onEachSide(1);

        
        //Retrieve total inventory value
        $totalInventoryValue = Products::query()
            ->select(DB::raw('SUM(stock * price) as total_value'))
            ->value('total_value');

        //Retrieve data for stock totals bar chart
        $stockCounts = Products::query()
            ->select('category', DB::raw('SUM(stock) as total_count'))
            ->groupBy('category')
            ->get();


        //Retrieve data for category pie chart

        $categoryCounts = Products::query()
            ->select('category', DB::raw('count(*) as total_count'))
            ->groupBy('category')
            ->get();

        //Retrieve data for popularity totals bar chart

        $popularityCounts = Products::query()
            ->select(
                'category',
                'popularity',
                DB::raw('count(*) as total_count')
            )
            ->whereIn('category', ['electronics', 'beauty', 'clothing', 'automotive', 'appliances']) // Limit to the 5 categories
            ->groupBy('category', 'popularity')
            ->get();

        
        // Fill missing popularity levels for each category, default them to 0
        $categories = ['electronics', 'beauty', 'clothing', 'automotive', 'appliances'];
        $popularityLevels = ['low', 'medium', 'high'];
        $defaultPopularityCounts = [];

        foreach ($categories as $category) {
            foreach ($popularityLevels as $level) {
                $defaultPopularityCounts[] = [
                    'category' => $category,
                    'popularity' => $level,
                    'total_count' => 0,
                ];
            }
        }

        $popularityCounts = collect($defaultPopularityCounts)
        ->map(function ($default) use ($popularityCounts) {
            $match = $popularityCounts->firstWhere(fn($p) => $p['category'] === $default['category'] && $p['popularity'] === $default['popularity']);
            return $match ?: $default;
        });

        $formattedData = $popularityCounts
            ->groupBy('category')
            ->map(function ($items, $category) {
                return [
                    'category' => ucfirst($category),
                    'low' => $items->firstWhere('popularity', 'low')->total_count ?? 0,
                    'medium' => $items->firstWhere('popularity', 'medium')->total_count ?? 0,
                    'high' => $items->firstWhere('popularity', 'high')->total_count ?? 0,
                ];
            })
            ->values();


        return inertia("Dashboard", [
            "products" => ProductsResource::collection($products),
            "queryParams" => request()->query() ?: null,
            "stockCounts" => $stockCounts,
            "categoryCounts" => $categoryCounts,
            "popularityCounts" => $formattedData,
            "totalInventoryValue" => $totalInventoryValue

        ]);
    }
}
