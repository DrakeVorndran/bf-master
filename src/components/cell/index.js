import React from 'react'
import "./styles.css"

export default function Cell({value}) {
  return (
    <div className="cell">
      <p>{value}</p>
    </div>
  )
}