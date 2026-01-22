<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\RefreshToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return $this->issueTokens($user);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        return $this->issueTokens(Auth::user());
    }

    public function logout(Request $request)
    {
        // Revoke access token
        $request->user()->currentAccessToken()->delete();

        // Revoke refresh token if present
        $refreshToken = $request->input('refresh_token');
        if ($refreshToken) {
            RefreshToken::where('token', $refreshToken)->update(['revoked_at' => now()]);
        }

        return response()->json(['message' => 'Logged out']);
    }

    public function refresh(Request $request)
    {
        $token = $request->input('refresh_token');

        if (!$token) {
            return response()->json(['message' => 'No refresh token'], 401);
        }

        $refreshToken = RefreshToken::where('token', $token)
            ->where('expires_at', '>', now())
            ->whereNull('revoked_at')
            ->first();

        if (!$refreshToken) {
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }

        // Token Rotation: Revoke old, issue new
        $refreshToken->update(['revoked_at' => now()]);

        return $this->issueTokens($refreshToken->user);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    private function issueTokens(User $user)
    {
        // Issue Access Token (Sanctum)
        $accessToken = $user->createToken('access_token')->plainTextToken;

        // Issue Refresh Token
        $refreshTokenString = Str::random(64);
        RefreshToken::create([
            'user_id' => $user->id,
            'token' => $refreshTokenString,
            'expires_at' => now()->addDays(7),
        ]);

        // Return response with Access Token and Refresh Token in body
        return response()->json([
            'access_token' => $accessToken,
            'refresh_token' => $refreshTokenString,
            'user' => $user,
        ]);
    }
}
