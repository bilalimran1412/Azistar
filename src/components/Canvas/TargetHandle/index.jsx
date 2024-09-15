import React from 'react'
import { Handle } from 'reactflow'


function TargetHandle({ id }) {
    return (

        <Handle
            type="target"
            position="left"
            id={`target-${id}`}
            style={{ borderRadius: "0px", width: "2px", height: "25px", outline: "2px solid lightgreen", background: "lightgreen" }}
        />
    )
}

export default TargetHandle
