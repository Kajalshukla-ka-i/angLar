<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
        $data = $req->only('name', 'email', 'password', 'class', 'contact');

        $pro_pic = $req->file('file');
        $uploadPath = "images/profile";
        $orginal_name =  $pro_pic->getClientOriginalName();
        $pro_pic->move($uploadPath, $orginal_name);

        $validator =  Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'contact' => 'required|min:10',
            'class' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => bcrypt($req->password)
        ]);

        if ($user) {

            $student = Student::create([
                'user_id' => $user->id,
                'email' => $req->email,
                'class' => $req->class,
                'contact' => $req->contact,
                'profile_image' => $orginal_name,
                // 'password' => bcrypt($req->password) 
            ]);
            
            if ($student) {

                $data = array('name' => $req->name, "email" => $req->email, "contact" => $req->contact);
                Mail::send('templates.register_email', $data, function ($message) {
                    $message->to('erkajalshukla@gmail.com', 'Kajal Shukla')->subject('Laravel Mail sending');
                    $message->from('suryavanshi.kj@gmail.com', 'Kajal Shukla');
                });
                // echo "Mail send,  Kindly Check your Mail";
                return response()->json([
                    'success' => true,
                    'code' => 1,
                    'message' => 'Users Created Successfully & Mail send successfully',
                    'data' => $user
                ], Response::HTTP_OK);
            }
            // return response()->json([
            //     'success' => true,
            //     'code'=>1,
            //     'message' => 'Users Created Successfully',
            //     'data' => $user
            // ], Response::HTTP_OK);
        }
    }

    public function login(Request $req)
    {

        $credenctials = $req->only('email', 'password');


        $validator = Validator::make($credenctials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        try {
            if (!$token = JWTAuth::attempt($credenctials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Login Credencials are invalid',
                ], 400);
            }
        } catch (JWTException $e) {
            return $credenctials;
            return response()->json([
                'success' => false,
                'message' => 'Could not create token',
            ], 400);
        }
        return response()->json([
            'success' => true,
            'token' => $token,
            'message' => 'Login Successfully',
            'code' => 1,
            'userDetails' => $credenctials['email']
        ]);
    }

    public function logout(Request $req)
    {
        if (empty($req->token)) {
            return response()->json([
                'success' => false,
                'code' => 2,
                'message' => 'Token is required'
            ]);
        }

        try {
            JWTAuth::invalidate($req->token);
            return response()->json([
                'success' => true,
                'code' => 1,
                'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'code' => 2,
                'message' => 'Sorry user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
