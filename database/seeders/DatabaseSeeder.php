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
            'name' => 'Tedi',
            'email' => 'Tedi@example.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time()
        ]);

        $users = User::factory(6)->create();

        if ($users->isEmpty()) {
            echo "No users were created.\n";
        } else {
            echo "6 users were created.\n";
        }

        // Create 25 products and randomly assign them to the users
        Products::factory()
            ->count(25)
            ->create(function () use ($users) {
                $randomUser = $users->random();
                return [
                    'created_by' => $randomUser->id,
                    'updated_by' => $randomUser->id,
                ];
            });
    }
}
