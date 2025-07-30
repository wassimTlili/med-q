'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🏥 Medical Education Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your medical revision platform is working!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">📝 QCM</h2>
            <p className="text-purple-600">Multiple choice questions</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-2">🧠 CROCS</h2>
            <p className="text-green-600">Clinical reasoning cases</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">🩺 Clinical Cases</h2>
            <p className="text-blue-600">Full patient scenarios</p>
          </div>
        </div>

        <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 text-lg font-semibold">
          🚀 Start Learning
        </button>
        
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">✅ Server is running successfully!</p>
          <p className="text-green-600 text-sm">Next.js 15.4.4 • Ready for development</p>
        </div>
      </div>
    </div>
  );
}
