import React, {Component} from "react"

export default (WrappedComponent, url) => {
  class NewComponent extends Component {
    constructor() {
      super()
      this.state = {
        data: null,
        memberId: 0,
        isFetch: true,
      }
    }

    componentWillMount () {
      const {memberId} = this.state;
      console.log(this.props)
      url = `${url}${this.props.url}/${memberId}/`
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
          this.setState({
            data: json.data,
            isFetch: false,
          })
        }
      )
    }

    render () {

      return <WrappedComponent data={this.state.data} isFetch={this.state.isFetch} {...this.props}/>
    }
  }
  return NewComponent
}
