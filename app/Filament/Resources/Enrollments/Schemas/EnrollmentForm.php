<?php

namespace App\Filament\Resources\Enrollments\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class EnrollmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('course_id')
                    ->required()
                    ->numeric(),
                TextInput::make('progress')
                    ->required()
                    ->numeric()
                    ->default(0),
                DatePicker::make('completion_date'),
                DateTimePicker::make('enrolled_at'),
                TextInput::make('certificate_url')
                    ->default(null),
                Toggle::make('is_active')
                    ->required(),
                Textarea::make('feedback')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
