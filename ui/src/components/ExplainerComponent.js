// import React, { useState } from 'react'

// export default function ExplainerComponent() {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [clickedPixels, setClickedPixels] = useState({}) // Tracks which pixels are clicked

//   const handleBoxClick = () => {
//     setIsExpanded(!isExpanded)
//   }

//   const handlePixelClick = (index, event) => {
//     event.stopPropagation() // Prevent the main box click event
//     setClickedPixels((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }))
//   }

//   return (
//     <div
//       className={`main-box ${isExpanded ? 'expanded' : ''}`}
//       onClick={handleBoxClick}
//     >
//       {!isExpanded && <p>Click to expand</p>}
//       {isExpanded && (
//         <div className="grid-container">
//           {[...Array(16)].map((_, index) => (
//             <div
//               key={index}
//               className={`small-box ${clickedPixels[index] ? 'clicked' : ''}`}
//               onClick={(e) => handlePixelClick(index, e)}
//             >
//               {clickedPixels[index] ? 'Proof' : `Pixel ${index + 1}`}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
// import React, { useState, useEffect } from 'react'

// export default function ExplainerComponent() {
//   const totalPixels = 16
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [clickedPixels, setClickedPixels] = useState({})
//   const [allClicked, setAllClicked] = useState(false)
//   const [verified, setVerified] = useState(false)

//   useEffect(() => {
//     if (
//       Object.keys(clickedPixels).length === totalPixels &&
//       Object.values(clickedPixels).every((val) => val)
//     ) {
//       setAllClicked(true)
//     }
//   }, [clickedPixels])

//   const handleBoxClick = () => {
//     setIsExpanded(!isExpanded)
//   }

//   const handlePixelClick = (index, event) => {
//     event.stopPropagation()
//     setClickedPixels((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }))
//   }

//   const handleRecursionProofClick = () => {
//     if (allClicked) {
//       setVerified(true)
//     }
//   }

//   return (
//     <div className="explainer-container">
//       <div
//         className={`main-box ${isExpanded ? 'expanded' : ''} ${
//           allClicked ? 'all-clicked' : ''
//         }`}
//         onClick={handleBoxClick}
//       >
//         {!isExpanded && <p>Click to expand</p>}
//         {isExpanded && !allClicked && <p>Click each pixel</p>}
//         {isExpanded && allClicked && !verified && (
//           <p className="recursion-proof" onClick={handleRecursionProofClick}>
//             Recursion Proof
//           </p>
//         )}
//         {isExpanded && allClicked && verified && (
//           <div className="verified">
//             <p>Verified by Mina Blockchain</p>
//             <span className="arrow"></span>
//           </div>
//         )}
//         {isExpanded && (
//           <div className="grid-container">
//             {[...Array(totalPixels)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`small-box ${clickedPixels[index] ? 'clicked' : ''}`}
//                 onClick={(e) => handlePixelClick(index, e)}
//               >
//                 {clickedPixels[index] ? 'Proof' : `Pixel ${index + 1}`}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// import React, { useState, useEffect } from 'react'

// export default function ExplainerComponent() {
//   const totalPixels = 16
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [clickedPixels, setClickedPixels] = useState({})
//   const [allClicked, setAllClicked] = useState(false)

//   useEffect(() => {
//     if (
//       Object.keys(clickedPixels).length === totalPixels &&
//       Object.values(clickedPixels).every((val) => val)
//     ) {
//       setAllClicked(true)
//       setTimeout(() => setAllClicked('verified'), 1000) // Automatically verify after 1 second
//     }
//   }, [clickedPixels])

//   const handleBoxClick = () => {
//     setIsExpanded(!isExpanded)
//   }

//   const handlePixelClick = (index, event) => {
//     event.stopPropagation()
//     setClickedPixels((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }))
//   }

//   return (
//     <div className="explainer-container">
//       <div
//         className={`main-box ${isExpanded ? 'expanded' : ''} ${
//           allClicked ? 'all-clicked' : ''
//         }`}
//         onClick={handleBoxClick}
//       >
//         {!isExpanded && <p>Click to expand</p>}
//         {isExpanded && allClicked === true && (
//           <p className="recursion-proof">Recursion Proof</p>
//         )}
//         {isExpanded && allClicked === 'verified' && (
//           <div className="verified">
//             <p>Verified by Mina Blockchain</p>
//             <span className="arrow"></span>
//           </div>
//         )}
//         {isExpanded && !allClicked && (
//           <div className="grid-container">
//             {[...Array(totalPixels)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`small-box ${clickedPixels[index] ? 'clicked' : ''}`}
//                 onClick={(e) => handlePixelClick(index, e)}
//               >
//                 {clickedPixels[index] ? 'Proof' : `Pixel ${index + 1}`}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// import React, { useState, useEffect } from 'react'

// export default function ExplainerComponent() {
//   const totalPixels = 9
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [clickedPixels, setClickedPixels] = useState({})
//   const [allClicked, setAllClicked] = useState(false)
//   const [userPrompt, setUserPrompt] = useState(
//     'Click to expand and start the verification process.',
//   )

//   useEffect(() => {
//     if (
//       Object.keys(clickedPixels).length === totalPixels &&
//       Object.values(clickedPixels).every((val) => val)
//     ) {
//       setAllClicked(true)
//       setUserPrompt('Verifying...')
//       setTimeout(() => {
//         setAllClicked('verified')
//         setUserPrompt('Verified by Mina Blockchain')
//       }, 1000)
//     }
//   }, [clickedPixels])

//   useEffect(() => {
//     if (allClicked === 'verified') {
//       setTimeout(resetComponent, 2000) // Reset after 2 seconds
//     }
//   }, [allClicked])

//   const resetComponent = () => {
//     setIsExpanded(false)
//     setClickedPixels({})
//     setAllClicked(false)
//     setUserPrompt('Click to expand and start the verification process.')
//   }

//   const handleBoxClick = () => {
//     if (!isExpanded) setIsExpanded(true)
//   }

//   const handlePixelClick = (index, event) => {
//     event.stopPropagation()
//     setClickedPixels((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }))
//   }

//   return (
//     <div className="explainer-container">
//       <p className="user-prompt">{userPrompt}</p>
//       <div
//         className={`main-box ${isExpanded ? 'expanded' : ''} ${
//           allClicked ? 'all-clicked' : ''
//         }`}
//         onClick={handleBoxClick}
//       >
//         {isExpanded && allClicked === true && (
//           <p className="recursion-proof">Recursion Proof</p>
//         )}
//         {isExpanded && allClicked === 'verified' && (
//           <div className="verified">
//             <p>Verified by Mina Blockchain</p>
//             <span className="arrow"></span>
//           </div>
//         )}
//         {isExpanded && !allClicked && (
//           <div className="grid-container">
//             {[...Array(totalPixels)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`small-box ${clickedPixels[index] ? 'clicked' : ''}`}
//                 onClick={(e) => handlePixelClick(index, e)}
//               >
//                 {clickedPixels[index] ? 'Proof' : `Pixel ${index + 1}`}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react'

export default function ExplainerComponent() {
  const totalPixels = 9 // Updated for a 3x3 grid
  const [isExpanded, setIsExpanded] = useState(false)
  const [clickedPixels, setClickedPixels] = useState({})
  const [allClicked, setAllClicked] = useState(false)
  const [userPrompt, setUserPrompt] = useState('Click to manipulate image')

  useEffect(() => {
    if (
      Object.keys(clickedPixels).length === totalPixels &&
      Object.values(clickedPixels).every((val) => val)
    ) {
      setAllClicked(true)
      setUserPrompt('Verifying...')
      setTimeout(() => {
        setAllClicked('verified')
        setUserPrompt('Verified by Mina Blockchain')
      }, 3000)
    }
  }, [clickedPixels])

  useEffect(() => {
    if (allClicked === 'verified') {
      setTimeout(resetComponent, 3000) // Reset after 2 seconds
    }
  }, [allClicked])

  const resetComponent = () => {
    setIsExpanded(false)
    setClickedPixels({})
    setAllClicked(false)
    setUserPrompt('Click each pixel to generate a proof.')
  }

  const handleBoxClick = () => {
    if (!isExpanded) setIsExpanded(true)
  }

  const handlePixelClick = (index, event) => {
    event.stopPropagation()
    setClickedPixels((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <div className="explainer-container">
      <p className="user-prompt">{userPrompt}</p>
      <div
        className={`main-box ${isExpanded ? 'expanded' : ''} ${
          allClicked ? 'all-clicked' : ''
        }`}
        onClick={handleBoxClick}
      >
        {isExpanded && allClicked === true && (
          <p className="recursion-proof">Recursion Proof</p>
        )}
        {isExpanded && allClicked === 'verified' && (
          <div className="verified">
            <p>Verified by Mina Blockchain</p>
            <span className="arrow"></span>
          </div>
        )}
        {isExpanded && !allClicked && (
          <div className="grid-container">
            {[...Array(totalPixels)].map((_, index) => (
              <div
                key={index}
                className={`small-box ${clickedPixels[index] ? 'clicked' : ''}`}
                onClick={(e) => handlePixelClick(index, e)}
              >
                {clickedPixels[index] ? 'Proof' : `Pixel ${index + 1}`}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
