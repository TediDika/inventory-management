# Inventory Management App

Product Management App designed to streamline product tracking and provide a clean overview of data through chart graphics.

## Frontend: 
Built using React with a visually rich interface styled with Tailwind CSS. Utilized Mui X for data visualization through charts.

## Backend: 
Developed using PHP and the Laravel Framework following the MVC design pattern. Implemented Models, Controllers, and Routes for RESTful API handling. Eloquent ORM and raw SQL for database querying. Form request data validation.

## Database: 
Managed with MySQL via XAMPP. Created database migrations for version control. Created factories and seeders to populate tables with sample data for testing and development.

## User Interface: 
Dashboard with interactive data visualization charts offering actionable insights. Tables for Products and Users featuring sorting, filtering, pagination, and color-coded indicators for clarity. Registration, login page and authentication. CRUD functionality for managing Products and Users via intuitive button interactions.

# Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/TediDika/inventory-management.git
    ```

2. **Navigate to the project folder:**

    ```bash
    cd inventory-management
    ```

3. **Install JavaScript dependencies:**

    ```bash
    npm install
    ```

4. **Install PHP dependencies:**

    ```bash
    composer install
    ```

5. **Configure the database in the `.env` file** with your local credentials. For example:
   ```bash
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=products_db
    DB_USERNAME=root
    DB_PASSWORD=

   ```

6. **Generate application key:**

    ```bash
    php artisan key:generate
    ```

7. **Run database migrations and seed sample data:**

    ```bash
    php artisan migrate:fresh --seed
    ```

8. **Link storage for media files:**

    ```bash
    php artisan storage:link
    ```

9. **Start Vite server:**

    ```bash
    npm run dev
    ```

10. **Start the Laravel development server:**

    ```bash
    php artisan serve
    ```

11. **Login using example account:**

    - **Email:** `tedi@example.com`
    - **Password:** `12345678`






