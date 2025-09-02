<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Get dashboard overview data
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        return response()->json([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'profile_photo_url' => $user->profile_photo_url ?? null,
            ],
            'stats' => [
                'total_courses' => 6,
                'completed_courses' => 1,
                'hours_studied' => 24,
                'current_progress' => 65
            ],
            'current_course' => [
                'id' => 1,
                'title' => 'Learn to Code with ChatGPT',
                'description' => 'MSSE Foundations • Module 2 of 6',
                'progress' => 65,
                'last_accessed' => '2 hours ago',
                'status' => 'in_progress'
            ],
            'application_status' => [
                'status' => 'approved',
                'message' => 'Your application has been approved! Continue with your coursework.'
            ]
        ]);
    }

    /**
     * Get upcoming deadlines
     */
    public function deadlines(Request $request)
    {
        return response()->json([
            'deadlines' => [
                [
                    'id' => 1,
                    'title' => 'Module 2 Quiz',
                    'due_date' => now()->addDays(2)->toISOString(),
                    'priority' => 'high',
                    'course' => 'Learn to Code with ChatGPT'
                ],
                [
                    'id' => 2,
                    'title' => 'Project Submission',
                    'due_date' => now()->addWeek()->toISOString(),
                    'priority' => 'medium',
                    'course' => 'Learn to Code with ChatGPT'
                ]
            ]
        ]);
    }

    /**
     * Get quick resources
     */
    public function resources(Request $request)
    {
        return response()->json([
            'resources' => [
                [
                    'id' => 1,
                    'title' => 'Study Guides',
                    'icon' => 'fas fa-book-open',
                    'url' => '/resources/study-guides',
                    'color' => 'purple'
                ],
                [
                    'id' => 2,
                    'title' => 'Video Tutorials',
                    'icon' => 'fas fa-video',
                    'url' => '/resources/videos',
                    'color' => 'green'
                ],
                [
                    'id' => 3,
                    'title' => 'Discussion Forum',
                    'icon' => 'fas fa-users',
                    'url' => '/forum',
                    'color' => 'blue'
                ]
            ]
        ]);
    }
}
