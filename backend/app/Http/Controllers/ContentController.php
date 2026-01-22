<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use App\Models\Service;
use App\Models\CaseStudy;
use App\Models\TeamMember;
use App\Models\Stat;
use App\Models\ClientLogo;
use App\Models\PageSection;
use Illuminate\Http\Request;

/**
 * Public API for fetching content (no auth required)
 */
class ContentController extends Controller
{
    public function heroSlides(Request $request)
    {
        $page = $request->input('page', 'home');
        $slides = HeroSlide::active()->forPage($page)->ordered()->get();
        return response()->json($slides);
    }

    public function services(Request $request)
    {
        $query = Service::active()->ordered();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        return response()->json($query->get());
    }

    public function caseStudies(Request $request)
    {
        $query = CaseStudy::ordered();

        if ($request->has('featured')) {
            $query->featured();
        }

        return response()->json($query->get());
    }

    public function caseStudy($slugOrId)
    {
        $caseStudy = CaseStudy::where('slug', $slugOrId)
            ->orWhere('id', $slugOrId)
            ->firstOrFail();

        return response()->json($caseStudy);
    }

    public function teamMembers()
    {
        $members = TeamMember::active()->ordered()->get();
        return response()->json($members);
    }

    public function stats(Request $request)
    {
        $page = $request->input('page', 'home');
        $stats = Stat::active()->forPage($page)->ordered()->get();
        return response()->json($stats);
    }

    public function clientLogos()
    {
        $logos = ClientLogo::active()->ordered()->get();
        return response()->json($logos);
    }

    public function pageSections(Request $request)
    {
        $page = $request->input('page', 'home');
        $sections = PageSection::active()->forPage($page)->ordered()->get();
        return response()->json($sections);
    }
}
