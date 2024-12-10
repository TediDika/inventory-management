<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use App\Http\Resources\ProductsResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
    public function edit($id)
    {
        $product = Products::find($id);

        if (!$product) {
            return to_route("products.index")
                ->with("error", "Product not found.");
        }
        //logger("Edit request received for product: " . ($product ?? 'unknown'));

        return inertia("Products/Edit", [
            "product" => new ProductsResource($product),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductsRequest $request, $id)
    {

        $product = Products::find($id);

        if (!$product) {
            return to_route("products.index")
                ->with("error", "Product not found.");
        }

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
    public function destroy($id)
    {
        //logger("Delete request received for product: " . ($products->id ?? 'unknown'));
        //$name = $products->name;
        
            $product = Products::find($id);

            if (!$product) {
                return to_route("products.index")
                    ->with("error", "Product not found.");
            }

            $name = $product->name;

            $product->delete();
            if($product->image_path) {
                logger("Delete request for directory: " . ($product->image_path ?? 'unknown'));
                Storage::disk("public")->deleteDirectory(dirname($product->image_path));
            }

            return to_route("products.index")
                    ->with("success", "Product \"$name\" was deleted!");
    }
}
