// // @ts-nocheck
// import styles from '@/styles/Home.module.css'
// import { useEffect, useState, useRef } from 'react'

// export default function DynamicBG({ children }) {
//   const canvasRef = useRef(null)
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
//   const [gradientStart, setGradientStart] = useState({ x: 0, y: 0 })
//   const [gradientEnd, setGradientEnd] = useState({ x: 0, y: 0 })

//   // Update the gradient start and end points gradually
//   useEffect(() => {
//     const updateGradientPoints = () => {
//       setGradientStart({
//         x: Math.random() * dimensions.width,
//         y: Math.random() * dimensions.height,
//       })
//       setGradientEnd({
//         x: Math.random() * dimensions.width,
//         y: Math.random() * dimensions.height,
//       })
//     }

//     const intervalId = setInterval(updateGradientPoints, 5000) // Update every 5 seconds

//     return () => clearInterval(intervalId)
//   }, [dimensions])

//   // Function to generate a dynamic blue gradient
//   function createGradient(ctx) {
//     let gradient = ctx.createLinearGradient(
//       gradientStart.x,
//       gradientStart.y,
//       gradientEnd.x,
//       gradientEnd.y,
//     )
//     gradient.addColorStop(0, 'rgba(25, 85, 125, 1)') // Soft dark blue
//     gradient.addColorStop(1, 'rgba(65, 165, 245, 1)') // Softer light blue
//     return gradient
//   }

//   // Function to animate the gradient
//   function animateGradient() {
//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext('2d')

//       ctx.clearRect(0, 0, dimensions.width, dimensions.height)
//       let gradient = createGradient(ctx)
//       ctx.fillStyle = gradient
//       ctx.fillRect(0, 0, dimensions.width, dimensions.height)
//     }
//   }

//   useEffect(() => {
//     function handleResize() {
//       setDimensions({ width: window.innerWidth, height: window.innerHeight })
//     }

//     window.addEventListener('resize', handleResize)

//     // Set initial dimensions
//     handleResize()

//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   useEffect(() => {
//     if (dimensions.width && dimensions.height) {
//       const canvas = canvasRef.current
//       canvas.width = dimensions.width
//       canvas.height = dimensions.height

//       let animationFrameId

//       const render = () => {
//         animateGradient()
//         animationFrameId = window.requestAnimationFrame(render)
//       }

//       render()

//       return () => {
//         window.cancelAnimationFrame(animationFrameId)
//       }
//     }
//   }, [dimensions, gradientStart, gradientEnd])

//   return (
//     <div
//       className={styles.dynamicBackground}
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         minHeight: '100vh',
//         zIndex: -1,
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         width={dimensions.width}
//         height={dimensions.height}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//         }}
//       />
//       <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
//     </div>
//   )
// }

// @ts-nocheck
import styles from '@/styles/Home.module.css'
import { useEffect, useRef } from 'react'

export default function StaticGradientBG({ children }) {
  const canvasRef = useRef(null)

  // Function to generate a static blue gradient
  function createGradient(ctx, width, height) {
    let gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, 'rgba(25, 85, 125, 1)') // Darker blue at the top
    gradient.addColorStop(1, 'rgba(65, 165, 245, 1)') // Lighter blue towards the bottom
    return gradient
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = window.innerWidth
    const height = window.innerHeight

    canvas.width = width
    canvas.height = height

    let gradient = createGradient(ctx, width, height)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }, [])

  return (
    <div
      className={styles.dynamicBackground}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        zIndex: -1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
