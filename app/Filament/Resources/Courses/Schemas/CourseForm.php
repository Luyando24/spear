<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('category')
                    ->default(null),
                TextInput::make('thumbnail')
                    ->default(null),
                TextInput::make('instructor_id')
                    ->required()
                    ->numeric(),
                DatePicker::make('start_date'),
                DatePicker::make('end_date'),
                TextInput::make('status')
                    ->default(null),
                TextInput::make('price')
                    ->numeric()
                    ->default(null)
                    ->prefix('$'),
                TextInput::make('level')
                    ->default(null),
                TextInput::make('language')
                    ->default(null),
                Textarea::make('prerequisites')
                    ->default(null)
                    ->columnSpanFull(),
                Textarea::make('tags')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
