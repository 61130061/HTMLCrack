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
   const [vertical, setVertical] = useState(false);
   const [rtu, setRtu] = useState(false);

   const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

   const editorRef = useRef(null);

   const updateFlow = () => {
      let newNodes = [], newEdges = [];
      const direction = vertical ? 'TB' : 'LR';
      cracker(newNodes, newEdges, editorRef.current.getValue());
      const { nodes: readyNodes, edges: readyEdges } = getLayoutedElements(newNodes, newEdges, direction);

      setNodes(readyNodes);
      setEdges(readyEdges);
   }

   const onEditorMount = (editor) => {
      editorRef.current = editor;
   }

   const onEditorChange = (value) => {
      if (rtu) {
         updateFlow();
      }
   }
   
   return (
      <div className="h-screen p-2">
         <div className="flex justify-between bg-zinc-800 items-center py-2">
            <div className="flex items-center gap-4">
               <div className="text-3xl font-bold">HTML Crack</div>
               <a 
                  href="https://github.com/61130061/HTMLCrack"
                  target="_blank"
                  className="font-bold text-blue-500 hover:cursor-pointer hover:underline"
               >
                  Github Repo
               </a>
            </div>
            <div className="flex gap-4">
               <div className="flex gap-2 items-center">
                  <input 
                     id="vertical" 
                     type="checkbox" 
                     checked={rtu}
                     className="hover:cursor-pointer"
                     onChange={() => setRtu(!rtu)}
                  />
                  <label for="vertical" className="hover:cursor-pointer">auto compile</label>
               </div>
               <div onClick={updateFlow} className="py-1 px-2 bg-white text-black rounded hover:underline hover:cursor-pointer">
                  compile
               </div>
            </div>
         </div>
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
            <div className="flex-1 h-full bg-zinc-900">
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
