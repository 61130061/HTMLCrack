import React, { useState, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, ConnectionLineType } from 'react-flow-renderer';

import { demo, demo2, initialNodes, initialEdges } from './utils/example';
import cracker from './utils/parser';
import { TestNode } from './components/CustomNodes';
import getLayoutedElements from './utils/dagre';

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
         />
      </div>
   );
}

export default App;
