<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    /** @use HasFactory<\Database\Factories\ProductsFactory> */
    use HasFactory;

    protected $fillable = ["image_path", "name", "price", "stock", "category", "popularity",
    "created_by", "updated_by"];

    // Define the relationship for the user who created the product
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Define the relationship for the user who updated the product
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
