<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "price" => $this->price,
            "stock" => $this->stock,
            "category" => $this->category,
            "popularity" => $this->popularity,
            "createdBy" => new UserResource($this->createdBy),
            "updatedBy" => new UserResource($this->updatedBy),
            "created_at" => (new Carbon($this->created_at))->format("Y-m-d"),
            

        ];
    }
}
