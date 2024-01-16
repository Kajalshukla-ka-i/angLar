<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [ApiController::class, 'login']);
Route::post('register', [ApiController::class, 'register']);

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('logout', [ApiController::class, 'logout']);
    Route::get('user', [ApiController::class, 'get_user']);

    Route::get('users_vew',[StudentController::class,'getDta']);
    // Route::post('add_users',[UsersController::class,'addDta']);
    Route::delete(('delete_users/{id}'),[StudentController::class,'deleteDta']);
    
    // to edit
    Route::get(('edit_users/{id}'), [StudentController::class, 'editDta']);
    Route::patch(('update_users/{id}'), [StudentController::class, 'updateDta']); // end
});



// Route::get('logout/{token}', [ApiController::class, 'logout']);

// Route::get('user', [ApiController::class, 'get_user']);
// Route::get('oneuser/{id}', [ApiController::class, 'get_one_user']);
// Route::post('student', [StudentController::class, 'getData']);
// Route::post('addstudent', [UsersController::class, 'addData']);
// Route::delete('deleteStudent/{id}', [StudentController::class, 'deleteData']);

// // route to get records to edit
// Route::get('getOneStudent/{id}', [StudentController::class, 'getOneData']);
// // route to update, modifies record
// Route::patch('updateStudent/{id}', [StudentController::class, 'updateData']);
