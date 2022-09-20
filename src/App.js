import React, { useState, useEffect, useRef } from 'react';
import ReactFlow, { 
   useNodesState, 
   useEdgesState, 
   addEdge, 
   ConnectionLineType, 
   Controls
} from 'react-flow-renderer';
import Editor from "@monaco-editor/react";

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

const editorOption = {
   minimap: {
      enabled: false
   }
}


function App() {
   const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

   const editorRef = useRef(null);

   const updateFlow = () => {
      let newNodes = [], newEdges = [];
      cracker(newNodes, newEdges, editorRef.current.getValue());
      const { nodes: readyNodes, edges: readyEdges } = getLayoutedElements(newNodes, newEdges, 'LR');

      setNodes(readyNodes);
      setEdges(readyEdges);
   }

   const onEditorMount = (editor) => {
      editorRef.current = editor;
   }

   const onEditorChange = (value) => {
      //updateFlow();
   }
   
   return (
      <div className="bg-slate-800 h-screen text-white p-2">
         <div onClick={updateFlow} className="text-3xl font-bold">HTML Crack</div>
         <div className="flex h-[95%] relative">
            <div className="w-[40%] h-full">
               <Editor
                  height="100%"
                  defaultLanguage="html"
                  defaultValue={demo}
                  onMount={onEditorMount}
                  onChange={onEditorChange}
                  theme="vs-dark"
                  options={editorOption}
               />
            </div>
            <div className="flex-1 h-full bg-yello-200">
               <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  connectionLineType={ConnectionLineType.SmoothStep}
                  nodeTypes={{ testNode: TestNode }}
                  fitView
               >
                  <Controls />
               </ReactFlow>
            </div>
         </div>
      </div>
   );
}

export default App;
