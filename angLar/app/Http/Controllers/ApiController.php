<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator; //as FacadesValidator;
// use Illuminate\Validation\Validator;
use Symfony\Component\HttpFoundation\Response; //as HttpFoundationResponse;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiController extends Controller
{
    //

    public function register(Request $req)
    {
        $data = $req->only('name' ,'email' ,'password');
        $validator =  Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors() ], 200);
        }

        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => bcrypt($req->password) 
        ]);
        if ($user) {
            return response()->json([
                'success' => true,
                'code'=>1,
                'message' => 'Users Created Successfully',
                'data' => $user
            ], Response::HTTP_OK);
        }
    }

    public function login(Request $req){

        $credenctials = $req->only('email', 'password');


        $validator = Validator::make($credenctials,[
            'email' => 'required|email',
            'password'=> 'required|string|min:6'
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors() ], 200);
        }

        try{
            if(! $token = JWTAuth::attempt($credenctials)){
                return response()->json([
                    'success' => false,
                    'message' => 'Login Credencials are invalid',
                ],400);

            }
        }catch(JWTException $e){
            return $credenctials;
            return response()->json([
                'success' => false,
                'message' => 'Could not create token',
            ],400);

        }
        return response()->json([
            'success' => true,
            'token' => $token,
            'message'=> 'Login Successfully',
            'code'=>1,
            'userDetails' => $credenctials['email']
        ]);

    }


}
