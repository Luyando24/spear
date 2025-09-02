<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'target_role',
        'created_by',
        'created_at',
        'expires_at',
        'is_active',
        'attachments',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'attachments' => 'array',
        'created_at' => 'datetime',
        'expires_at' => 'datetime',
    ];
}
