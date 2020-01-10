import React, { Component } from 'react'
import "./styles.css"


import Cell from "../../components/cell"


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      code: "",
      delay: 50,
      memory: [0, 0, 0, 0, 0],
      pointer: 0,
      stepPointer: 0,
      output: "",
      inputNeeded: false,
      inputVal: "",
    }
  }

  reset() {
    this.setState({
      memory: [0, 0, 0, 0, 0],
      pointer: 0,
      stepPointer: 0,
      output: "",
    })
  }

  output(val) {
    let { output } = this.state
    output += val
    this.setState({ output })
  }

  run() {
    const { stepPointer, code, delay, inputNeeded } = this.state
    if (!inputNeeded) {
      this.step()
    }
    if (stepPointer !== code.length - 1 && !inputNeeded) {
      setTimeout(this.run.bind(this), delay)
    }
  }

  setInput(e) {
    e.preventDefault()
    let { memory } = this.state
    const { pointer, inputVal } = this.state
    memory[pointer] = inputVal.charCodeAt(0)
    this.setState({ inputNeeded: false, memory, inputVal: "" })
    this.run()
  }


  bumpLeft() {
    let { pointer, stepPointer } = this.state
    const { code, memory } = this.state
    if (memory[pointer] === 0) {
      stepPointer = code.slice(stepPointer).indexOf("]") + stepPointer
    }

    return stepPointer

  }

  bumpRight() {
    let { pointer, stepPointer } = this.state
    const { code, memory } = this.state
    if (memory[pointer] !== 0) {
      stepPointer = code.slice(0, stepPointer).length - code.slice(0, stepPointer).split("").reverse().indexOf("[") - 1
    }
    return stepPointer

  }
  step() {
    const { code } = this.state
    let { memory, pointer, stepPointer, inputNeeded } = this.state
    if (stepPointer === code.length) {
      this.reset()
      return
    }
    if (pointer >= memory.length) {
      memory.push(0)
    }
    if (pointer < 0) {
      memory.unshift(0)
      pointer += 1
    }
    const actions = {
      "+": () => memory[pointer] += 1,
      "-": () => memory[pointer] -= 1,
      ">": () => pointer += 1,
      "<": () => pointer -= 1,
      ".": () => this.output(String.fromCharCode(memory[pointer])),
      ",": () => inputNeeded = true,
      "[": () => stepPointer = this.bumpLeft(),
      "]": () => stepPointer = this.bumpRight(),
    }
    if (code[stepPointer] in actions) {
      actions[code[stepPointer]]()
    }
    console.log(stepPointer)

    this.setState({ memory, pointer, stepPointer: stepPointer + 1, inputNeeded })
  }

  render() {
    const { memory, code, pointer, output, inputNeeded, inputVal } = this.state
    return (
      <>
        <h1>BF Master</h1>
        <div className="home">
          <div className="code">
            <h3>Code</h3>

            <textarea placeholder="bf code" value={code} onChange={(e) => this.setState({ code: e.target.value })} />
          </div>

          <div className="output">
            <h3>Output</h3>
            <p>{output}</p>
          </div>
          <div className="memory">
            <div className="control">
              <h1>Control Panel</h1>
              <button onClick={() => this.run()}>Run</button>
              <button onClick={() => this.step()}>Step</button>
              <button>Step Back</button>
            </div>
            <h3>Memory</h3>
            <div className="cells">
              {memory.map((value, i) => <Cell pointer={pointer == i} key={`${i}-${value}`} value={value} />)}
            </div>
          </div>
          {inputNeeded &&
            <div className="input-box">
              <h3>Input Needed!</h3>
              <form onSubmit={(e) => this.setInput(e)}>
                <input type="text" value={inputVal} onChange={(e) => this.setState({ inputVal: e.target.value.split("")[e.target.value.length - 1] })} />
                <button type="submit" >Do stuff</button>
              </form>
            </div>
          }
        </div>

      </>
    )
  }
}