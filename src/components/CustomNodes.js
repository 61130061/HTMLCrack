import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export const TestNode = memo(({ data, isConnectable }) => {
   const check = () => {
      console.log(data);
   }

   return (
      <div onClick={check} className="p-2 bg-white text-xl text-blue-500 rounded-lg w-[200px]">
         {data.isSource &&
         <Handle type="source" position={data.isVertical ? Position.Bottom : Position.Right} />
         }
         <div>
            <div className="text-center hover:font-bold">{data.label}</div>
         </div>
         {data.isTarget &&
         <Handle type="target" position={data.isVertical ? Position.Top : Position.Left} />
         }
      </div>
   );
});
