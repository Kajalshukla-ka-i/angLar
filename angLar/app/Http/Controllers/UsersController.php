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
    public function addDta(Request $req){
        // dd($req);
        $mess = array();
        $users = new student();
        $result = $users->addStudent($req->all());
        // return $usersview;
        if($result){
            $mess['code'] = 1;
            $mess['message'] = 'Details Submit Successfully !';
        }else{
            $mess['code'] = 2;
            $mess['message'] = 'Error While saving Please Try Again !';
        }

        return response()->json($mess);
        // dd($usersview);

    }
    public function deleteDta(Request $req){
        // dd($req);
        $id=$req->id;
        $mess = array();
        $users = new student();
        $result = $users->deleteStudent($id);
        // return $usersview;
        if($result){
            $mess['code'] = 1;
            $mess['message'] = 'Details Deleted Successfully !';
        }else{
            $mess['code'] = 2;
            $mess['message'] = 'Error While deleting Please Try Again !';
        }

        return response()->json($mess);
        // dd($usersview);

    }
}

