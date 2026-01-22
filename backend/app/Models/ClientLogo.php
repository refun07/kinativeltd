<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientLogo extends Model
{
    protected $fillable = [
        'name',
        'logo_path',
        'website_url',
        'order',
        'is_active',
    ];

    protected $appends = ['logo_url'];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function getLogoUrlAttribute()
    {
        return $this->logo_path ? asset('storage/' . $this->logo_path) : null;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
