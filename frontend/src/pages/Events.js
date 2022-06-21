import React, { Component } from 'react'
import BackDrop from '../components/Modal/BackDrop'
import Modal from '../components/Modal/Modal'
import AuthContext from '../context/auth-context'



export default class Events extends Component
{
  
  state = {
    creating: false,
    events: []
  }
  constructor(props)
  {
    super(props)
    this.titleEl = React.createRef()
    this.priceEl = React.createRef()
    this.dateEl = React.createRef()
    this.descEl = React.createRef()
  }

  static contextType = AuthContext

  componentDidMount()
  {
    this.fetchEvents()
  }
  startCreateEventHandler = () =>
  {
    this.setState({creating: true})
  }
  fetchEvents()
  {
    const requestBody = {
      query: `
      query{
        events{
          title
          description
          price
          date
          creator{

            _id
            email
          }
        }
      }
      `
    }
    const token = this.context.token


  fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody), 
      headers: {
          'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token,
          
      }

  }).then(
      (response) =>
      { 
          if(response.status !== 200 && response.status !== 201)
          {
              throw new Error('Failed')
          }
          return response.json()
      }
  ).then(
    (data) =>
    {
      const events = data.data.events
      this.setState({events : events})
    
    }
      )
  .catch(err =>
  { 
      console.log(err)
  })
}
  modalConfirmHandler = () =>
  {
    this.setState({ creating: false })
    const title = this.titleEl.current.value
    const date = this.dateEl.current.value
    const price = +this.priceEl.current.value
    const desc = this.descEl.current.value

    if (title.trim().length === 0 || date.trim().length === 0 || price <= 0 || desc.trim().length === 0)
    {
      throw new Error("Invalid input ")
    }


    const event = { title, price, date, desc }
    
    console.log(event);
 
  
      
  const requestBody = {
      query: `
      mutation{
        createEvent(eventInput:{
          title: "${title}",
          description: "${desc}",
          price: ${price},
          date:"${date}"
        }){
          _id
          title
          description
          date
          price
          creator{
            _id
            email
          }

        }
      }
      `
    }
    const token = this.context.token


  fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody), 
      headers: {
          'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
          
      }

  }).then(
      (response) =>
      { 
          if(response.status !== 200 && response.status !== 201)
          {
              throw new Error('Failed')
          }
          return response.json()
      }
  ).then(
    (data) =>
    {
      console.log(data);
    
    }
      )
  .catch(err =>
  { 
      console.log(err)
  })
  }
  modalCancelHandler = () =>
  {
    this.setState({creating: false})
  }
  render()
  {

    const eventList = this.state.events.map(
      event =>
      {
        return (<li key={event._id} className='events__list-item'>{event.title}</li>)
      }
    )
    

    return (
      <div>
        {
          this.state.creating && <>
            <BackDrop/>
            <Modal title="Add Events" canCancel canConfirm onCancel={this.modalCancelHandler } onConfirm={this.modalConfirmHandler}
            >
              <form>
                <div className='form-control'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type="text"
                    id='title'
                    ref={this.titleEl}
                  />

                </div>
                <div className='form-control'>
                  <label htmlFor='price'>Price</label>
                  <input
                    type="number"
                    id='price'
                    ref={this.priceEl}
                  />

                </div>
                <div className='form-control'>
                  <label htmlFor='date'>Date</label>
                  <input
                    type="date"
                    id='date'
                    ref={this.dateEl}
                  />

                </div>
                <div className='form-control'>
                  <label htmlFor='desc'>Description</label>
                  <textarea
                    type="text"
                    id='desc'
                    rows={4}
                    cols={40}
                    ref={this.descEl}
                  />

                </div>
          </form>
        </Modal>
          </>
        }
        
       <div className='events-control'>
       
            <button onClick={this.startCreateEventHandler}>
              Create Event
            </button>
            <p>
              Share your events with others
            </p>
          </div>
        <ul className='events__list'>
         {eventList}
       </ul>
        

        <style jsx="true">
          {`

          .events__list{
            margin: 2rem auto;
            width:40rem;
            max-width: 90%;
            list-style: none;
          }

          .events__list-item{
            margin: 1rem 0;
            padding: 1rem;
            border: 1px solid blue;
          }
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
