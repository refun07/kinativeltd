<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientLogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientLogoController extends Controller
{
    public function index()
    {
        return response()->json(ClientLogo::ordered()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_path' => 'required|image|max:2048',
            'website_url' => 'nullable|url|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo_path')) {
            $validated['logo_path'] = $request->file('logo_path')->store('clients', 'public');
        }

        return response()->json(ClientLogo::create($validated), 201);
    }

    public function show(ClientLogo $clientLogo)
    {
        return response()->json($clientLogo);
    }

    public function update(Request $request, ClientLogo $clientLogo)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'logo_path' => 'nullable|image|max:2048',
            'website_url' => 'nullable|url|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo_path')) {
            if ($clientLogo->logo_path) {
                Storage::disk('public')->delete($clientLogo->logo_path);
            }
            $validated['logo_path'] = $request->file('logo_path')->store('clients', 'public');
        }

        $clientLogo->update($validated);
        return response()->json($clientLogo);
    }

    public function destroy(ClientLogo $clientLogo)
    {
        if ($clientLogo->logo_path) {
            Storage::disk('public')->delete($clientLogo->logo_path);
        }
        $clientLogo->delete();
        return response()->json(['message' => 'Client logo deleted']);
    }
}
