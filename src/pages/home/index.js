import React, { useState } from 'react'
import "./styles.css"

import { HotKeys } from 'react-hotkeys'

import Cell from "../../components/cell"

const keyMap = {
  SAVE: ["command+s", "Control+s"]
}

const handlers = {
  SAVE: (e) => {
    e.preventDefault()
    console.log("saved")
  }
}

export default function Home() {
  const [code, setCode] = useState("")
  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <h1>BF Master</h1>
      <div className="home">
        <div className="code">
          <textarea placeholder="bf code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>

        <div className="output">
          <p>{code}</p>
        </div>

        <div className="memory">
          <div className="control">
            <button>Run</button>
            <button>Step</button>
            <button>Step Back</button>
          </div>
          <br/>
         {code.split("").map((value, i) => <Cell key={`${i}-${value}`} value={value}/>)}
        </div>

      </div>
    </HotKeys>
  )
}