import React, { Component } from 'react'
import BackDrop from '../components/Modal/BackDrop'
import Modal from '../components/Modal/Modal'



export default class Events extends Component
{
  
  state = {
    creating: false,
  }

  startCreateEventHandler = () =>
  {
    this.setState({creating: true})
  }

  modalConfirmHandler = () =>
  {
    this.setState({creating: false})
  }
  modalCancelHandler = () =>
  {
    this.setState({creating: false})
  }
  render() {
    return (
      <div>
        {
          this.state.creating && <>
            <BackDrop/>
            <Modal title="Add Events" canCancel canConfirm onCancel={this.modalCancelHandler } onConfirm={this.modalConfirmHandler}
            >
          <p>This is my Modal</p>
        </Modal>
          </>
        }
        
        <div className='events-control'>
        Share your events with others
        <button onClick={this.startCreateEventHandler}>
          Create Event
          </button>
          <p>
            
          </p>
        </div>
        

        <style jsx="true">
          {`
          .events-control{
            margin: 3rem auto;
            padding: 2rem;
            width: 30rem;
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: center;
            border: 1px solid blue;
          }
          .events-control button{
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
}
