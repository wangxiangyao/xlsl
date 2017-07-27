import React, { Component } from 'react'
import PropTypes from "prop-types"

// 包裹baby组件，判断是否为新宝宝，如果是新宝宝，就自己构建一个宝宝，并且下层组件对宝宝的修改，均使用此组件的函数，修改此组件定义的新宝宝。

export default (WrappedComponent) => {
  class NewComponent extends Component {
    constructor(props) {
      super(props)
      const { baby, index } = this.props;
      if (index === "new" ||　!baby) {
        this.state = {
          baby: {
            "name": "",
            "sex": -1,
            "height": "",
            "weight": "",
            "completion_rate": 0,
            "birthday": "",
            "top_size": "",
            "bottom_size": "",
            "hobbies": "",
            "skin_color": null,
            "baby_body": [],
            "style": "",
            "atom": [],
            "color": "",
            "expect": -1,
            "suit": -1,
            "attention": [],
            "sundry": [],
            "brand": [],
            "top_price": [100, 800],
            "bottom_price": [100, 800],
            "suit_price": [100, 800],
            "photo": "",
          },
        }
        return
      } else {
        this.state = {
          baby: {...baby},
        }
      }
    }

    // 重新计算完成率
    calcCompletionRate = (item) => {
      const { baby } = this.state
      const { itemNum } = this.props
      let rateStep = Math.ceil(1 / itemNum * 100)
      let completionRate = baby.completion_rate

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
        // 如果超过了100,就变成100
        completionRate = 100
      }
      if (completionRate < 0 ) {
        completionRate = 0
      }
      return completionRate
    }


    // 处理新宝宝的改变
    handleChangeBabyItem(item, index) {
      const { baby } = this.state;
      let source = JSON.parse(JSON.stringify(baby));
      source.completion_rate = this.calcCompletionRate(item);
      console.log(source.completion_rate)
      this.updataObject(source, item);
      if (index === "new") {
        this.setState({
          baby: source,
        })
      } else {
        this.props.handleChangeBabyItem(index, source);
      }

    }

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
    render() {
      const { index, baby } = this.props

      return (
        <WrappedComponent handleChangeBabyItem={this.handleChangeBabyItem.bind(this)}
            index={index}
            baby={baby ? baby : this.state.baby}
            memberId={this.props.memberId}
            history={this.props.history}
         />
      )
    }
  }

  NewComponent.PropTypes = {
    baby: PropTypes.object,
    index: PropTypes.number,
    handleChangeBabyItem: PropTypes.func,
    itemNum: PropTypes.number,
    memberId: PropTypes.number,
  }

  return NewComponent;
}
