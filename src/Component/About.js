import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext'

export default function About() {
  const data = useContext(noteContext);
  useEffect(() => {
    data.update();
    // eslint-disable-next-line 
  }, [])
  return (
    <div>
      My name is {data.state.name} is learning in class {data.state.class}
    </div>
  )
}