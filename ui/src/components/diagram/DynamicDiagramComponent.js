// DynamicDiagramComponent.js
import dynamic from 'next/dynamic'

const DynamicDiagramComponent = dynamic(() => import('./DiagramComponent'), {
  ssr: false, // Disable server-side rendering
})

export default DynamicDiagramComponent
