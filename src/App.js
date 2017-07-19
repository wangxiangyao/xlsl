import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import Navigation from './component/Nav';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';


// 引入redux-store
import configureStore from "./stores"

// 引入组件
import Home from './component/Home';
import About from './component/About';
import Member from './component/Member';
import OrderList from './component/order/OrderList';
import NewOrder from './component/order/NewOrder';
import Baby from "./component/baby";

const store = configureStore()
const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/">
          <Layout className="layout">
            <Content className="stage">
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About}/>
              <Route path="/member" component={Member}/>
              <Route path="/order" component={OrderList}/>
              <Route path="/baby" component={Baby} >
              </Route>
            </Content>
            <Footer className="footer">
              <Navigation/>
            </Footer>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
