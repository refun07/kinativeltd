<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'service' => 'required|string',
            'budget' => 'required|string',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        // Send email to admin
        try {
            Mail::send([], [], function ($message) use ($data) {
                $message->to('azmirkinative@gmail.com')
                    ->subject('New Contact Form Submission - Kinative')
                    ->setBody("
                        <h3>New Project Inquiry</h3>
                        <p><strong>Name:</strong> {$data['name']}</p>
                        <p><strong>Email:</strong> {$data['email']}</p>
                        <p><strong>Service:</strong> {$data['service']}</p>
                        <p><strong>Budget:</strong> {$data['budget']}</p>
                        <p><strong>Message:</strong></p>
                        <p>{$data['message']}</p>
                    ", 'text/html');
            });

            return response()->json(['message' => 'Message sent successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to send message. Please try again later.'], 500);
        }
    }
}
