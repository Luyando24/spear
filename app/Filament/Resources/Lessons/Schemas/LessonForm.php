<?php

namespace App\Filament\Resources\Lessons\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class LessonForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('course_id')
                    ->required()
                    ->numeric(),
                TextInput::make('title')
                    ->required(),
                Textarea::make('content')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('order')
                    ->numeric()
                    ->default(null),
                TextInput::make('duration')
                    ->numeric()
                    ->default(null),
                TextInput::make('type')
                    ->default(null),
                TextInput::make('resource_url')
                    ->default(null),
                Toggle::make('is_preview')
                    ->required(),
                Textarea::make('summary')
                    ->default(null)
                    ->columnSpanFull(),
                Textarea::make('attachments')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
