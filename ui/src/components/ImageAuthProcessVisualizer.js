// ImageAuthProcessVisualizer.js
import React from 'react'

const ImageAuthProcessVisualizer = () => {
  // Helper function to generate colorful pixel array boxes
  const generatePixelArrayBoxes = (count, censoredCount) => (
    <div className="flex justify-center mb-2">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`w-6 h-6 border m-1 ${
            index < censoredCount
              ? 'bg-black'
              : `bg-${index % 2 === 0 ? 'red' : 'blue'}-300`
          }`}
          style={{
            backgroundColor:
              index < censoredCount
                ? 'black'
                : index % 2 === 0
                ? '#feb2b2'
                : '#bee3f8',
            borderColor: '#e5e7eb',
          }}
        ></div>
      ))}
    </div>
  )

  // Helper function to generate a hash representation around each pixel
  const generateHashBoxes = (count, censoredCount) => (
    <div className="flex justify-center mb-2">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="m-1 flex flex-col items-center">
          <div
            className={`w-6 h-6 border ${
              index < censoredCount
                ? 'bg-black'
                : `bg-${index % 2 === 0 ? 'red' : 'blue'}-300`
            }`}
            style={{
              backgroundColor:
                index < censoredCount
                  ? 'black'
                  : index % 2 === 0
                  ? '#feb2b2'
                  : '#bee3f8',
              borderColor: '#e5e7eb',
            }}
          ></div>
          <div className="border p-1 text-xs text-center mt-1">Hash</div>
        </div>
      ))}
    </div>
  )

  // Helper function to generate the blockchain illustration
  const generateBlockchainIllustration = () => (
    <div className="flex items-center justify-center">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="flex flex-col items-center mx-2">
          <div className="w-12 h-12 border border-gray-400 bg-gray-200 flex items-center justify-center">
            <span className="text-xs">Block {index + 1}</span>
          </div>
          {index < 2 && <span className="text-xl mt-2">→</span>}
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold underline mb-4">
        Image Authentication Process Visualization
      </h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          {' '}
          <div className="border p-4 rounded-lg shadow-lg mb-4 bg-blue-100 flex flex-col items-center">
            {' '}
            <span className="text-3xl">📷</span>
            <p className="text-sm mt-2">
              Image Capture and Signing either in camera or from trusted
              authority
            </p>
          </div>
        </div>

        <div className="arrow mb-4"></div>

        <div className="border p-4 rounded-lg shadow-lg mb-4 bg-green-100">
          <p className="text-sm mb-2">Pixel Hashing and Commitment to chain</p>
          {generateHashBoxes(10, 0)}
        </div>

        <div className="arrow mb-4"></div>

        <div className="border p-4 rounded-lg shadow-lg mb-4 bg-purple-100">
          <p className="text-sm mb-2">
            Censoring Transformation Applied or other method
          </p>
          {generatePixelArrayBoxes(10, 5)}
        </div>

        <div className="arrow mb-4"></div>

        <div className="border p-4 rounded-lg shadow-lg mb-4 bg-yellow-300">
          <p className="text-sm">Recursive Proof Composition</p>
          {generateHashBoxes(10, 5)}
        </div>

        <div className="arrow mb-4"></div>

        <div className="border p-4 rounded-lg shadow-lg mb-4 bg-blue-200">
          <span className="text-3xl ">✅</span>
          <p className="text-sm mt-2">Blockchain Verification</p>
          {generateBlockchainIllustration()}
        </div>

        <div className="arrow mb-4"></div>

        <div className="border p-4 rounded-lg shadow-lg bg-green-200">
          <span className="text-3xl"></span>
          <p className="text-sm mt-2">
            Browser Plugin could receive confirmation
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageAuthProcessVisualizer
