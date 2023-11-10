import React from 'react'

const ImageAuthProcessVisualizer = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold underline mb-4">
        Image Authentication Process Visualization
      </h1>

      {/* Visualization with Tree Diagram */}
      <div className="flex flex-col items-center">
        {/* Image Capture and Signing Graphic */}
        <div className="border p-4 rounded-lg shadow-lg mb-4 bg-blue-100">
          <span className="text-3xl">📷</span>
          <p className="text-sm mt-2">Image Capture and Signing</p>
        </div>

        {/* Down Arrow */}
        <div className="text-2xl mb-4">↓</div>

        {/* Image Upload and Splitting Graphic */}
        <div className="border p-4 rounded-lg shadow-lg mb-4 bg-green-100">
          <div className="grid grid-cols-3 gap-1 mb-2">
            {/* Pixel Arrays */}
            <div className="w-6 h-6 bg-red-300"></div>
            <div className="w-6 h-6 bg-yellow-300"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
            {/* ... more boxes to represent pixels */}
          </div>
          <p className="text-sm">Image Split into Pixel Arrays</p>
        </div>

        {/* Hash Generation for Each Array */}
        <div className="flex justify-around w-full mb-4">
          <div className="border p-4 rounded-lg shadow-lg bg-purple-100">
            <span className="text-3xl">#</span>
            <p className="text-sm mt-2">Hash Array 1</p>
          </div>
          <div className="border p-4 rounded-lg shadow-lg bg-purple-100">
            <span className="text-3xl">#</span>
            <p className="text-sm mt-2">Hash Array 2</p>
          </div>
          {/* ... More Hashes for additional arrays */}
        </div>

        {/* Combining Hashes */}
        <div className="flex flex-col items-center">
          <div className="text-2xl mb-2">↓</div>
          <div className="border p-4 rounded-lg shadow-lg mb-4 bg-yellow-300">
            <span className="text-3xl">🌳</span>
            <p className="text-sm mt-2">Combining Hashes</p>
          </div>
        </div>

        {/* Commitment to Zk SmartContract */}
        <div className="text-2xl mb-2">↓</div>
        <div className="border p-4 rounded-lg shadow-lg mb-4 bg-red-100">
          <span className="text-3xl">🔒</span>
          <p className="text-sm mt-2">Commitment to Zk SmartContract</p>
        </div>

        {/* Blockchain Confirmation */}
        <div className="text-2xl mb-2">↓</div>
        <div className="border p-4 rounded-lg shadow-lg bg-blue-200">
          <span className="text-3xl">✅</span>
          <p className="text-sm mt-2">Blockchain Confirmation</p>
        </div>
      </div>

      <p className="italic mt-5">
        Note: This is a graphical representation and does not perform any actual
        operations.
      </p>
    </div>
  )
}

export default ImageAuthProcessVisualizer
