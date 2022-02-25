<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 
use UploadController;

class UserController extends Controller
{
       
    public function register(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'name'=>'required|max:55',
                'email'=>'email|required|',
                'phone'=>'required|',
                'adress'=>'required|',
                'password'=>'required|',//password_confirmation (the name of input for password confermation)
            ]);
            // return $request;
            $validatedData['password'] = bcrypt($request->password);
  
            // return $request;

            
            $user = User::create($validatedData); 


            return response()->json(['message' => 'success' ]);
        }catch(Exception $e) {
            return response()->json(['message' => 'error' ]);

        }
        

       
        $accessToken = $user->createToken('authToken')->accessToken;

        return response(['user'=> $user, 'access_token'=> $accessToken]);

    }



    public function login(Request $request)
    {

        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);
		if(!auth()->attempt($loginData)) {
            $failed = array (
                'user' => 
                array (
                  'id' => NULL,
                  'name' => NULL,
                  'email' => NULL,
                  'email_verified_at' => NULL,
                  'adress' => NULL,
                  'phone' => NULL,
                  'created_at' => NULL,
                  'updated_at' => NULL,
                ),
                'access_token' => '0',
            );
          return $failed;
        }
        $user = auth()->user();

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

		
		return response(['user' => auth()->user(), 'access_token' => $accessToken]);

        
    }
}
