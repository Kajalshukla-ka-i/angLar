<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator; //as FacadesValidator;
// use Illuminate\Validation\Validator;
use Symfony\Component\HttpFoundation\Response; //as HttpFoundationResponse;
use Tymon\JWTAuth\Exceptions\JWTException;


class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $user;

    public function __construct()
    {
        JWTAuth::parseToken()->authenticate();
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    public function getDta()
    {
        // $search = $req->search;
        $studentModel = new student();
        // $data = $studentModel->getStudent($search);
        // return response()->json($data);
        $usersview = $studentModel->getStudent();
        return $usersview;
    }
    
    public function getData(Request $req)
    {
        $search = $req->search;
        $limit = $req->limit;
        $skip = $req->skip;
        $sort_value =  $req->sort_value;
        $sort_order =  $req->sort_order;

        $studentModel = new student();
        $data = $studentModel->getStudent($search, $limit, $skip, $sort_value,$sort_order);
        $dataCount = $studentModel->getStudentCount($search, $limit, $skip , $sort_value, $sort_order);
        $response = array(
            'data' =>  $data,
            'count' => $dataCount
        );
        return response()->json($response);
        // $usersview = $student->getStudent();
        // return $usersview;
    }
    public function editDta(Request $req)
    {
        $users = new student();
        $id = $req->id;
        $usersview = $users->geteditStudent($id);
        // return $usersview;
        return response()->json($usersview);
    }

    public function updateDta(Request $req)
    {
        // dd($req);
        $mess = array();
        $id = $req->id;
        $users = new student();
        $result = $users->updateStudent($id, $req->all());
        // return $usersview;
        if ($result) {
            $mess['code'] = 1;
            $mess['message'] = 'Details Updated Successfully !';
        } else {
            $mess['code'] = 2;
            $mess['message'] = 'Error While updating Please Try Again !';
        }

        return response()->json($mess);
        // dd($usersview);

    }


    public function deleteDta(Request $req)
    {
        // dd($req);
        $id = $req->id;
        $mess = array();
        $users = new student();
        $result = $users->deleteStudent($id);
        // return $usersview;
        if ($result) {
            $mess['code'] = 1;
            $mess['message'] = 'Details Deleted Successfully !';
        } else {
            $mess['code'] = 2;
            $mess['message'] = 'Error While deleting Please Try Again !';
        }

        return response()->json($mess);
        // dd($usersview);

    }
}
