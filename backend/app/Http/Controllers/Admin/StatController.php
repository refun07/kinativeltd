<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Stat;
use Illuminate\Http\Request;

class StatController extends Controller
{
    public function index(Request $request)
    {
        $query = Stat::query();
        if ($request->has('page_filter')) {
            $query->forPage($request->page_filter);
        }
        return response()->json($query->ordered()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:50',
            'label' => 'required|string|max:255',
            'page' => 'required|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        return response()->json(Stat::create($validated), 201);
    }

    public function show(Stat $stat)
    {
        return response()->json($stat);
    }

    public function update(Request $request, Stat $stat)
    {
        $validated = $request->validate([
            'value' => 'sometimes|required|string|max:50',
            'label' => 'sometimes|required|string|max:255',
            'page' => 'sometimes|required|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $stat->update($validated);
        return response()->json($stat);
    }

    public function destroy(Stat $stat)
    {
        $stat->delete();
        return response()->json(['message' => 'Stat deleted']);
    }
}
