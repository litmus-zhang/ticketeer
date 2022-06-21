import React, { Component } from 'react'

export default class Events extends Component {
  render() {
    return (
      <div>
        <div className='events-control'>
        Share your events with others
        <button>
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
