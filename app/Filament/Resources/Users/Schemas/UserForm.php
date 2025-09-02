<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                DateTimePicker::make('email_verified_at'),
                TextInput::make('password')
                    ->password()
                    ->required(),
                Textarea::make('two_factor_secret')
                    ->default(null)
                    ->columnSpanFull(),
                Textarea::make('two_factor_recovery_codes')
                    ->default(null)
                    ->columnSpanFull(),
                DateTimePicker::make('two_factor_confirmed_at'),
                TextInput::make('role')
                    ->default(null),
                TextInput::make('rank')
                    ->default(null),
                TextInput::make('service_number')
                    ->default(null),
                TextInput::make('unit')
                    ->default(null),
                TextInput::make('branch')
                    ->default(null),
                DatePicker::make('date_of_birth'),
                TextInput::make('gender')
                    ->default(null),
                DatePicker::make('date_joined'),
                TextInput::make('deployment_status')
                    ->default(null),
                Textarea::make('emergency_contact')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('clearance_level')
                    ->default(null),
                Textarea::make('chain_of_command')
                    ->default(null)
                    ->columnSpanFull(),
                DateTimePicker::make('last_activity_at'),
                Toggle::make('is_active')
                    ->required(),
                Toggle::make('profile_completed')
                    ->required(),
                TextInput::make('profile_photo_path')
                    ->default(null),
                Textarea::make('bio')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('status')
                    ->default(null),
                DateTimePicker::make('last_login_at'),
                TextInput::make('phone')
                    ->tel()
                    ->default(null),
                TextInput::make('address')
                    ->default(null),
                Textarea::make('settings')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('current_team_id')
                    ->numeric()
                    ->default(null),
            ]);
    }
}
