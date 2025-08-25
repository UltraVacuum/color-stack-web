
'use client'

export default function SpaceTest() {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Space Utility Test</h2>
      
      {/* Test space-x utilities */}
      <div className="flex space-x-4 mb-6 p-4 bg-white rounded">
        <div className="w-8 h-8 bg-blue-500 rounded"></div>
        <div className="w-8 h-8 bg-red-500 rounded"></div>
        <div className="w-8 h-8 bg-green-500 rounded"></div>
        <span className="text-sm">space-x-4</span>
      </div>

      {/* Test space-y utilities */}
      <div className="space-y-4 mb-6 p-4 bg-white rounded">
        <div className="w-full h-8 bg-blue-500 rounded"></div>
        <div className="w-full h-8 bg-red-500 rounded"></div>
        <div className="w-full h-8 bg-green-500 rounded"></div>
        <span className="text-sm">space-y-4</span>
      </div>

      {/* Test gap utilities */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded">
        <div className="w-full h-8 bg-blue-500 rounded"></div>
        <div className="w-full h-8 bg-red-500 rounded"></div>
        <div className="w-full h-8 bg-green-500 rounded"></div>
        <span className="text-sm col-span-3">gap-4</span>
      </div>
    </div>
  )
}
