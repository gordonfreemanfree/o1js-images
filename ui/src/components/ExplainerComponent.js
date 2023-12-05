import React, { useState, useEffect } from 'react'

export default function ExplainerComponent() {
  const totalPixels = 9 // Updated for a 3x3 grid
  const [isExpanded, setIsExpanded] = useState(false)
  const [clickedPixels, setClickedPixels] = useState({})
  const [allClicked, setAllClicked] = useState(false)
  const [userPrompt, setUserPrompt] = useState('Click to manipulate image')

  const [showMinaExplanation, setShowMinaExplanation] = useState(false)

  useEffect(() => {
    if (allClicked === 'verified') {
      setTimeout(() => {
        setShowMinaExplanation(true)
      }, 2000) // Show the explanation after the verification
    }
  }, [allClicked])

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
      }, 2000)
    }
  }, [clickedPixels])

  useEffect(() => {
    if (allClicked === 'verified') {
      setTimeout(resetComponent, 2000) // Reset after 2 seconds
    }
  }, [allClicked])

  const resetComponent = () => {
    setIsExpanded(false)
    setClickedPixels({})
    setAllClicked(false)
    setUserPrompt('Click each pixel to generate a proof.')
  }

  const handleBoxClick = () => {
    setUserPrompt('click each pixel to reveal a secret')
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
    <>
      <h1 className="text-center text-black text-8xl">Why Mina</h1>
      <p className="user-prompt">{userPrompt}</p>

      <div className="explainer-container">
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
                  className={`small-box ${
                    clickedPixels[index] ? 'clicked' : ''
                  }`}
                  onClick={(e) => handlePixelClick(index, e)}
                >
                  {clickedPixels[index] ? 'Proof' : `Pixel ${index + 1}`}
                </div>
              ))}
            </div>
          )}
        </div>
        {showMinaExplanation && (
          <div className="mina-explanation">
            <p>
              Mina is considered an optimal solution for this project due to its
              unique features:
            </p>
            <ul>
              <li>
                <strong>Lightweight Blockchain:</strong> Mina maintains a
                constant size blockchain, making it more accessible and
                efficient. Browser Plugins can easily connect to Mina.
              </li>
              <li>
                <strong>Zero-Knowledge Proofs:</strong> Enables the verification
                of data without revealing sensitive information and the ability
                to use recursive proof composition, which crucial for
                maintaining privacy in zk Images.
              </li>
              <li>
                <strong>Decentralization and Security:</strong> Mina&aposs
                decentralized nature enhances security, making it resilient to
                attacks and manipulation.
              </li>
              <li>
                <strong>Scalability:</strong> Its design allows for scalability,
                handling increased loads without compromising performance.
              </li>
            </ul>
            <p>
              This integration is essential for ensuring the authenticity and
              integrity of data in our increasingly digital world.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
