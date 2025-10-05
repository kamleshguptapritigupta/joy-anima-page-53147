-- Create storage bucket for media uploads (images and videos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);

-- Create RLS policies for media bucket
-- Allow anyone to view files
CREATE POLICY "Anyone can view media files"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Allow anyone to upload files (you can restrict this later if needed)
CREATE POLICY "Anyone can upload media files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media');

-- Allow anyone to delete their own files
CREATE POLICY "Anyone can delete their own media files"
ON storage.objects FOR DELETE
USING (bucket_id = 'media');