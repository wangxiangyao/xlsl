import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import BabyList from "./BabyList";
import Baby from "./Baby"
// import fetchFromServer from "../../HighComponent/fetchFromServer"

/*
本组件，是一个Dump组件，用来获取数据、处理数据用
再一开始，从api取到当前用户的所有宝宝
根据路由，跳转到宝宝列表，或是某个宝宝的详情
TODO: 将请求所有宝宝的数据，用redux管理起来
当前，在state中维护了，所有宝宝babies、用户id-memberId、是否正在请求isFetch、所有需要填写的数据个数itemNum
所含功能：
  1.改变对应宝宝数据
  2.重新计算完成率

暂时：：因为所有宝宝数据是在这里维护的，所以，改变宝宝数据，要在这里改变
index: 表示是哪个宝宝
item = {
  propName: value
}

对于宝宝数据的说明：
    由于后台无法简单存储对象类型的数据，所以，如果宝宝某属性是Object类型，则以字符串形式在前后传递。
    对于各个数据的空白值：由于种种原因（1.一些数据未考虑空白值。2.后端无法存储空数组[]，空对象{}等空白值），
      input输入的，空白值为空字符串"",
      select单选器，空白值为数字 -1，
      其余空白值均为"",（skin_color空白值为null/空字符串""）
*/

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
          "completion_rate": 100,
          "birthday": "1500358674392",
          "top_size": 100,
          "bottom_size": 80,
          "hobbies": {
            "0": 2,
            "1": 2,
            "2": 2,
            "3": 0,
          },
          "skin_color": 2,
          "baby_body": [1, 2, 3],
          "style": {
            "0": 1,
            "2": 0,
          },
          "atom": [15, 20],
          "color": {
            "3": 1,
            "11": 0,
          },
          "expect": 3,
          "suit": 1,
          "attention": [0, 1],
				  "sundry": [2, 3],
          "brand": [0, 5, 11],
          "top_price": [100, 800],
          "bottom_price": [100, 900],
          "suit_price": [700, 900],
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

          "skin_color": 3,
          "baby_body": [0, 1, 4],


          "style": {
            "0": 1,
            "1": 0,
            "2": 3,
            "3": 2,
          },
          "atom": [1, 16],
          "color": {
            "5": 1,
            "6": 0,
          },
          "expect": 1,
          "suit": 2,
          "attention": [2, 4],
				  "sundry": [0, 1, 3],
          "brand": [10, 16, 19],
          "top_price": [100, 800],
          "bottom_price": [100, 900],
          "suit_price": [700, 900],
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

          "skin_color": 1,
          "baby_body": [4, 7],


          "style": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
          },
          "atom": [1, 6, 14, 22],
          "color": {
            "10": 1,
            "16": 0,
          },
          "expect": 0,
          "suit": 1,
          "attention": [0, 1],
				  "sundry": [2, 3],
          "brand": [2, 7, 18],
          "top_price": [100, 800],
          "bottom_price": [100, 900],
          "suit_price": [700, 900],
          "photo": "",
          "own_cloth": [],
        }
      ],
      memberId: 0,
      isFetch: true,
      itemNum: 22, // 一共需要填写22项
    }
  }


  componentDidMount() {
    const {memberId} = this.state;
    let url = `http://localhost:9090/baby/${memberId}/`
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
    })
    .then((res) => {
      return res.json();
    }, error => console.log("请求发生错误", error))
    .then(
      (json) => {
        let data = json.data;
        /*
        对数据遍历，因为对象属性，都是字符串，所以要找出他们，并解析为对象。
        因为数组在传递的时候，其值变为了字符串，所以，对于数组也要对其所有值转换为数字
        */
        data.map((baby) => {
          for(let [key, val] of Object.entries(baby)) {
            if ( typeof val === "string" && val[0] === "{" ) {
                baby[key] = JSON.parse(val);
            } else if (Array.isArray(val)){
              // 如果是数组，每一项转换成数字
              for (let i = 0, len = val.length; i < len; i++) {
                baby[key][i] = Number(val[i]);
              }
            }
          }
          return true
        })
        this.setState({
          babies: data,
          isFetch: false,
        })
      }
    )
  }


  /*
  用来处理下层组件传递的可能发生改变的宝宝值
  每个改变，都会传递，改变项item、改变的宝宝在babies中的位置index，两个参数。
  要做的处理有，如果需要，更新改变率，更新对应宝宝
  */
  handleChangeBabyItem = (item, index) => {
    const { babies } = this.state;

    // 为了覆盖，深拷贝一下babies数组
    let source = JSON.parse(JSON.stringify(babies));

    let baby = source[index]
    baby.completion_rate = this.calcCompletionRate(item, baby)
    this.updataObject(baby, item);
    this.setState({
      babies: source,
    });
  }

  /*
  以下是工具函数
  */

  /*
  重新结算完成率：
  判断是否改变，如果需要改变，就增或减一份。
  判断规则：
  遍历item，取到属性key，和其val
      1.若前后值全等，不做处理
      2.若val为Object
          if 若val为空数组"[]"或空对象"{}"，减一份 原因：说明字段没填写，所以减一份
          else 若baby[key]值为空对象"{}"，空数组"[]"，空字符串""，加一份  原因：val有效，若源属性是无效，说明是新添加的，所以加一份
          若baby[key]，val均不为以上属性，则遍历val，删除所有的null属性，之后判断val是否为空对象"{}"，如果是，减一份  原因：如果val，源属性均不为空，则说明此属性已经添加过，由于下层组件，传递对象值时候，无效值会传递null，所以，在这里要删除掉val中为null的值，然后判断其是否为空
      3.若val为其他值
          若val为""/-1/null 减一份  原因：无效值
          else 若baby[key]为""/-1/null 加一份   原因：源属性若无效，加一份
  */
  calcCompletionRate = (item, baby) => {
    const { itemNum } = this.state
    let rateStep = Math.ceil(1 / itemNum * 100)
    let completionRate = baby.completion_rate ? baby.completion_rate : 0;

    console.log(item)

    for (let [key, val] of Object.entries(item)) {
      // 如果前后值没变，就继续下一个循环
      if( JSON.stringify(baby[key]) === JSON.stringify(val) ) {
        continue;
      }

      // 如果拿到一个对象类型（数组也是对象）
      if (typeof val === "object") {
        if (JSON.stringify(val) === "{}" || JSON.stringify(val) === "[]") {
          // 如果为空
          completionRate -= rateStep
        } else {
          // 不为空，则判断原值是否为无效值，若为无效值，则增加
          console.log("我进入到这里了，要判断是否为空数组")
          if (JSON.stringify(baby[key]) === "{}" || JSON.stringify(baby[key]) === "[]" || baby[key] === "") {
            completionRate += rateStep
            continue;
          }
          // 如果，源属性不为空，data属性也不为空，则对data，删除所有值为null的属性，之后判断其是否为空对象，如果为空，则完成率下降
          let a = JSON.parse(JSON.stringify(val));
          for(let [key, val] of Object.entries(a)) {
            if (val === null) {
              delete a[key]
            }
          }
          if (JSON.stringify(a) === "{}") {
            completionRate -= rateStep
          }
        }
      } else {
        // 如果是普通类型的值
        console.log(val, baby[key])
        if (val === "" || val === -1 || val === null) {
          completionRate -= rateStep
        } else {
          if (baby[key] === "" || baby[key] === -1 || baby[key] === null) {
            // 不为空，则判断原值是否为无效值，若为无效值，则增加
            completionRate += rateStep
          }
        }
      }
    }
    if (completionRate > 100) {
      // 如果超过了100,就变成100，因为一份的值，是向上取整的，所以，所有加起来可能超过一百，下边同理
      completionRate = 100
    }
    if (completionRate < 0 ) {
      completionRate = 0
    }
    return completionRate
  }

  /*
  如果value为null，则删除此属性
  可能接受到的item：
    简单值：直接覆盖
    数组：直接覆盖
    对象：遍历键，如果源对象键不存在：如果值为null，不操作；如果数组、简单值，直接覆盖
                如果源对象键存在：如果值为null，删除此属性，如果数组、简单值，直接覆盖
    均对简单值合并，如果遇到对象，递归调用自身
  */
  updataObject(source, data) {
    for(let key of Object.keys(data)) {
      if (data[key] === null) {
        // 如果data[key]为null，则在source中删除此属性
        delete source[key];
        continue;
      }
      if (source.hasOwnProperty(key)) {
        // 如果source有此属性，
        if ( typeof data[key] === "object" ){
          // 如果值为对象类型，递归调用自身
          if ( Array.isArray(data[key]) || source[key] === "" ) {
            // 数组就简单覆盖
            source[key] = data[key]
            continue;
          }
          this.updataObject(source[key], data[key]);
          continue;
        }
        // 其他简单值,直接覆盖
        source[key] = data[key];
      } else {
        // 如果source中没有此属性
        if ( typeof data[key] === "object" ){
          // 如果值为对象类型，创建属性，并递归调用自身
          if ( Array.isArray(data[key])) {
            // 数组就简单覆盖
            source[key] = data[key]
            continue;
          }
          source[key] = {};
          this.updataObject(source[key], data[key]);
          continue;
        }
        // 其他,简单值,直接覆盖
        source[key] = data[key];
      }
    }
    return source;
  }

  fetchBabyIfNeed() {

  }

  render() {
    const { babies, isFetch } = this.state;

    if (isFetch) {
      return (
        <div>正在加载</div>
      )
    }

    return (
        <div>
          <Route exact strict path="/baby" render={() => {
            console.log(babies)
            return (<BabyList babies={babies}></BabyList>)
          }}>
          </Route>
          <Route path="/baby/:id" render={(props) => {
            let id = props.match.params.id,
                baby,
                index; // 记录此宝宝，在babies数组中的位置
            if (id === 'new') {
              return (
                <Baby index="new" {...props} itemNum={this.state.itemNum} memberId={this.state.memberId}/>
              )
            }
            for (let [key, value] of babies.entries()) {
              if (Number(value.id) === Number(id)) {
                baby = value;
                index = key;
              }
            }
            return (
              <Baby {...props} baby={baby} index={index}  handleChangeBabyItem={this.handleChangeBabyItem.bind(this)}></Baby>
            )
          }} />
        </div>
    )
  }
}
//
// BabyDump = fetchFromServer(BabyDump, "http://localhost:9090")
// export default BabyDump
