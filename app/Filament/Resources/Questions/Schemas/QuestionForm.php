<?php

namespace App\Filament\Resources\Questions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class QuestionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('quiz_id')
                    ->required()
                    ->numeric(),
                Textarea::make('question_text')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('type')
                    ->required(),
                Textarea::make('options')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('correct_answer')
                    ->default(null),
                TextInput::make('points')
                    ->required()
                    ->numeric()
                    ->default(1),
                Textarea::make('explanation')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('media_url')
                    ->default(null),
                Toggle::make('shuffle_options')
                    ->required(),
            ]);
    }
}
