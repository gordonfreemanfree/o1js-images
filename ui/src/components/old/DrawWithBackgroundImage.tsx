import React, { useState, useRef, useEffect, ChangeEvent, FC } from 'react'
import funnyMina from '../../public/assets/funny_mina.png'
import { SetupStateType } from '@/components/types'

interface DrawWithBackgroundImage {
  state: SetupStateType
  setState: React.Dispatch<React.SetStateAction<SetupStateType>>
}

const DrawWithBackgroundImage: FC<DrawWithBackgroundImage> = () => {
  const [imageState, setImageState] = useState(funnyMina.src)

  // const [imageState, setImageState] = useState(funnyMina)
  const [uploading, setUploading] = useState(false)

  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [maskState, setmaskState] = useState<string | null>(null)
  const [penSize, setPenSize] = useState(50)
  const [pixels, setPixels] = useState<Uint8ClampedArray | null>(null)
  const [pixels64x64, setPixels64x64] = useState<Uint8ClampedArray | null>(null)

  const handleSetImageStateUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true)
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageState(reader.result)
        } else {
          console.error('FileReader did not return a string')
        }
        setUploading(false)
      }
      reader.onerror = () => {
        console.error('An error occurred reading the file')
        setUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const canvas = backgroundCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      const img = new Image()
      // Use src for StaticImageData, or the string directly if it's a data URL.
      img.src = typeof imageState === 'string' ? imageState : imageState
      // ... rest of your drawing code
    }
  }, [imageState])

  useEffect(() => {
    const canvas = backgroundCanvasRef.current
    if (canvas && imageState) {
      const ctx = canvas.getContext('2d')
      const img = new Image()

      // Check if imageState is an object with a src property, otherwise use it directly
      const src =
        typeof imageState === 'object' && imageState ? imageState : imageState

      img.src = src

      if (ctx) {
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }

        img.onerror = (e) => {
          console.error('Failed to load image', e)
        }
      }
    }
  }, [imageState])

  useEffect(() => {
    // Check if the current property of the ref is not null
    const canvas = drawingCanvasRef.current
    if (canvas) {
      setmaskState(canvas.toDataURL())
    }
    // let previewCanvas = previewCanvasRef.current
    // if (previewCanvas) {
    //   const ctx = previewCanvas.getContext('2d')
    //   if (ctx) {
    //     const img = new Image()
    //     img.src = maskState ? maskState : ''
    //     img.onload = () => {
    //       ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
    //       ctx.drawImage(img, 0, 0, previewCanvas.width, previewCanvas.height)
    //     }
    //   }
    // }
  }, [drawingCanvasRef])

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setDrawing(true)

    if (drawingCanvasRef.current) {
      const rect = drawingCanvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setLastX(x)
      setLastY(y)
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing) {
      return
    }

    // Ensure that drawingCanvasRef.current is not null before attempting to get the context
    if (drawingCanvasRef.current) {
      const ctx = drawingCanvasRef.current.getContext('2d')

      // Ensure that getContext('2d') returned a valid context before using it
      if (ctx) {
        ctx.beginPath()
        ctx.lineWidth = penSize
        ctx.lineCap = 'round'
        ctx.strokeStyle = 'white'
        ctx.moveTo(lastX, lastY)
        ctx.stroke()
        const rect = drawingCanvasRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ctx.lineTo(x, y)
        ctx.stroke()

        setLastX(x)
        setLastY(y)
      }
    }
  }

  function handleMouseUp() {
    setDrawing(false)
    handleSaveMask()
  }

  async function handleSaveMask() {
    if (drawingCanvasRef.current) {
      const canvas = drawingCanvasRef.current
      const ctx = canvas.getContext('2d')

      // Ensure that getContext('2d') returned a valid context before using it
      if (ctx) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const tolerance = 10

        for (let i = 0; i < imgData.data.length; i += 4) {
          if (
            imgData.data[i] >= 255 - tolerance &&
            imgData.data[i + 1] >= 255 - tolerance &&
            imgData.data[i + 2] >= 255 - tolerance
          ) {
            imgData.data[i] = 255
            imgData.data[i + 1] = 255
            imgData.data[i + 2] = 255
          } else {
            imgData.data[i] = 0
            imgData.data[i + 1] = 0
            imgData.data[i + 2] = 0
            imgData.data[i + 3] = 255
          }
        }

        // Put the modified ImageData back onto the canvas
        await ctx.putImageData(imgData, 0, 0)

        if (drawingCanvasRef.current) {
          const dataUrl = drawingCanvasRef.current.toDataURL()
          setmaskState(dataUrl)
          setPixels(imgData.data)
          // console.log('saved', dataUrl)
          console.log('pixels', imgData.data)
        }
      }
    }
  }

  function pixelTo64x64() {
    if (drawingCanvasRef.current) {
      const canvas = drawingCanvasRef.current
      const ctx = canvas.getContext('2d')

      // Ensure that getContext('2d') returned a valid context before using it
      if (ctx) {
        const imgData = ctx.getImageData(0, 0, 64, 64)
        setPixels64x64(imgData.data)
      }
    }
    console.log('pixels64x64', pixels64x64)
  }

  // clear the canvas
  function clearCanvas() {
    if (drawingCanvasRef.current) {
      const ctx = drawingCanvasRef.current.getContext('2d')

      // Also, check that getContext('2d') did not return null
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      }

      // After clearing the canvas, set the mask state to null
      setmaskState(null)
      setPixels(null)
      setPixels64x64(null)
    }
    if (previewCanvasRef.current) {
      const ctx2 = previewCanvasRef.current.getContext('2d')
      if (ctx2) {
        ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height)
      }
    }
  }
  if (!imageState) {
    return <div>Loading...</div> // Or some other loading state
  }

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col items-center justify-center my-5">
        <h1 className="text-3xl font-bold text-primary-blue">
          DEMO - erase the Mina sign{' '}
        </h1>
        <p className="text-center text-2xl text-primary-blue max-w-lg rounded-xl my-5 p-4 shadow-lg">
          At the moment the zkProgram is not compiling in browser. Therefore it
          is just a demo.{' '}
        </p>
      </div>
      <div className="relative flex align-middle justify-center my-5">
        <canvas
          className="border border-border-color shadow-lg rounded-lg"
          ref={backgroundCanvasRef}
          width={512}
          height={512}
        />

        <canvas
          className="border absolute opacity-80 rounded-lg"
          ref={drawingCanvasRef}
          width={512}
          height={512}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>

      <div className=" flex align-middle justify-center my-5 rounded-xl">
        <button
          onClick={handleSaveMask}
          className="bg-tertiary font-bold rounded-full text-white text-center shadow-md p-4 hover:bg-sky-500 hover:shadow-lg focus:bg-sky-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-700 active:shadow-lg transition duration-150 ease-in-out"
        >
          Save
        </button>
        <input
          className="bg-sky-500 w-100"
          type="range"
          min="1"
          max="100"
          value={penSize}
          onChange={(e) => setPenSize(Number(e.target.value))}
        />
        <button
          onClick={clearCanvas}
          className="bg-tertiary font-bold rounded-full text-white text-center shadow-md p-4 hover:bg-sky-500 hover:shadow-lg focus:bg-sky-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-700 active:shadow-lg transition duration-150 ease-in-out"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default DrawWithBackgroundImage
