<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminUploadController extends Controller
{
    /**
     * Upload a file
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
        ]);

        $file = $request->file('file');

        // Generate unique filename
        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();

        // Store in public/uploads directory
        $path = $file->storeAs('uploads', $filename, 'public');

        // Create upload record
        $upload = Upload::create([
            'user_id' => $request->user()->id,
            'filename' => $filename,
            'original_filename' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ]);

        return response()->json([
            'message' => 'File uploaded successfully',
            'upload' => [
                'id' => $upload->id,
                'filename' => $upload->filename,
                'original_filename' => $upload->original_filename,
                'url' => $upload->url,
                'mime_type' => $upload->mime_type,
                'size' => $upload->size,
                'created_at' => $upload->created_at,
            ],
        ], 201);
    }

    /**
     * List all uploads
     */
    public function index()
    {
        $uploads = Upload::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($uploads);
    }

    /**
     * Delete an upload
     */
    public function destroy($id)
    {
        $upload = Upload::findOrFail($id);

        // Delete file from storage
        Storage::disk('public')->delete($upload->path);

        // Delete record
        $upload->delete();

        return response()->json([
            'message' => 'Upload deleted successfully',
        ]);
    }
}
