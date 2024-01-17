<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'email',
        'class',
        'contact'
    ];

    public function getStudent($search)
    {
        if ($search != '') {
            $users = DB::table('users')
                ->join('students', 'students.user_id', '=', 'users.id')
                ->select('users.name', 'users.email', 'users.id', 'students.class', 'students.contact')
                ->where('users.name', 'like', "%$search%")
                ->orWhere('users.email', 'like', "%$search%")
                ->orWhere('students.class', 'like', "%$search%")
                ->orWhere('students.contact', 'like', "%$search%")
                ->orWhere('students.email', 'like', "%$search%")
                ->get();
        } else {
            $users = DB::table('users')
                ->join('students', 'students.user_id', '=', 'users.id')
                ->select('users.name', 'users.email', 'users.id', 'students.class', 'students.contact')
                ->get();
        }

        return $users;
    }

    public function geteditStudent($id)
    {
        $result =  DB::table('users')
            ->join('students', 'students.user_id', '=', 'users.id')
            ->select('users.name', 'users.email', 'users.id', 'students.class', 'students.contact')
            ->where('users.id', $id)
            ->get()->first();
        return $result;
    }

    public function updateStudent($id, $data)
    {

        try {

            $usersData = [
                'email' => $data['email'],
                'name' => $data['name']
            ];
            $studentData = [
                'class' => $data['class'],
                'email' => $data['email']
            ];
            $result =  DB::table('users')->where('id', $id)->update($usersData);
            $result =  DB::table('students')->where('user_id', $id)->update($studentData);
            return true;
        } catch (Exception $ex) {

            echo $ex->getMessage();
            return false;
        }
    }

    public function deleteStudent($id)
    {
        $result1 = DB::table('users')->where('id', $id)->delete();
        $result2 = DB::table('students')->where('user_id', $id)->delete();
        if ($result1 && $result2) {
            return true;
        }
        // return $result;
    }
}
