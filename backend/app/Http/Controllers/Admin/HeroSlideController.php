<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSlideController extends Controller
{
    public function index(Request $request)
    {
        $query = HeroSlide::query();

        if ($request->has('page_filter')) {
            $query->forPage($request->page_filter);
        }

        $slides = $query->ordered()->get();

        return response()->json($slides);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|max:5120', // 5MB
            'page' => 'required|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('background_image')) {
            $path = $request->file('background_image')->store('hero-slides', 'public');
            $validated['background_image'] = $path;
        }

        $slide = HeroSlide::create($validated);

        return response()->json($slide, 201);
    }

    public function show(HeroSlide $heroSlide)
    {
        return response()->json($heroSlide);
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|max:5120',
            'page' => 'sometimes|required|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('background_image')) {
            // Delete old image
            if ($heroSlide->background_image) {
                Storage::disk('public')->delete($heroSlide->background_image);
            }

            $path = $request->file('background_image')->store('hero-slides', 'public');
            $validated['background_image'] = $path;
        }

        $heroSlide->update($validated);

        return response()->json($heroSlide);
    }

    public function destroy(HeroSlide $heroSlide)
    {
        if ($heroSlide->background_image) {
            Storage::disk('public')->delete($heroSlide->background_image);
        }

        $heroSlide->delete();

        return response()->json(['message' => 'Hero slide deleted successfully']);
    }

    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'slides' => 'required|array',
            'slides.*.id' => 'required|exists:hero_slides,id',
            'slides.*.order' => 'required|integer',
        ]);

        foreach ($validated['slides'] as $slide) {
            HeroSlide::where('id', $slide['id'])->update(['order' => $slide['order']]);
        }

        return response()->json(['message' => 'Order updated successfully']);
    }
}
