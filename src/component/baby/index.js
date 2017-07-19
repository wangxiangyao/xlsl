import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import BabyList from "./BabyList";
import Baby from "./Baby"

// 请求baby字段； 路由 等功能

export default class BabyDump extends Component {
  // TODO: 从远程请求到此用户的所有宝宝
  constructor(props) {
    super(props)
    this.state = {
      babies: [
        {
          "id": 0,
          "name": "王宝宝1",
          "sex": 1,
          "height": 130,
          "weight": 40,
          "completion_rate": 90,
          "birthday": "1500358674392",
          "top_size": 100,
          "bottom_size": 80,
          "hobbies": {
            "0": 2,
            "1": 2,
            "2": 2,
            "3": 0,
          },
          "physical_char": {
            "skin_color": 2,
            "char": [1, 2, 3],
          },
          "cloth_style": {
            "style": {
              "0": 1,
              "2": 0,
            },
            "atom": {
              "0": 1,
              "1": 0,
            },
            "color": {
              "1": 1,
              "13": 0,
            },
            "expect": 3,
            "suit": 1,
          },
          "photo": "",
          "own_cloth": [],
        },
        {
          "id": 1,
          "name": "王宝宝2",
          "sex": 0,
          "height": 70,
          "weight": 15,
          "completion_rate": 95,
          "birthday": "1500358674392",
          "top_size": 40,
          "bottom_size": 20,
          "hobbies": {
            "0": 1,
            "1": 3,
            "2": 3,
            "3": 1,
          },
          "physical_char": {
            "skin_color": 3,
            "char": [0, 1, 4],
          },
          "cloth_style": {
            "style": {
              "5": 1,
              "9": 0,
            },
            "atom": {
              "16": 1,
              "14": 0,
            },
            "color": {
              "22": 1,
              "34": 0,
            },
            "expect": 1,
            "suit": 2,
          },
          "photo": "",
          "own_cloth": [],
        },
        {
          "id": 2,
          "name": "王宝宝3",
          "sex": 0,
          "height": 88,
          "weight": 15,
          "completion_rate": 88,
          "birthday": "1500358674392",
          "top_size": 66,
          "bottom_size": 33,
          "hobbies": {
            "0": 1,
            "1": 1,
            "2": 1,
            "3": 1,
          },
          "physical_char": {
            "skin_color": 1,
            "char": [4, 7],
          },
          "cloth_style": {
            "style": {
              "3": 1,
              "4": 0,
            },
            "atom": {
              "9": 1,
              "19": 0,
            },
            "color": {
              "4": 1,
              "55": 0,
            },
            "expect": 0,
            "suit": 1,
          },
          "photo": "",
          "own_cloth": [],
        }
      ]
    }
  }
  render() {
    return (
        <div>
          <Route exact strict path="/baby" render={() => {
            return (<BabyList babies={this.state.babies}></BabyList>)
          }}>
          </Route>
          <Route path="/baby/:id" render={(props) => {
            console.log(props);
            let id = props.match.params.id;
            if (id === 'new') {
              return (
                <Baby baby="new" />
              )
            }
            return (
              <Baby baby={this.state.babies[id]}></Baby>
            )
          }} />
        </div>
    )
  }
}
