(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[888],{

/***/ 6840:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/_app",
      function () {
        return __webpack_require__(8116);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 3053:
/***/ (function() {

"use strict";
function loadCOIServiceWorker() {
    if ( true && window.location.hostname != "localhost") {
        const coi = window.document.createElement("script");
        coi.setAttribute("src", "/o1js-images/coi-serviceworker.min.js"); // update if your repo name changes for npm run deploy to work successfully
        window.document.head.appendChild(coi);
    }
}
loadCOIServiceWorker();



/***/ }),

/***/ 8116:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ App; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/styles/globals.css
var globals = __webpack_require__(2352);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
;// CONCATENATED MODULE: ./src/components/appContext.js

const AppContext = /*#__PURE__*/ (0,react.createContext)();
/* harmony default export */ var appContext = (AppContext);

// EXTERNAL MODULE: ./src/components/reactCOIServiceWorker.tsx
var reactCOIServiceWorker = __webpack_require__(3053);
// EXTERNAL MODULE: ./src/pages/index.tsx + 4 modules
var pages = __webpack_require__(3547);
;// CONCATENATED MODULE: ./src/pages/_app.tsx







// Custom hook for toast notifications
// function useToast() {
//   const notify = (message, type = 'info') => {
//     const options = {
//       position: 'top-right',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     }
//     switch (type) {
//       case 'success':
//         toast.success(message, options)
//         break
//       case 'warning':
//         toast.warn(message, options)
//         break
//       case 'error':
//         toast.error(message, options)
//         break
//       default:
//         toast.info(message, options)
//     }
//   }
//   return notify
// }
function App(param) {
    let { Component, pageProps } = param;
    let [state, setState] = (0,react.useState)({
        zkappWorkerClient: null,
        hasWallet: null,
        hasBeenSetup: false,
        accountExists: false,
        currentNum: null,
        publicKey: null,
        zkappPublicKey: null,
        creatingTransaction: false
    });
    // const notify = useToast()
    // -------------------------------------------------------
    // Do Setup
    // useEffect(() => {
    //   async function setup() {
    //     // if (!state.hasBeenSetup) {
    //     const zkappWorkerClient = new ZkappWorkerClient()
    //     console.log('Loading o1js...')
    //     // const zkappWorkerClient = new ZkappWorkerClient()
    //     // console.log('Loading o1js...')
    //     // // const toastLoading = toast.loading('Loading SnarkyJS...')
    //     // // toast('Loading SnarkyJS...', 'info')
    //     // await zkappWorkerClient.setActiveInstanceToBerkeley()
    //     // console.log('set active instance to Berkeley')
    //     try {
    //       await zkappWorkerClient.setActiveInstanceToBerkeley()
    //       console.log('set active instance to Berkeley')
    //     } catch (error) {
    //       console.error('Error setting active instance:', error)
    //     }
    //     const mina = (window as any).mina
    //     if (mina == null) {
    //       setState({ ...state, hasWallet: false })
    //       return
    //     }
    //     const publicKeyBase58: string = (await mina.requestAccounts())[0]
    //     const publicKey = PublicKey.fromBase58(publicKeyBase58)
    //     console.log('using key', publicKey.toBase58())
    //     console.log('checking if account exists...')
    //     const res = await zkappWorkerClient.fetchAccount({
    //       publicKey: publicKey!,
    //     })
    //     const accountExists = res.error == null
    //     await zkappWorkerClient.loadContract()
    //     // await zkappWorkerClient.loadLayer1()
    //     // await zkappWorkerClient.loadLayer2()
    //     // await zkappWorkerClient.loadInputImage()
    //     console.log('compiling zkApp')
    //     const toastCompiling = toast.loading('Compiling zkApp...')
    //     await zkappWorkerClient.compileContract()
    //     toast.update(toastCompiling, {
    //       render: 'zkApp compiled',
    //       type: 'success',
    //       isLoading: false,
    //       autoClose: 2000,
    //     })
    //     console.log('zkApp compiled')
    //     // const toastZkapppublickey = toast.loading('Using zkApp public key B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP')
    //     const toastZkapppublickey = toast.loading(
    //       <a
    //         href="https://berkeley.minaexplorer.com/wallet/B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP"
    //         target="_blank"
    //       >
    //         See zkApp Account
    //       </a>,
    //     )
    //     const zkappPublicKey = PublicKey.fromBase58(
    //       'B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP',
    //     )
    //     // await zkappWorkerClient.initZkappInstance(zkappPublicKey)
    //     toast.update(toastZkapppublickey, {
    //       render: (
    //         <a
    //           href="https://berkeley.minaexplorer.com/wallet/B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP"
    //           target="_blank"
    //         >
    //           See zkApp Account
    //         </a>
    //       ),
    //       type: 'success',
    //       isLoading: false,
    //       autoClose: 2000,
    //     })
    //     // setWeightsLayer1(weights_l1_8x8)
    //     // setWeightsLayer2(weights_l2_8x8)
    //     console.log('getting zkApp state...')
    //     await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
    //     const currentNum = await zkappWorkerClient.getNum()
    //     console.log('current state:', currentNum.toString())
    //     setState((prevState) => ({
    //       ...state,
    //       zkappWorkerClient,
    //       hasWallet: true,
    //       hasBeenSetup: true,
    //       publicKey,
    //       zkappPublicKey,
    //       accountExists,
    //       currentNum,
    //     }))
    //   }
    //   // }
    //   setup()
    // }, [])
    // useEffect(() => {
    //   const setup = async () => {
    //     const zkappWorkerClient = new ZkappWorkerClient()
    //     console.log('Loading o1js...')
    //     try {
    //       await zkappWorkerClient.setActiveInstanceToBerkeley()
    //       console.log('set active instance to Berkeley')
    //     } catch (error) {
    //       console.error('Error setting active instance:', error)
    //       return
    //     }
    //     // const mina = window.mina // Make sure 'mina' is properly declared globally or imported
    //     const mina = (window as any).mina
    //     if (!mina) {
    //       setState((prevState) => ({ ...prevState, hasWallet: false }))
    //       return
    //     }
    //     try {
    //       const publicKeyBase58 = (await mina.requestAccounts())[0]
    //       const publicKey = PublicKey.fromBase58(publicKeyBase58)
    //       console.log('using key', publicKey.toBase58())
    //       console.log('checking if account exists...')
    //       const accountResponse = await zkappWorkerClient.fetchAccount({
    //         publicKey,
    //       })
    //       const accountExists = !accountResponse.error
    //       console.log('compiling zkApp')
    //       const toastCompiling = toast.loading('Compiling zkApp...')
    //       await zkappWorkerClient.compileContract()
    //       toast.update(toastCompiling, {
    //         render: 'zkApp compiled',
    //         type: 'success',
    //         isLoading: false,
    //         autoClose: 2000,
    //       })
    //       const zkappPublicKey = PublicKey.fromBase58(
    //         'B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP',
    //       )
    //       // await zkappWorkerClient.initZkappInstance(zkappPublicKey) // Assuming this line should be uncommented
    //       console.log('getting zkApp state...')
    //       await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
    //       const currentNum = await zkappWorkerClient.getNum()
    //       console.log('current state:', currentNum.toString())
    //       setState((prevState) => ({
    //         ...prevState,
    //         zkappWorkerClient,
    //         hasWallet: true,
    //         hasBeenSetup: true,
    //         publicKey,
    //         zkappPublicKey,
    //         accountExists,
    //         currentNum,
    //       }))
    //     } catch (error) {
    //       console.error('An error occurred during setup:', error)
    //       // Handle error appropriately, perhaps set an error state property
    //     }
    //   }
    //   setup()
    // }, []) // The empty array ensures this effect runs only once after the initial render
    // // -------------------------------------------------------
    // // Wait for account to exist, if it didn't
    // useEffect(() => {
    //   ;(async () => {
    //     if (state.hasBeenSetup && !state.accountExists) {
    //       for (;;) {
    //         console.log('checking if account exists...')
    //         const res = await state.zkappWorkerClient!.fetchAccount({
    //           publicKey: state.publicKey!,
    //         })
    //         const accountExists = res.error == null
    //         if (accountExists) {
    //           break
    //         }
    //         await new Promise((resolve) => setTimeout(resolve, 5000))
    //       }
    //       setState({ ...state, accountExists: true })
    //     }
    //   })()
    // }, [state.hasBeenSetup])
    // // -------------------------------------------------------
    // // Refresh the current state
    // const onRefreshCurrentNum = async () => {
    //   console.log('getting zkApp state...')
    //   await state.zkappWorkerClient!.fetchAccount({
    //     publicKey: state.zkappPublicKey!,
    //   })
    //   const currentNum = await state.zkappWorkerClient!.getNum()
    //   console.log('current state:', currentNum.toString())
    //   setState({ ...state, currentNum })
    // }
    // // -------------------------------------------------------
    // // Create UI elements
    // let hasWallet
    // if (state.hasWallet != null && !state.hasWallet) {
    //   const auroLink = 'https://www.aurowallet.com/'
    //   const auroLinkElem = (
    //     <a href={auroLink} target="_blank" rel="noreferrer">
    //       {' '}
    //       [Link]{' '}
    //     </a>
    //   )
    //   hasWallet = (
    //     <div>
    //       {' '}
    //       Could not find a wallet. Install Auro wallet here: {auroLinkElem}
    //     </div>
    //   )
    // }
    // let setupText = state.hasBeenSetup
    //   ? 'SnarkyJS Ready'
    //   : 'Setting up SnarkyJS...'
    // let setup = (
    //   <div>
    //     {' '}
    //     {setupText} {hasWallet}
    //   </div>
    // )
    // let accountDoesNotExist
    // if (state.hasBeenSetup && !state.accountExists) {
    //   const faucetLink =
    //     'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58()
    //   accountDoesNotExist = (
    //     <div>
    //       Account does not exist. Please visit the faucet to fund this account
    //       <a href={faucetLink} target="_blank" rel="noreferrer">
    //         {' '}
    //         [Link]{' '}
    //       </a>
    //     </div>
    //   )
    // }
    // let mainContent
    // if (state.hasBeenSetup && state.accountExists) {
    //   mainContent = <div>Main Content</div>
    // }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(appContext.Provider, {
            value: {
                state,
                setState
            },
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(Component, {
                    ...pageProps,
                    state: state,
                    setState: setState
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(pages["default"], {})
            ]
        })
    });
}


/***/ }),

/***/ 3547:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Home; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./src/components/reactCOIServiceWorker.tsx
var reactCOIServiceWorker = __webpack_require__(3053);
// EXTERNAL MODULE: ./src/styles/Home.module.css
var Home_module = __webpack_require__(1110);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
;// CONCATENATED MODULE: ./src/components/DomainModelExplainer.js
// DomainModelExplainer.js


const DomainModelExplainer = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "container mx-auto p-5",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                className: "text-3xl font-bold underline mb-4",
                children: "Image Authentication Domain Model"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "font-bold text-lg text-center",
                        children: "User"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-center",
                        children: "Represents the entity uploading or signing the image. Includes attributes like userID, reputation, etc."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "arrow"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "font-bold text-lg text-center",
                        children: "Image"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-center",
                        children: "Central entity. Attributes include image hash, digital signature, etc. Uploaded by a User."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "arrow"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                className: "text-2xl text-center font-bold my-4",
                children: "Transformation Methods"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-container",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "transformation-box method-box",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                className: "font-bold text-lg",
                                children: "Crop"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                children: " crop it to the desired area."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "transformation-box method-box",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                className: "font-bold text-lg",
                                children: "Rotate"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                children: " rotate it by a specified degree."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "transformation-box method-box",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                className: "font-bold text-lg",
                                children: "Flip"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                children: " flip it horizontally or vertically."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "transformation-box method-box",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                className: "font-bold text-lg",
                                children: "Resize"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                children: " change its dimensions."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "transformation-box method-box",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                className: "font-bold text-lg",
                                children: "Censoring"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                children: " obscure a portion for privacy."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "transformation-box method-box",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                className: "font-bold text-lg",
                                children: "Blur"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                children: "blur details"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "arrow"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "font-bold text-lg text-center",
                        children: "Proof"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-center",
                        children: "Details of the zero-knowledge proof associated with each Transformation. Ensures integrity of the transformation."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "arrow"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "font-bold text-lg text-center",
                        children: "Blockchain Transaction"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-center",
                        children: "Contains details like image hash, proof, etc. Represents the transaction sent to the Mina blockchain."
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ var components_DomainModelExplainer = (DomainModelExplainer);

;// CONCATENATED MODULE: ./src/components/DynamicBG.js
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



function StaticGradientBG(param) {
    let { children } = param;
    const canvasRef = (0,react.useRef)(null);
    // Function to generate a static blue gradient
    function createGradient(ctx, width, height) {
        let gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "rgba(25, 85, 125, 1)") // Darker blue at the top
        ;
        gradient.addColorStop(1, "rgba(65, 165, 245, 1)") // Lighter blue towards the bottom
        ;
        return gradient;
    }
    (0,react.useEffect)(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        let gradient = createGradient(ctx, width, height);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: (Home_module_default()).dynamicBackground,
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minHeight: "100vh",
            zIndex: -1
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("canvas", {
                ref: canvasRef,
                style: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: children
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/ImageAuthProcessVisualizer.js
// ImageAuthProcessVisualizer.js


const ImageAuthProcessVisualizer = ()=>{
    // Helper function to generate colorful pixel array boxes
    const generatePixelArrayBoxes = (count, censoredCount)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "flex justify-center mb-2",
            children: Array.from({
                length: count
            }, (_, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "w-6 h-6 border m-1 ".concat(index < censoredCount ? "bg-black" : "bg-".concat(index % 2 === 0 ? "red" : "blue", "-300")),
                    style: {
                        backgroundColor: index < censoredCount ? "black" : index % 2 === 0 ? "#feb2b2" : "#bee3f8",
                        borderColor: "#e5e7eb"
                    }
                }, index))
        });
    // Helper function to generate a hash representation around each pixel
    const generateHashBoxes = (count, censoredCount)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "flex justify-center mb-2",
            children: Array.from({
                length: count
            }, (_, index)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "m-1 flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "w-6 h-6 border ".concat(index < censoredCount ? "bg-black" : "bg-".concat(index % 2 === 0 ? "red" : "blue", "-300")),
                            style: {
                                backgroundColor: index < censoredCount ? "black" : index % 2 === 0 ? "#feb2b2" : "#bee3f8",
                                borderColor: "#e5e7eb"
                            }
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "border p-1 text-xs text-center mt-1",
                            children: "Hash"
                        })
                    ]
                }, index))
        });
    // Helper function to generate the blockchain illustration
    const generateBlockchainIllustration = ()=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "flex items-center justify-center",
            children: Array.from({
                length: 3
            }, (_, index)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "flex flex-col items-center mx-2",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "w-12 h-12 border border-gray-400 bg-gray-200 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                className: "text-xs",
                                children: [
                                    "Block ",
                                    index + 1
                                ]
                            })
                        }),
                        index < 2 && /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            className: "text-xl mt-2",
                            children: "→"
                        })
                    ]
                }, index))
        });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "container mx-auto p-5",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                className: "text-3xl font-bold underline mb-4",
                children: "Image Authentication Process Visualization"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "flex flex-col items-center justify-center",
                        children: [
                            " ",
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "border p-4 rounded-lg shadow-lg mb-4 bg-blue-100 flex flex-col items-center",
                                children: [
                                    " ",
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                        className: "text-3xl",
                                        children: "\uD83D\uDCF7"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                        className: "text-sm mt-2",
                                        children: "Image Capture and Signing either in camera or from trusted authority"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "arrow mb-4"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "border p-4 rounded-lg shadow-lg mb-4 bg-green-100",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-sm mb-2",
                                children: "Pixel Hashing and Commitment to chain"
                            }),
                            generateHashBoxes(10, 0)
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "arrow mb-4"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "border p-4 rounded-lg shadow-lg mb-4 bg-purple-100",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-sm mb-2",
                                children: "Censoring Transformation Applied or other method"
                            }),
                            generatePixelArrayBoxes(10, 5)
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "arrow mb-4"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "border p-4 rounded-lg shadow-lg mb-4 bg-yellow-300",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-sm",
                                children: "Recursive Proof Composition"
                            }),
                            generateHashBoxes(10, 5)
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "arrow mb-4"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "border p-4 rounded-lg shadow-lg mb-4 bg-blue-200",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "text-3xl ",
                                children: "✅"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-sm mt-2",
                                children: "Blockchain Verification"
                            }),
                            generateBlockchainIllustration()
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "arrow mb-4"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "border p-4 rounded-lg shadow-lg bg-green-200",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "text-3xl"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-sm mt-2",
                                children: "Browser Plugin could receive confirmation"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ var components_ImageAuthProcessVisualizer = (ImageAuthProcessVisualizer);

;// CONCATENATED MODULE: ./src/components/ImageAuthInfoComponent.js
// ImageAuthInfoComponent.js


const ImageAuthInfoComponent = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "container mx-auto p-5 space-y-4",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "text-xl font-bold mb-4",
                        children: "The Challenge of Image Authenticity"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        children: "In recent months, there has been a surge in new image generation models capable of producing images that are indistinguishable from real ones. Unfortunately, this technology also allows malicious actors to create fake news with ease."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "mt-2",
                        children: "To combat this issue, Sony has implemented a signature scheme in their cameras that allows for the signing of images as they are taken. This is a step in the right direction, but what happens when post-production is required?"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "mt-2",
                        children: "The traditional approach would invalidate the signature, but our solution - zero knowledge proof post-production - keeps the signature valid. By using zk postproduction, we can maintain the integrity of the original image while allowing for necessary post-production edits. This ensures that the authenticity of the image is maintained throughout the entire editing process."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "text-xl font-bold mb-4",
                        children: "Problem Statement"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        children: "People are more and more losing trust in traditional media. We are confronted with new information everywhere we look. With the rise of image generation AI tools like stable diffusion, midjourney, or Dall-E, it is now easy for everyone to generate fake images. A fake image is used to intentionally spread fake news in order to manipulate opinions. How can we build a system to distinguish true from fake images?"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "text-xl font-bold mb-4",
                        children: "Solution"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        children: "Scientists* have proposed a method to first sign an image in camera and later do the image transformation inside a zero knowledge proof. The idea is simple. A camera is just like any other measurement tool. Sony supports now signing of images inside camera. Therefore, we can claim that a specific image has been taken by a specific camera. With the help of zk proofs, we can later do some image transformations and still guarantee a valid signature. Journalists need to post-process images in order to protect, for example, sources."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                        className: "mt-2",
                        children: [
                            "*",
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                href: "https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "Trisha Datta and Dan Boneh"
                            }),
                            ", as well as",
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                href: "https://arxiv.org/abs/2211.04775",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "Daniel Kang et al."
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "transformation-box",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "text-xl font-bold mb-4",
                        children: "Architecture"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        children: "The architecture of the application will consist of a React WebApp (NextJS) and zero knowledge proofs. Zk-proofs will be built inside snarkyJS."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "mt-2",
                        children: "The React App will have a user interface which will allow users to upload an image and transform them. We assume that an image is signed inside a camera that is compliant with the C2PA standard. However, the signing can also be done by the user manually. In this case, the reputation of the user functions as the “truth authority”."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                        className: "text-lg font-bold mt-4",
                        children: "Image Timestamping and Hash Storage:"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                        className: "list-disc list-inside",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                children: "Generate the image hash upon uploading the image."
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                children: "Timestamp the image by sending a transaction containing the image hash and the camera’s/user 's digital signature to a zkApp on the Mina blockchain."
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                children: "Store the image hashes in a Merkle Tree for efficient and secure storage."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                        className: "text-lg font-bold mt-4",
                        children: "Permissible Transformations and zkSNARK Circuits:"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        children: "For each transformation type (crop, rotate, flip, resize, censoring, blur, and white balance), create a dedicated zkSNARK circuit to generate proofs for the transformation. The zkSNARK circuits will have public inputs (e.g., image hash, transformation parameters) and private inputs (e.g., original image, user 's digital signature)."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                        className: "text-lg font-bold mt-4",
                        children: "Modular zkApp Design and Proxy zkApp:"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        children: "Implement each transformation zkSNARK circuit within a separate zkApp. Utilize a proxy zkApp to call individual transformation zkApps, which handles the communication, proof generation, and verification between the WebApp and transformation zkApps."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                        className: "text-lg font-bold mt-4",
                        children: "Transaction Submission and Verification:"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        children: "Upon applying a transformation, the WebApp sends a request to the corresponding zkApp with the public inputs. The zkApp generates a zero-knowledge proof using the zkSNARK circuit, ensuring the transformation is applied to a valid signed image. The zkApp sends the proof back to the WebApp, which broadcasts the proof, transformed image hash, and transformation parameters to the Mina blockchain as a transaction. The Mina blockchain network verifies the proof and, if valid, timestamps the transformed image hash and updates the Merkle Tree."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                        className: "text-lg font-bold mt-4",
                        children: "Authenticity and Privacy:"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                        children: [
                            "The combination of the proof, transformed image, and transformation parameters ensures the existence of an authentic original image while preserving its privacy.",
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("b", {
                                children: "This allows for verification without exposing the original image 's content."
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ var components_ImageAuthInfoComponent = (ImageAuthInfoComponent);

;// CONCATENATED MODULE: ./src/pages/index.tsx








let transactionFee = 0.1;
function Home() {
    const [state, setState] = (0,react.useState)({
        zkappWorkerClient: null,
        hasWallet: null,
        hasBeenSetup: false,
        accountExists: false,
        currentNum: null,
        publicKey: null,
        zkappPublicKey: null,
        creatingTransaction: false
    });
    // const [val, setVal] = useState(2)
    // useEffect(() => {
    //   ;(window as any).f = setVal
    // }, [])
    // useEffect(() => {
    //   ;(window as any).hello = Home
    // })
    // const hello = () => {
    //   console.log('hello')
    // }
    // const [displayText, setDisplayText] = useState('')
    // const [transactionlink, setTransactionLink] = useState('')
    // -------------------------------------------------------
    // Do Setup
    // useEffect(() => {
    //   async function timeout(seconds: number): Promise<void> {
    //     return new Promise<void>((resolve) => {
    //       setTimeout(() => {
    //         resolve()
    //       }, seconds * 1000)
    //     })
    //   }
    //   ;(async () => {
    //     if (!state.hasBeenSetup) {
    //       setDisplayText('Loading web worker...')
    //       console.log('Loading web worker...')
    //       const zkappWorkerClient = new ZkappWorkerClient()
    //       await timeout(5)
    //       toast.update(toast.loading('Loading web worker...'), {
    //         render: 'Done loading web worker',
    //         type: 'success',
    //         isLoading: false,
    //         autoClose: 2000,
    //       })
    //       setDisplayText('Done loading web worker')
    //       console.log('Done loading web worker')
    //       await zkappWorkerClient.setActiveInstanceToBerkeley()
    //       const mina = (window as any).mina
    //       if (mina == null) {
    //         setState({ ...state, hasWallet: false })
    //         return
    //       }
    //       const publicKeyBase58: string = (await mina.requestAccounts())[0]
    //       const publicKey = PublicKey.fromBase58(publicKeyBase58)
    //       console.log(`Using key:${publicKey.toBase58()}`)
    //       setDisplayText(`Using key:${publicKey.toBase58()}`)
    //       setDisplayText('Checking if fee payer account exists...')
    //       console.log('Checking if fee payer account exists...')
    //       const res = await zkappWorkerClient.fetchAccount({
    //         publicKey: publicKey!,
    //       })
    //       const accountExists = res.error == null
    //       await zkappWorkerClient.loadContract()
    //       console.log('Compiling recursion...')
    //       setDisplayText('Compiling Recursion...')
    //       await zkappWorkerClient.compileRecursion()
    //       setDisplayText('Compiling zkApp...')
    //       await zkappWorkerClient.compileContract()
    //       console.log('zkApp compiled')
    //       setDisplayText('zkApp compiled...')
    //       const zkappPublicKey = PublicKey.fromBase58(
    //         '',
    //       )
    //       await zkappWorkerClient.initZkappInstance(zkappPublicKey)
    //       console.log('Getting zkApp state...')
    //       setDisplayText('Getting zkApp state...')
    //       await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
    //       const currentNum = await zkappWorkerClient.getNum()
    //       console.log(`Current state in zkApp: ${currentNum.toString()}`)
    //       setDisplayText('')
    //       setState({
    //         ...state,
    //         zkappWorkerClient,
    //         hasWallet: true,
    //         hasBeenSetup: true,
    //         publicKey,
    //         zkappPublicKey,
    //         accountExists,
    //         currentNum,
    //       })
    //     }
    //   })()
    // }, [])
    // -------------------------------------------------------
    // Wait for account to exist, if it didn't
    // useEffect(() => {
    //   ;(async () => {
    //     if (state.hasBeenSetup && !state.accountExists) {
    //       for (;;) {
    //         setDisplayText('Checking if fee payer account exists...')
    //         console.log('Checking if fee payer account exists...')
    //         const res = await state.zkappWorkerClient!.fetchAccount({
    //           publicKey: state.publicKey!,
    //         })
    //         const accountExists = res.error == null
    //         if (accountExists) {
    //           break
    //         }
    //         await new Promise((resolve) => setTimeout(resolve, 5000))
    //       }
    //       setState({ ...state, accountExists: true })
    //     }
    //   })()
    // }, [state.hasBeenSetup])
    // -------------------------------------------------------
    // Send a transaction
    // const onSendTransaction = async () => {
    //   setState({ ...state, creatingTransaction: true })
    //   setDisplayText('Creating a transaction...')
    //   console.log('Creating a transaction...')
    //   await state.zkappWorkerClient!.fetchAccount({
    //     publicKey: state.publicKey!,
    //   })
    //   // await state.zkappWorkerClient!.createUpdateTransaction()
    //   setDisplayText('Creating proof...')
    //   console.log('Creating proof...')
    //   await state.zkappWorkerClient!.proveUpdateTransaction()
    //   console.log('Requesting send transaction...')
    //   setDisplayText('Requesting send transaction...')
    //   const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON()
    //   setDisplayText('Getting transaction JSON...')
    //   console.log('Getting transaction JSON...')
    //   const { hash } = await (window as any).mina.sendTransaction({
    //     transaction: transactionJSON,
    //     feePayer: {
    //       fee: transactionFee,
    //       memo: '',
    //     },
    //   })
    //   const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`
    //   console.log(`View transaction at ${transactionLink}`)
    //   setTransactionLink(transactionLink)
    //   setDisplayText(transactionLink)
    //   setState({ ...state, creatingTransaction: false })
    // }
    // -------------------------------------------------------
    // Refresh the current state
    // const onRefreshCurrentNum = async () => {
    //   console.log('Getting zkApp state...')
    //   setDisplayText('Getting zkApp state...')
    //   await state.zkappWorkerClient!.fetchAccount({
    //     publicKey: state.zkappPublicKey!,
    //   })
    //   const currentNum = await state.zkappWorkerClient!.getNum()
    //   setState({ ...state, currentNum })
    //   console.log(`Current state in zkApp: ${currentNum.toString()}`)
    //   setDisplayText('')
    // }
    // -------------------------------------------------------
    // Create UI elements
    // let hasWallet
    // if (state.hasWallet != null && !state.hasWallet) {
    //   const auroLink = 'https://www.aurowallet.com/'
    //   const auroLinkElem = (
    //     <a href={auroLink} target="_blank" rel="noreferrer">
    //       Install Auro wallet here
    //     </a>
    //   )
    //   hasWallet = <div>Could not find a wallet. {auroLinkElem}</div>
    // }
    // const stepDisplay = transactionlink ? (
    //   <a href={displayText} target="_blank" rel="noreferrer">
    //     View transaction
    //   </a>
    // ) : (
    //   displayText
    // )
    // let setup = (
    //   <div
    //     className={styles.start}
    //     style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: '5rem' }}
    //   >
    //     {stepDisplay}
    //     {hasWallet}
    //   </div>
    // )
    // let accountDoesNotExist
    // if (state.hasBeenSetup && !state.accountExists) {
    //   const faucetLink =
    //     'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58()
    //   accountDoesNotExist = (
    //     <div>
    //       <span style={{ paddingRight: '1rem' }}>Account does not exist.</span>
    //       <a href={faucetLink} target="_blank" rel="noreferrer">
    //         Visit the faucet to fund this fee payer account
    //       </a>
    //     </div>
    //   )
    // }
    // let mainContent
    // if (state.hasBeenSetup && state.accountExists) {
    //   mainContent = (
    //     <div style={{ justifyContent: 'center', alignItems: 'center' }}>
    //       <div className={styles.center} style={{ padding: 0 }}>
    //         Current state in zkApp: {state.currentNum!.toString()}{' '}
    //       </div>
    //       <button
    //         className={styles.card}
    //         onClick={onSendTransaction}
    //         disabled={state.creatingTransaction}
    //       >
    //         Send Transaction
    //       </button>
    //       <button className={styles.card} onClick={onRefreshCurrentNum}>
    //         Get Latest State
    //       </button>
    //       {val}
    //     </div>
    //   )
    // }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(StaticGradientBG, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: (Home_module_default()).main,
                style: {
                    padding: 0
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: " text-black",
                    children: "zk IMAGE"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_DomainModelExplainer, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_ImageAuthProcessVisualizer, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_ImageAuthInfoComponent, {})
        ]
    });
}


/***/ }),

/***/ 2352:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1110:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"main":"Home_main__2uIek","background":"Home_background__CTycG","backgroundGradients":"Home_backgroundGradients__VUGb4","container":"Home_container__9OuOz","tagline":"Home_tagline__Jw01K","start":"Home_start__ELciH","code":"Home_code__BZK8z","grid":"Home_grid__vo_ES","card":"Home_card__HIlp_","center":"Home_center__Y_rV4","logo":"Home_logo__ZEOng","content":"Home_content__Qnbja"};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [774,179], function() { return __webpack_exec__(6840), __webpack_exec__(9974); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);