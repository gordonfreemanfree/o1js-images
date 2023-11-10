import React, { useEffect, useState } from 'react'
import { DiagramComponent } from './DiagramComponent'

const ImageProcessingDiagram = () => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    // Set isBrowser to true once we know it's a browser
    setIsBrowser(typeof window !== 'undefined')
  }, [])

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold underline mb-4">
        Image Processing Flow Visualization
      </h1>
      {isBrowser && <DiagramComponent />}
    </div>
  )
}

export default ImageProcessingDiagram
