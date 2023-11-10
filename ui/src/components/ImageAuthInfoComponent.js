// ImageAuthInfoComponent.js
import React from 'react'

const ImageAuthInfoComponent = () => {
  return (
    <div className="container mx-auto p-5 space-y-4">
      {/* Introduction */}
      <div className="transformation-box">
        <h2 className="text-xl font-bold mb-4">
          The Challenge of Image Authenticity
        </h2>
        <p>
          In recent months, there has been a surge in new image generation
          models capable of producing images that are indistinguishable from
          real ones. Unfortunately, this technology also allows malicious actors
          to create fake news with ease.
        </p>
        <p className="mt-2">
          To combat this issue, Sony has implemented a signature scheme in their
          cameras that allows for the signing of images as they are taken. This
          is a step in the right direction, but what happens when
          post-production is required?
        </p>
        <p className="mt-2">
          The traditional approach would invalidate the signature, but our
          solution - zero knowledge proof post-production - keeps the signature
          valid. By using zk postproduction, we can maintain the integrity of
          the original image while allowing for necessary post-production edits.
          This ensures that the authenticity of the image is maintained
          throughout the entire editing process.
        </p>
      </div>

      {/* Problem Statement */}
      <div className="transformation-box">
        <h2 className="text-xl font-bold mb-4">Problem Statement</h2>
        <p>
          People are more and more losing trust in traditional media. We are
          confronted with new information everywhere we look. With the rise of
          image generation AI tools like stable diffusion, midjourney, or
          Dall-E, it is now easy for everyone to generate fake images. A fake
          image is used to intentionally spread fake news in order to manipulate
          opinions. How can we build a system to distinguish true from fake
          images?
        </p>
      </div>

      {/* Solution */}
      <div className="transformation-box">
        <h2 className="text-xl font-bold mb-4">Solution</h2>
        <p>
          Scientists* have proposed a method to first sign an image in camera
          and later do the image transformation inside a zero knowledge proof.
          The idea is simple. A camera is just like any other measurement tool.
          Sony supports now signing of images inside camera. Therefore, we can
          claim that a specific image has been taken by a specific camera. With
          the help of zk proofs, we can later do some image transformations and
          still guarantee a valid signature. Journalists need to post-process
          images in order to protect, for example, sources.
        </p>
        <p className="mt-2">
          *
          <a
            href="https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trisha Datta and Dan Boneh
          </a>
          , as well as
          <a
            href="https://arxiv.org/abs/2211.04775"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daniel Kang et al.
          </a>
        </p>
      </div>

      {/* Architecture */}
      <div className="transformation-box">
        <h2 className="text-xl font-bold mb-4">Architecture</h2>
        <p>
          The architecture of the application will consist of a React WebApp
          (NextJS) and zero knowledge proofs. Zk-proofs will be built inside
          snarkyJS.
        </p>
        <p className="mt-2">
          The React App will have a user interface which will allow users to
          upload an image and transform them. We assume that an image is signed
          inside a camera that is compliant with the C2PA standard. However, the
          signing can also be done by the user manually. In this case, the
          reputation of the user functions as the “truth authority”.
        </p>
        <h3 className="text-lg font-bold mt-4">
          Image Timestamping and Hash Storage:
        </h3>
        <ul className="list-disc list-inside">
          <li>Generate the image hash upon uploading the image.</li>
          <li>
            Timestamp the image by sending a transaction containing the image
            hash and the camera’s/user &apos;s digital signature to a zkApp on
            the Mina blockchain.
          </li>
          <li>
            Store the image hashes in a Merkle Tree for efficient and secure
            storage.
          </li>
        </ul>
        <h3 className="text-lg font-bold mt-4">
          Permissible Transformations and zkSNARK Circuits:
        </h3>
        <p>
          For each transformation type (crop, rotate, flip, resize, censoring,
          blur, and white balance), create a dedicated zkSNARK circuit to
          generate proofs for the transformation. The zkSNARK circuits will have
          public inputs (e.g., image hash, transformation parameters) and
          private inputs (e.g., original image, user &apos;s digital signature).
        </p>
        <h3 className="text-lg font-bold mt-4">
          Modular zkApp Design and Proxy zkApp:
        </h3>
        <p>
          Implement each transformation zkSNARK circuit within a separate zkApp.
          Utilize a proxy zkApp to call individual transformation zkApps, which
          handles the communication, proof generation, and verification between
          the WebApp and transformation zkApps.
        </p>
        <h3 className="text-lg font-bold mt-4">
          Transaction Submission and Verification:
        </h3>
        <p>
          Upon applying a transformation, the WebApp sends a request to the
          corresponding zkApp with the public inputs. The zkApp generates a
          zero-knowledge proof using the zkSNARK circuit, ensuring the
          transformation is applied to a valid signed image. The zkApp sends the
          proof back to the WebApp, which broadcasts the proof, transformed
          image hash, and transformation parameters to the Mina blockchain as a
          transaction. The Mina blockchain network verifies the proof and, if
          valid, timestamps the transformed image hash and updates the Merkle
          Tree.
        </p>
        <h3 className="text-lg font-bold mt-4">Authenticity and Privacy:</h3>
        <p>
          The combination of the proof, transformed image, and transformation
          parameters ensures the existence of an authentic original image while
          preserving its privacy.
          <b>
            This allows for verification without exposing the original image
            &apos;s content.
          </b>
        </p>
      </div>
    </div>
  )
}

export default ImageAuthInfoComponent
