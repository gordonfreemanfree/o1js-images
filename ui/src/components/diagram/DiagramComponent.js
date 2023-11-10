// DiagramComponent.js
import React from 'react'
import createEngine, {
  DefaultNodeModel,
  DiagramModel,
  DefaultLinkModel,
} from '@projectstorm/react-diagrams'
import { CanvasWidget } from '@projectstorm/react-canvas-core'

export default function DiagramComponent() {
  //1) setup the diagram engine
  var engine = createEngine()

  //2) setup the diagram model
  var model = new DiagramModel()

  //3-A) create a default node
  var node1 = new DefaultNodeModel({
    name: 'Image Capture',
    color: 'rgb(0,192,255)',
  })
  node1.setPosition(100, 100)
  let port1 = node1.addOutPort('Output')

  //3-B) create another default node
  var node2 = new DefaultNodeModel({
    name: 'Pixel Processing',
    color: 'rgb(255,255,0)',
  })
  node2.setPosition(300, 100)
  let port2 = node2.addInPort('Input')

  // link the ports
  let link1 = new DefaultLinkModel()
  link1.setSourcePort(port1)
  link1.setTargetPort(port2)

  //4) add the models to the root graph
  model.addAll(node1, node2, link1)

  //5) load model into engine
  engine.setModel(model)

  //6) render the diagram!
  return <CanvasWidget className="diagram-container" engine={engine} />
}
