import React, { Component } from 'react'
import * as d3 from 'd3'
import './App.css'

const expenses = [
  {
    name: 'Coffee',
    amount: 3,
    date: new Date(),
  },
  {
    name: 'Costco',
    amount: 80,
    date: new Date(),
  },
  {
    name: 'Gas',
    amount: 50,
    date: new Date(),
  },
]

const width = 900
const height = 900
const radius = 20
const simulation = d3
  .forceSimulation()
  .force('center', d3.forceCenter(width / 2, height / 2))
  // .force('charge', d3.forceManyBody())
  .force('collide', d3.forceCollide(radius))
  .stop()

class App extends Component {
  constructor(props) {
    super(props)

    this.forceTick = this.forceTick.bind(this)
  }

  componentWillMount() {
    simulation.on('tick', this.forceTick)
  }

  componentDidMount() {
    this.container = d3.select(this.svg)
    this.renderCircles()

    simulation
      .nodes(expenses)
      .alpha(0.9)
      .restart()
  }

  componentDidUpdate() {
    this.renderCircles()
  }

  forceTick() {
    console.log(this.circles.datum().x, this.circles.datum().y)
    this.circles.attr('cx', d => d.x).attr('cy', d => d.y)
  }

  renderCircles() {
    this.circles = this.container.selectAll('circle').data(expenses, d => d.name)

    this.circles.exit().remove()

    this.circles = this.circles
      .enter()
      .append('circle')
      .merge(this.circles)
      .attr('r', radius)
      .attr('opacity', 0.5)
  }

  render() {
    return (
      <svg
        ref={svg => {
          this.svg = svg
        }}
        width={width}
        height={height}
      />
    )
  }
}

export default App
