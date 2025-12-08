-- Create storage bucket for custom order images
INSERT INTO storage.buckets (id, name, public)
VALUES ('custom-orders', 'custom-orders', true);

-- Allow anyone to upload to custom-orders bucket
CREATE POLICY "Anyone can upload custom order images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'custom-orders');

-- Allow anyone to view custom order images (public bucket)
CREATE POLICY "Anyone can view custom order images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'custom-orders');