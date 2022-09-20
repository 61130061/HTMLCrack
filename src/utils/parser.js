/*

Data Structure

Node []
   id          String
   type?       String
   data        Object
      label    String
   position    Object
      x        Number
      y        Number

Edge []
   id          String
   source      String
   target      String
   type?       String
   animated?   Boolean

*/

const position = { x: 0, y: 0 }

function parseTagOnly(nodes, edges, child, parent = null) {
   let id = 0;
   const isExist = nodes.find(e => {
      if (e.data.label === child[1].nodeName) id+=1;
   });

   const nodeId = child[1].nodeName + `-${id}`;

   nodes.push({
      id: nodeId,
      type: 'testNode',
      data: {
         label: child[1].nodeName,
         isTarget: parent !== null,
         isSource: true,
      },
      position
   });

   if (parent) {
      edges.push({
         id: 'e-' + edges.length,
         source: parent,
         target: nodeId,
         type: 'smoothstep'
      });
   }

   Object.entries(child[1].children).forEach(baby => {
      parseTagOnly(nodes, edges, baby, nodeId);
   });
}


function parseAll(nodes, edges, child, parent = null) {

}


function cracker(nodes, edges, html) {
   const dom = new DOMParser().parseFromString(html, 'text/html');

   Object.entries(dom.children).forEach(child => {
      parseTagOnly(nodes, edges, child);
   });
}


export default cracker;
