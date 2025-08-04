<?php
// app/Services/FileUploadService.php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class FileUploadService
{
    public function uploadSingle(UploadedFile $file, string $directory = 'uploads'): string
    {
        $filename = $this->generateUniqueFilename($file);
        $path = $file->storeAs($directory, $filename, 'public');
        
        // Optimize image if it's an image
        if ($this->isImage($file)) {
            $this->optimizeImage(storage_path('app/public/' . $path));
        }
        
        return '/storage/' . $path;
    }

    public function uploadMultiple(array $files, string $directory = 'uploads'): array
    {
        $uploadedFiles = [];
        
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $uploadedFiles[] = $this->uploadSingle($file, $directory);
            }
        }
        
        return $uploadedFiles;
    }

    private function generateUniqueFilename(UploadedFile $file): string
    {
        return Str::random(20) . '_' . time() . '.' . $file->getClientOriginalExtension();
    }

    private function isImage(UploadedFile $file): bool
    {
        return in_array($file->getMimeType(), [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp'
        ]);
    }

    private function optimizeImage(string $path): void
    {
        try {
            $image = Image::make($path);
            
            // Resize if too large
            if ($image->width() > 1920 || $image->height() > 1080) {
                $image->fit(1920, 1080, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }
            
            // Compress and save
            $image->save($path, 85);
        } catch (\Exception $e) {
            // Log error but don't fail upload
            \Log::warning('Image optimization failed: ' . $e->getMessage());
        }
    }

    public function deleteFile(string $path): bool
    {
        $relativePath = str_replace('/storage/', '', $path);
        return Storage::disk('public')->delete($relativePath);
    }
}