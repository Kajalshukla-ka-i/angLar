<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/login', function () {
    return view('login');
});
Route::get('users',[UsersController::class,'show']);
Route::get('users_vew',[UsersController::class,'getDta']);
Route::post('add_users',[UsersController::class,'addDta']);
Route::delete(('delete_users/{id}'),[UsersController::class,'deleteDta']);
// edit
Route::get(('edit_users/{id}'),[UsersController::class,'editDta']);
Route::patch(('update_users/{id}'),[UsersController::class,'updateDta']); // end