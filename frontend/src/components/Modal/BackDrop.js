import React from 'react'

export default function BackDrop(props) {
  return (
      <div className='backdrop'>
          
          <style jsx="true">
              {`
              .backdrop{
                position:fixed;
                left:0;
                top:0;
                height: 100%;
                width: 100%;
                background: rgba(0,0,0,.5)
              }
              `}
          </style>
    </div>
  )
}
