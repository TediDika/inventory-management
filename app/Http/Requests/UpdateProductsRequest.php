<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductsRequest extends FormRequest
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
            "name" => ["nullable", "max:255"],
            "price" => ["nullable", "min:0", "max:1000000"],
            "stock" => ["nullable", "min:0", "max:1000000"],
            "popularity" => ["nullable", Rule::in(["low", "medium", "high"])],
            "category" => ["nullable", Rule::in(["electronics", "clothing", "beauty", "appliances", "automotive"])],
        ];
    }
}
