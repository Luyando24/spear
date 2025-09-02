<?php

namespace App\Filament\Resources\Submissions\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SubmissionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('quiz_id')
                    ->required()
                    ->numeric(),
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                Textarea::make('answers')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('score')
                    ->numeric()
                    ->default(null),
                DateTimePicker::make('submitted_at'),
                Textarea::make('feedback')
                    ->default(null)
                    ->columnSpanFull(),
                Toggle::make('is_graded')
                    ->required(),
                TextInput::make('grader_id')
                    ->numeric()
                    ->default(null),
            ]);
    }
}
