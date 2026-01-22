<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\Request;

class PageSectionController extends Controller
{
    public function index(Request $request)
    {
        $query = PageSection::query();
        if ($request->has('page')) {
            $query->forPage($request->page);
        }
        if ($request->has('section_type')) {
            $query->byType($request->section_type);
        }
        return response()->json($query->ordered()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string|max:50',
            'section_type' => 'required|string|max:50',
            'title' => 'nullable|string|max:255',
            'content' => 'required|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        return response()->json(PageSection::create($validated), 201);
    }

    public function show(PageSection $pageSection)
    {
        return response()->json($pageSection);
    }

    public function update(Request $request, PageSection $pageSection)
    {
        $validated = $request->validate([
            'page' => 'sometimes|required|string|max:50',
            'section_type' => 'sometimes|required|string|max:50',
            'title' => 'nullable|string|max:255',
            'content' => 'sometimes|required|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $pageSection->update($validated);
        return response()->json($pageSection);
    }

    public function destroy(PageSection $pageSection)
    {
        $pageSection->delete();
        return response()->json(['message' => 'Page section deleted']);
    }
}
