import './App.css';
import React, { useEffect,useState } from 'react'
import BarGraph from './Components/BarGraph/BarGraph';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";


function App() {

  const [data,setData]=useState({})
  const client = new ApolloClient({
    uri: 'https://fakerql.goosfraba.ro/graphql',
    cache: new InMemoryCache()
  });
  

  useEffect(()=>{
    /*fetch data from the API*/
    client.query({
      query:gql`
        query{
          allPosts(count:500){
            createdAt,
            id,
            title,
            published
          }
        }
      `
    }).then(resp=>setData(resp.data.allPosts.reduce((acc,current)=>{
      /* Turned into date object so I can check for the month*/
      const toDate = Number(new Date(current.createdAt-1).toLocaleDateString().slice(0,2).split('').filter(item=>item!=='/').join(''))
      toDate in acc ? acc[toDate]++ : acc[toDate]=1
      return acc
    },{})))
  },[])

  /*Transformed object to array of objects*/
  const newArr = Object.entries(data).map(array=>{
    switch(array[0]){
      case '1': return {'month':"January",value:array[1],color:"red"}
      case '2': return {'month':"February",value:array[1],color:"blue"}
      case '3': return {'month':"March",value:array[1],color:"black"}
      case '4': return {'month':"April",value:array[1],color:"yellow"}
      case '5': return {'month':"May",value:array[1],color:"aquamarine"}
      case '6': return {'month':"June",value:array[1],color:"green"}
      case '7': return {'month':"July",value:array[1],color:"grey"}
      case '8': return {'month':"August",value:array[1],color:"purple"}
      case '9': return {'month':"September",value:array[1],color:"orange"}
      case '10': return {'month':"October",value:array[1],color:"brown"}
      case '11': return {'month':"November",value:array[1],color:"pink"}
      case '12': return {'month':"December",value:array[1],color:"magenta"}
    }
    return array
    })

  return (
    <div className="App">
      <BarGraph data={newArr}/>
    </div>
  );
}

export default App;
