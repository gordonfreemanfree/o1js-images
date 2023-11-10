// DomainModelExplainer.js
import React from 'react'

const DomainModelExplainer = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold underline mb-4">
        Image Authentication Domain Model
      </h1>

      {/* User Box */}
      <div className="transformation-box">
        <h2 className="font-bold text-lg text-center">User</h2>
        <p className="text-center">
          Represents the entity uploading or signing the image. Includes
          attributes like userID, reputation, etc.
        </p>
      </div>

      {/* Arrow Down */}
      <div className="arrow"></div>

      {/* Image Box */}
      <div className="transformation-box">
        <h2 className="font-bold text-lg text-center">Image</h2>
        <p className="text-center">
          Central entity. Attributes include image hash, digital signature, etc.
          Uploaded by a User.
        </p>
      </div>

      {/* Arrow Down */}
      <div className="arrow"></div>

      {/* Header for Transformation Methods */}
      <h2 className="text-2xl text-center font-bold my-4">
        Transformation Methods
      </h2>

      {/* Transformation Boxes in the same line */}
      <div className="transformation-container">
        {/* Transformation Box: Crop */}
        <div className="transformation-box method-box">
          <h2 className="font-bold text-lg">Crop</h2>
          <p> crop it to the desired area.</p>
        </div>

        {/* Transformation Box: Rotate */}
        <div className="transformation-box method-box">
          <h2 className="font-bold text-lg">Rotate</h2>
          <p> rotate it by a specified degree.</p>
        </div>

        {/* Transformation Box: Flip */}
        <div className="transformation-box method-box">
          <h2 className="font-bold text-lg">Flip</h2>
          <p> flip it horizontally or vertically.</p>
        </div>

        {/* Transformation Box: Resize */}
        <div className="transformation-box method-box">
          <h2 className="font-bold text-lg">Resize</h2>
          <p> change its dimensions.</p>
        </div>

        {/* Transformation Box: Censoring */}
        <div className="transformation-box method-box">
          <h2 className="font-bold text-lg">Censoring</h2>
          <p> obscure a portion for privacy.</p>
        </div>

        {/* Transformation Box: Blur (additional method) */}
        <div className="transformation-box method-box">
          <h2 className="font-bold text-lg">Blur</h2>
          <p>blur details</p>
        </div>
      </div>

      {/* Arrow Down */}
      <div className="arrow"></div>

      {/* Proof Box */}
      <div className="transformation-box">
        <h2 className="font-bold text-lg text-center">Proof</h2>
        <p className="text-center">
          Details of the zero-knowledge proof associated with each
          Transformation. Ensures integrity of the transformation.
        </p>
      </div>

      {/* Arrow Down */}
      <div className="arrow"></div>

      {/* Blockchain Transaction Box */}
      <div className="transformation-box">
        <h2 className="font-bold text-lg text-center">
          Blockchain Transaction
        </h2>
        <p className="text-center">
          Contains details like image hash, proof, etc. Represents the
          transaction sent to the Mina blockchain.
        </p>
      </div>
    </div>
  )
}

export default DomainModelExplainer
