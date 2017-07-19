import React, { Component } from 'react'
import Gap from "../../Gap"
import BabyBox from "./BabyBox"

export default class BabyList extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
    this.state = {
      babies: this.props.babies,
    }
  }

  render() {
    const babies = this.state.babies

    return (
      <div className="baby-list">
        <Gap></Gap>
        {
          babies.map((baby, index) => {
            return (
              <BabyBox baby={baby} key={index }></BabyBox>
            )
          })
        }

      </div>
    )
  }
}
