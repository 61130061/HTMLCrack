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

function parse(nodes, edges, child, isVertical, parent = null) {
   let id = 0;
   const isExist = nodes.find(e => {
      if (e.data.label === child[1].tagName) id+=1;
   });

   const nodeId = child[1].tagName + `-${id}`;

   nodes.push({
      id: nodeId,
      type: 'testNode',
      data: {
         label: child[1].tagName,
         isTarget: parent !== null,
         isSource: true,
         isVertical,
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
      parse(nodes, edges, baby, isVertical, nodeId);
   });
}


function cracker(nodes, edges, isVertical, html) {
   const dom = new DOMParser().parseFromString(html, 'text/html');

   Object.entries(dom.children).forEach(child => {
      parse(nodes, edges, child, isVertical);
   });
}


export default cracker;
