import React from 'react'
import Weather from './Weather'

class App extends React.Component {
   state = {
      data: null
   }

   render(){
      return (
         <div>
            <Weather />
         </div>
      )
   }
}

export default App
