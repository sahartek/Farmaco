<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medical;
use App\Models\User;

class MedicalController extends Controller
{
    
        //
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        $medicals = Medical::with('user')->get();
        return response()->json($medicals);

    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $user_id = auth('api')->user()->id;
        $validatedData = $request->validate([
            "name" => "required", 
            "photo" => "required", 
            "description" => "required", 
            "expired_date" => "required", 
            "prix" => "required", 
        ]);
        // dd($request->file('photo'));

        $image = UploadController::upload($request->file('photo'));
        
        $validatedData["photo"] = $image;
        $medical = Medical::create($validatedData);
        $medical->user_id = $user_id;
        $medical->save();
        return response()->json([ 'medical' => $medical , 'message' => 'success' ]);
        

    }

    public function update(Request $request ,  $id)
    {
        $medical = Medical::find($id);
        
        if(User::find($medical->user_id)->id ==  auth('api')->user()->id) {
        
            $validatedData = $request->validate([
                "name" => "required", 
                "description" => "required", 
                "expired_date" => "required", 
                "prix" => "required", 
            ]);
            $medical->name = $validatedData['name'];
            if($request->hasFile('photo')){
                $image = UploadController::upload($request->file('photo'));
                $medical->photo =  $image;
             }
            $medical->description =  $validatedData['description'];
            $medical->expired_date =  $validatedData['expired_date'];
            $medical->prix =  $validatedData['prix'];

            $medical->save();
            return response()->json([ 'medical' => $medical , 'message' => 'success' ]);
        }
        
        return response()->json([ 'medical' => null , 'message' => 'failed' ]);

    }

}
