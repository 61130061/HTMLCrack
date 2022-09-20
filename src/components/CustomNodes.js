import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export const TestNode = memo(({ data, isConnectable }) => {
   const check = () => {
      console.log(data);
   }

   return (
      <div onClick={check} className="p-5 text-center bg-white rounded min-w-[200px]">
         {data.isSource &&
         <Handle type="source" position={Position.Right} />
         }
         <div className="text-xl hover:font-bold text-blue-500">{data.label}</div>
         {data.isTarget &&
         <Handle type="target" position={Position.Left} />
         }
      </div>
   );
});
