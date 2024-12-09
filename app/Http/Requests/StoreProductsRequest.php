<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "image" => ["nullable", "image"],
            "name" => ["required", "max:255"],
            "price" => ["required", "min:0", "max:1000000"],
            "stock" => ["required", "min:0", "max:1000000"],
            "popularity" => ["required", Rule::in(["low", "medium", "high"])],
            "category" => ["required", Rule::in(["electronics", "clothing", "beauty", "appliances", "automotive"])],
        ];
    }
}
