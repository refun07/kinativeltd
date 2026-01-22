<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        $services = $query->ordered()->get();

        return response()->json($services);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'identifier' => 'required|string|max:10',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_path' => 'nullable|image|max:2048',
            'category' => 'required|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('icon_path')) {
            $path = $request->file('icon_path')->store('service-icons', 'public');
            $validated['icon_path'] = $path;
        }

        $service = Service::create($validated);

        return response()->json($service, 201);
    }

    public function show(Service $service)
    {
        return response()->json($service);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'identifier' => 'sometimes|required|string|max:10',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'icon_path' => 'nullable|image|max:2048',
            'category' => 'sometimes|required|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('icon_path')) {
            if ($service->icon_path) {
                Storage::disk('public')->delete($service->icon_path);
            }

            $path = $request->file('icon_path')->store('service-icons', 'public');
            $validated['icon_path'] = $path;
        }

        $service->update($validated);

        return response()->json($service);
    }

    public function destroy(Service $service)
    {
        if ($service->icon_path) {
            Storage::disk('public')->delete($service->icon_path);
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }
}
