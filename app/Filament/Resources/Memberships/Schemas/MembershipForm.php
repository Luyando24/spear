<?php

namespace App\Filament\Resources\Memberships\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MembershipForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('team_id')
                    ->required()
                    ->numeric(),
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('role')
                    ->default(null),
            ]);
    }
}
