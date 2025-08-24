import { createClient } from "@/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/local/navigation";

interface ColorDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ColorDetailPage({ params }: ColorDetailPageProps) {
  const { id } = await params;
  const supabase = createClient();
  
  const { data: color, error } = await supabase
    .from('color_sets')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !color) {
    notFound();
  }

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Color Preview */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">Color Details</h1>
            <div 
              className="w-full h-32 rounded-lg mb-4 shadow-md"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{color.hex}</h2>
              <p className="text-gray-600">Color ID: {color.id}</p>
            </div>
          </div>

          {/* Color Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HEX */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">HEX</h3>
              <code className="bg-gray-100 p-2 rounded text-sm block">{color.hex}</code>
            </div>

            {/* RGBA */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">RGBA</h3>
              <code className="bg-gray-100 p-2 rounded text-sm block">
                rgba({color.rgba?.join(', ')})
              </code>
            </div>

            {/* HSV */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">HSV</h3>
              <code className="bg-gray-100 p-2 rounded text-sm block">
                {color.hsv}
              </code>
            </div>

            {/* HSL */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">HSL</h3>
              <code className="bg-gray-100 p-2 rounded text-sm block">
                {color.hsl}
              </code>
            </div>

            {/* Alpha */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Alpha</h3>
              <code className="bg-gray-100 p-2 rounded text-sm block">
                {color.a}
              </code>
            </div>

            {/* Additional Info */}
            {color.info && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Additional Info</h3>
                <code className="bg-gray-100 p-2 rounded text-sm block">
                  {JSON.stringify(color.info, null, 2)}
                </code>
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Created:</strong> {new Date(color.created_at).toLocaleString()}
              </div>
              <div>
                <strong>Updated:</strong> {new Date(color.updated_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
