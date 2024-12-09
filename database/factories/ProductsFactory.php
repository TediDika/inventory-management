<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_path' => fake()->imageUrl(),
            'name' => fake()->word(), // Random word for product name
            'price' => fake()->randomFloat(2, 1, 1000), // Random price between 1 and 1000
            'stock' => fake()->numberBetween(0, 500), // Random stock value
            'category' => fake()->randomElement(['electronics', 'clothing', 'beauty', 'appliances', 'automotive']), // Random category
            'popularity' => fake()->randomElement(['low', 'medium', 'high']), // Random popularity level
        ];
    }
}
