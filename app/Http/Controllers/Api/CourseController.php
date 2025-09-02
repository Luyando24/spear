<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    /**
     * Get all courses for the current user
     */
    public function index(Request $request)
    {
        return response()->json([
            'courses' => [
                [
                    'id' => 1,
                    'title' => 'Introduction to Programming',
                    'description' => 'Learn the basics of programming concepts',
                    'duration' => '4 hours',
                    'progress' => 100,
                    'status' => 'completed',
                    'order' => 1
                ],
                [
                    'id' => 2,
                    'title' => 'Learn to Code with ChatGPT',
                    'description' => 'Advanced programming with AI assistance',
                    'duration' => '6 hours',
                    'progress' => 65,
                    'status' => 'in_progress',
                    'order' => 2
                ],
                [
                    'id' => 3,
                    'title' => 'Advanced Programming Concepts',
                    'description' => 'Deep dive into advanced programming',
                    'duration' => '8 hours',
                    'progress' => 0,
                    'status' => 'locked',
                    'order' => 3
                ],
                [
                    'id' => 4,
                    'title' => 'Web Development Basics',
                    'description' => 'HTML, CSS, and JavaScript fundamentals',
                    'duration' => '10 hours',
                    'progress' => 0,
                    'status' => 'locked',
                    'order' => 4
                ],
                [
                    'id' => 5,
                    'title' => 'Database Fundamentals',
                    'description' => 'Learn database design and SQL',
                    'duration' => '6 hours',
                    'progress' => 0,
                    'status' => 'locked',
                    'order' => 5
                ],
                [
                    'id' => 6,
                    'title' => 'Final Project',
                    'description' => 'Capstone project to demonstrate skills',
                    'duration' => '12 hours',
                    'progress' => 0,
                    'status' => 'locked',
                    'order' => 6
                ]
            ],
            'curriculum' => [
                'title' => 'MSSE Foundations Curriculum',
                'total_courses' => 6,
                'total_exams' => 0,
                'completed_courses' => 1
            ]
        ]);
    }

    /**
     * Get specific course details
     */
    public function show(Request $request, $id)
    {
        // Mock data for course details
        $courses = [
            1 => [
                'id' => 1,
                'title' => 'Introduction to Programming',
                'description' => 'Learn the basics of programming concepts and logic',
                'duration' => '4 hours',
                'progress' => 100,
                'status' => 'completed',
                'modules' => [
                    ['title' => 'What is Programming?', 'completed' => true],
                    ['title' => 'Variables and Data Types', 'completed' => true],
                    ['title' => 'Control Structures', 'completed' => true],
                    ['title' => 'Functions and Methods', 'completed' => true]
                ]
            ],
            2 => [
                'id' => 2,
                'title' => 'Learn to Code with ChatGPT',
                'description' => 'Advanced programming techniques using AI assistance',
                'duration' => '6 hours',
                'progress' => 65,
                'status' => 'in_progress',
                'modules' => [
                    ['title' => 'Introduction to AI-Assisted Coding', 'completed' => true],
                    ['title' => 'Prompt Engineering for Code', 'completed' => true],
                    ['title' => 'Debugging with AI', 'completed' => false],
                    ['title' => 'Code Review and Optimization', 'completed' => false]
                ]
            ]
        ];

        $course = $courses[$id] ?? null;

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        return response()->json(['course' => $course]);
    }

    /**
     * Update course progress
     */
    public function updateProgress(Request $request, $id)
    {
        $request->validate([
            'progress' => 'required|integer|min:0|max:100'
        ]);

        // In a real application, you would update the database
        // For now, we'll just return a success response
        return response()->json([
            'message' => 'Progress updated successfully',
            'course_id' => $id,
            'progress' => $request->progress
        ]);
    }
}
