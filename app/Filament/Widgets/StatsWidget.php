<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Users', User::count())
                ->description('Registered learners & instructors')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'),

            Stat::make('Courses', Course::count())
                ->description('Available courses')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('info'),

            Stat::make('Enrollments', Enrollment::count())
                ->description('Active course enrollments')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('warning'),

            Stat::make('Announcements', \App\Models\Announcement::count())
                ->description('Published announcements')
                ->descriptionIcon('heroicon-m-megaphone')
                ->color('primary'),

            Stat::make('Lessons', \App\Models\Lesson::count())
                ->description('Total lessons')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('info'),

            Stat::make('Quizzes', \App\Models\Quiz::count())
                ->description('Available quizzes')
                ->descriptionIcon('heroicon-m-question-mark-circle')
                ->color('success'),

            Stat::make('Submissions', \App\Models\Submission::count())
                ->description('Quiz submissions')
                ->descriptionIcon('heroicon-m-pencil-square')
                ->color('warning'),

            Stat::make('Memberships', \App\Models\Membership::count())
                ->description('Team memberships')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary'),
        ];
    }
}
