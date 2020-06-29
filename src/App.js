import React from "react";
import {Layout} from "antd";

import Weather from "./Weather";

const { Content } = Layout;

const App = () => {
  return (
    <Layout className="app">
      <Content className="app__content">
        <Weather />
      </Content>
    </Layout>
  );
}

export default App;
