<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CaseStudyController extends Controller
{
    public function index(Request $request)
    {
        $query = CaseStudy::query();

        if ($request->has('featured')) {
            $query->featured();
        }

        $caseStudies = $query->ordered()->get();

        return response()->json($caseStudies);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'full_description' => 'nullable|string',
            'image' => 'required|image|max:5120',
            'client' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'tags' => 'nullable|array',
            'slug' => 'nullable|string|unique:case_studies,slug|max:255',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('case-studies', 'public');
            $validated['image'] = $path;
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $caseStudy = CaseStudy::create($validated);

        return response()->json($caseStudy, 201);
    }

    public function show($id)
    {
        // Support both ID and slug
        $caseStudy = CaseStudy::where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();

        return response()->json($caseStudy);
    }

    public function update(Request $request, CaseStudy $caseStudy)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:100',
            'description' => 'nullable|string',
            'full_description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'client' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'tags' => 'nullable|array',
            'slug' => 'nullable|string|unique:case_studies,slug,' . $caseStudy->id . '|max:255',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            if ($caseStudy->image) {
                Storage::disk('public')->delete($caseStudy->image);
            }

            $path = $request->file('image')->store('case-studies', 'public');
            $validated['image'] = $path;
        }

        $caseStudy->update($validated);

        return response()->json($caseStudy);
    }

    public function destroy(CaseStudy $caseStudy)
    {
        if ($caseStudy->image) {
            Storage::disk('public')->delete($caseStudy->image);
        }

        $caseStudy->delete();

        return response()->json(['message' => 'Case study deleted successfully']);
    }
}
