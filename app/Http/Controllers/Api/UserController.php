<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Get current user profile
     */
    public function profile(Request $request)
    {
        $user = Auth::user();
        
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_photo_url' => $user->profile_photo_url ?? null,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_photo_url' => $user->profile_photo_url ?? null,
            ]
        ]);
    }

    /**
     * Update user password
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }

    /**
     * Get user notifications
     */
    public function notifications(Request $request)
    {
        return response()->json([
            'notifications' => [
                [
                    'id' => 1,
                    'title' => 'New Assignment Available',
                    'message' => 'Module 2 Quiz is now available for submission',
                    'type' => 'assignment',
                    'read' => false,
                    'created_at' => now()->subHours(2)->toISOString()
                ],
                [
                    'id' => 2,
                    'title' => 'Course Progress Update',
                    'message' => 'You have completed 65% of Learn to Code with ChatGPT',
                    'type' => 'progress',
                    'read' => false,
                    'created_at' => now()->subHours(4)->toISOString()
                ],
                [
                    'id' => 3,
                    'title' => 'Welcome to SPEAR LMS',
                    'message' => 'Your application has been approved. Welcome to the program!',
                    'type' => 'system',
                    'read' => true,
                    'created_at' => now()->subDays(3)->toISOString()
                ]
            ],
            'unread_count' => 2
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markNotificationRead(Request $request, $id)
    {
        // In a real application, you would update the notification in the database
        return response()->json([
            'message' => 'Notification marked as read',
            'notification_id' => $id
        ]);
    }
}
