import './App.css'
import { useState } from 'react'
import Input from './components/Input.tsx'

function App() {
  const [file, setFile] = useState(null)

  return (
    <Input
      value={file}
      onChange={setFile}
      placeholder="Drag your file here"
      deleteButton={{
        children: 'Delete',
      }}
      className="input"
      maxLength={20}
      required
    />
  )
}

export default App
