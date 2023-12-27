<?php

namespace App\Http\Controllers;

use App\Models\student;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    //
    public function show(){
        return 'Hi users';
    }

    public function getDta(){
        $users = new student();
        $usersview = $users->getStudent();
        return $usersview;

    }
}
