import React from 'react'
import "./styles.css"

export default function Cell({value, pointer}) {
  return (
    <div className={`cell ${pointer? "pointer" : ""}`}>
      <p>{value}</p>
    </div>
  )
}