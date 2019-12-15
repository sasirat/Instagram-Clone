import React ,{ Component } from 'react';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Pusher from 'pusher-js'

const client = new ApolloClient({
  uri : "http://localhost:4000/graphql"
});

class App extends Component{

  componentDidMount(){
    if('action' in Notification.prototype){
      alert('You can enjoy the notification feature');
    } else {
      alert('Sorry notifications are Not supported on your brower')
    }
  }
  constructor(){
    super();
    this.pusher = new Pusher("PUSHER_APP_KEY", {
     cluster: 'eu',
     encrypted: true
    });
  }
  render(){
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <section className="App-main">
            <Posts pusher={this.pusher} apollo_client={client}/>  
          </section>
        </div>
      </ApolloProvider>
    )
  }
}

// const App = () => {
//   return (
//     <ApolloProvider client={client}>
//       <div className="App">
//         <Header />
//         <section className="App-main">
//           <Posts />
//         </section>
//       </div>
//     </ApolloProvider>
//   )  
// }

export default App
