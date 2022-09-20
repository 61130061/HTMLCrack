const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes = [
   {
      id: '1',
      type: 'input',
      data: { label: 'input' },
      position,
   },
   {
      id: '2',
      data: { label: 'node 2' },
      position,
   },
   {
      id: '2a',
      data: { label: 'node 2a' },
      position,
   },
   {
      id: '2b',
      data: { label: 'node 2b' },
      position,
   },
   {
      id: '2c',
      data: { label: 'node 2c' },
      position,
   },
   {
      id: '2d',
      data: { label: 'node 2d' },
      position,
   },
   {
      id: '3',
      data: { label: 'node 3' },
      position,
   },
   {
      id: '4',
      data: { label: 'node 4' },
      position,
   },
   {
      id: '5',
      data: { label: 'node 5' },
      position,
   },
   {
      id: '6',
      type: 'output',
      data: { label: 'output' },
      position,
   },
   { id: '7', type: 'output', data: { label: 'output' }, position },
];

export const initialEdges = [
   { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
   { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
   { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
   { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
   { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
   { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
   { id: 'e45', source: '4', target: '5', type: edgeType, animated: true },
   { id: 'e56', source: '5', target: '6', type: edgeType, animated: true },
   { id: 'e57', source: '5', target: '7', type: edgeType, animated: true },
];

export const demo2 = `
<html>
   <head>
      <title>My First Webpage</title>
   </head>

   <body>
      <h1>Welcome to my webpage</h1>
      <p>This site will be my <strong>new</strong> home on the web.</p>
      <p>This site will be my <strong>new</strong> home on the web.</p>
   </body>
</html>
`

export const demo = `
<!DOCTYPE html>
<html>
<head>
   <title>My First Webpage</title>
   <meta charset="UTF-8">
   <meta name="description" content="This is my first website. It includes lots of information about my life.">
</head>
<body>
   <h1>Welcome to my webpage</h1>
   <p>Welcome to <em>my</em> brand new website.</p>
   <p>This site will be my <strong>new</strong> home on the web.</p>
   <a href="/page2.html">Page2</a>
   <img src="testpic.jpg" alt="This is a test image" height="42" width="42">
   <p>This website will have the following benefits for my business:</p>
   <ul>
      <li>Increased traffic </li>
      <li>Global Reach</li>
      <li>Promotional Opportunities</li>
   </ul>
   <table>
      <tr>
         <td>Row 1 - Column 1</td>
         <td>Row 1 - Column 2 </td>
      </tr>
      <tr>
         <td>Row 2 - Column 1</td>
         <td>Row 2 - Column 2</td>
      </tr>
   </table>
</body>
</html>
`
