import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
// import './App.css'


const Card = (props) => {
  const [hasLiked, setHasLiked] = useState(false)
  const [countLikes, setCountLikes] = useState(0)

  useEffect(() => {
    console.log(`level 1`)
  }, [hasLiked])

  useEffect(() => {
    console.log(`level 2`)
  }, [countLikes])

  return (
    <div className='card' onClick={() => { setCountLikes(countLikes + 1) }}>
      <h1>movie name</h1>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <h3>likes count {countLikes}</h3>
      <button onClick={() => {
        setHasLiked(!hasLiked)
      }}>{hasLiked ? 'unlike' : 'like'}</button>
    </div>
  )
}


const App = () => {



  return (
    <div>
      <h1>this is the entry point</h1>
      <Card title="star Wars" description="this is a description" />
      <Card title="Taare Zameen Par" />
      <Card description="this is a description part 2" />
    </div>

  )
}

export default App
