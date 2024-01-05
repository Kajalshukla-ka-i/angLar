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
}
