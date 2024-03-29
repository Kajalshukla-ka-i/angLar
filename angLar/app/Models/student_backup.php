<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class student extends Model
{
    use HasFactory;
    public function getStudent(){
        return DB::table('student')->get();
    }
    public function addStudent($data){
        $result =  DB::table('student')->insert($data);
        return $result;
    }

    public function deleteStudent($id){
        $result = DB::table('student')->where('id',$id)->delete();
        return $result;
    }

    public function geteditStudent($id){
        $result =  DB::table('student')->select('name','class','email','id')->where('id',$id)->get()->first();
        return $result;
    }

    public function updateStudent($id,$data){
        $result =  DB::table('student')->where('id',$id)->update($data);
        return $result;
    }
}
