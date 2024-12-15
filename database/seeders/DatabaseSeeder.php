<?php

namespace Database\Seeders;

use App\Models\Products;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Tedi Dika',
            'email' => 'tedi@example.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time()
        ]);

        User::factory()->create([
            'name' => 'Alejandro Diaz',
            'email' => 'alejandro@example.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time()
        ]);

        User::factory()->create([
            'name' => 'Yubin Lim',
            'email' => 'yubin@example.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time()
        ]);

        $users = User::factory(20)->create();

        if ($users->isEmpty()) {
            echo "No users were created.\n";
        } else {
            echo "20 users were created.\n";
        }

        // Create 100 products and randomly assign them to the users
        $products = Products::factory()
                        ->count(100)
                        ->create(function () use ($users) {
                            $randomUser = $users->random();
                            return [
                                'created_by' => $randomUser->id,
                                'updated_by' => $randomUser->id,
                            ];
                        });

        if ($products->isEmpty()) {
            echo "No products were created.\n";
        } else {
            echo "100 products were created.\n";
        }
    }
}
