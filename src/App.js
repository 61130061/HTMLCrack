import React, { useState, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, ConnectionLineType } from 'react-flow-renderer';
import dagre from 'dagre';

import { demo, demo2, initialNodes, initialEdges } from './utils/example';
import cracker from './utils/parser';
import { TestNode } from './components/CustomNodes';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 80

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
   const isHorizontal = direction === 'LR';
   dagreGraph.setGraph({ rankdir: direction });

   nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
   });

   edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
   });

   dagre.layout(dagreGraph);

   nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';
      node.position = {
         x: nodeWithPosition.x - nodeWidth / 2,
         y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
   });

   return { nodes, edges };
};

let demoNodes = [];
let demoEdges = [];

cracker(demoNodes, demoEdges, demo);

// generate layout nodes and edges
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
   demoNodes,
   demoEdges,
   'LR'
);


function App() {
   const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
   
   const check = () => {
      console.log(nodes);
      console.log(edges);
   }
   
   return (
      <div className="bg-slate-800 h-screen text-white p-10">
         <div onClick={check} className="text-3xl font-bold">Hello HTML Crack</div>
         <ReactFlow
            nodes={nodes}
            edges={edges}
            connectionLineType={ConnectionLineType.SmoothStep}
            nodeTypes={{ testNode: TestNode }}
            fitView
         />
      </div>
   );
}

export default App;
