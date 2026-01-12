import React from 'react'
import GenerateImage from './components/GenerateImage'

export default function App(){
  return (
    <div style={{padding: 24}}>
      <h1>AutomationProjectShell - Web (Starter)</h1>
      <p>Welcome — try generating a funny drawing using OpenAI.</p>
      <GenerateImage />
    </div>
  )
}
