import React from 'react'

export default function Modal(props) {
  return (
      <div className='modal'>
          <header className='modal__header'>
              {props.title}
          </header>
          <section className='modal__content'>
              {props.children}
          </section>
          <section className='modal_actions'>
              {
                  props.canCancel && <button onClick={props.onCancel}>Cancel</button>
              }
              {
                  props.canConfirm && <button onClick={props.onConfirm}>Confirm</button>
              }
          </section>
          <style jsx="true">
              {`
              .modal{
                
                width: 50rem;
                background: #fff;
                box-shadow: 0 2px 8px rgba(0,0,0 , .25);
                position: fixed;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                overflow: hidden;
                padding-bottom: 1rem;
                
              }
              .modal__content{
                margin-top: 1rem;
                display:flex;
                flex-direction: column;
                margin-left: 1rem;
              }
              .modal__header{
                background: blue;
                width: 100%;
                padding: 1rem;
                color: #fff

              }
              .modal_actions{
                display: flex;
                width: 100%;
               justify-content: flex-end;
               gap: 1rem;

              }
              @media (min-width: 768px){
                .modal{
                    width: 50rem;
                    left: calc((100% - 50rem)/ 2)
                }
              }
              button{
                background-color: blue;
                color: #fff;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 0.5rem;
    
              }
              `}
          </style>
    </div>
  )
}
