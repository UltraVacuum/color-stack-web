
import Navigation from "@/components/local/navigation";
import Link from "next/link";

export default function ExtensionPage() {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Color Stack Chrome Extension</h1>
            <p className="text-xl text-gray-600 mb-6">
              Collect website theme colors and save them directly to your Color Stack account
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="https://chromewebstore.google.com/detail/color-stack/odejgpnelfibbifobdffndebnbielcdl?ref=color-stack"
                target="_blank"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Install Extension
              </Link>
              <Link
                href="/color-sets"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                View My Colors
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Extract Colors</h3>
              <p className="text-gray-600">
                Automatically detect and extract color schemes from any website you visit
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save to Collection</h3>
              <p className="text-gray-600">
                Save your favorite color palettes directly to your Color Stack account with one click
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Organize & Share</h3>
              <p className="text-gray-600">
                Organize your color collections and share them with the design community
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-xl">1</div>
                <h3 className="font-semibold mb-2">Install</h3>
                <p className="text-sm text-gray-600">Add the extension to Chrome</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-xl">2</div>
                <h3 className="font-semibold mb-2">Browse</h3>
                <p className="text-sm text-gray-600">Visit any website</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-xl">3</div>
                <h3 className="font-semibold mb-2">Click</h3>
                <p className="text-sm text-gray-600">Click the extension icon</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-xl">4</div>
                <h3 className="font-semibold mb-2">Save</h3>
                <p className="text-sm text-gray-600">Save colors to your collection</p>
              </div>
            </div>
          </div>

          {/* Demo */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">See It In Action</h2>
            <div className="text-center">
              <img
                src="/snapshot/1.png"
                alt="Color Stack Chrome Extension Interface"
                className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
                style={{ maxWidth: '600px' }}
              />
              <p className="text-gray-600 mt-4">
                The Color Stack extension makes it easy to collect and save website color schemes
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Collecting Colors?</h2>
            <p className="text-gray-600 mb-6">
              Install the Color Stack Chrome extension and never lose inspiration again
            </p>
            <Link
              href="https://chromewebstore.google.com/detail/color-stack/odejgpnelfibbifobdffndebnbielcdl?ref=color-stack"
              target="_blank"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors inline-block"
            >
              Get the Extension
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
