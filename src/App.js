import React from "react";
import { Layout, Spin, Result, Col, Row } from "antd";

import WeatherDayList from "./WeatherDayList";
import WeatherToday from "./WeatherToday";

const { Content } = Layout;

export default class App extends React.Component {
  state = {
    positionLatitude: null,
    positionLongitude: null,
    positionError: null,
    isLoading: true,
  };

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    const geo = navigator.geolocation;
    if (!geo) {
      this.state({
        positionError: "Геолокация не поддреживается браузером",
        isLoading: false,
      });
      return;
    }
    geo.getCurrentPosition(
      (position) => {
        this.setState({
          positionLatitude: position.coords.latitude,
          positionLongitude: position.coords.longitude,
          isLoading: false,
        });
      },
      (error) => {
        this.setState({ positionError: error, isLoading: false });
      }
    );
  }

  render() {
    const { positionLatitude, positionLongitude, isLoading, positionError } = this.state;
    const apiKey = "0b7245384d6c369243e321ae9b3651e4";

    return (
      <Layout className="app">
        <Content className="app__content">
          {isLoading && !positionError && (
            <div className="app__loader">
              <Spin size="large" delay={500} />
            </div>
          )}

          {!isLoading && positionError && <Result status="error" title={positionError.message} />}

          {!isLoading && !positionError && (
            <Row gutter={16}>
              <Col span={24} xl={7} className="app__col">
                <WeatherToday
                  positionLatitude={positionLatitude}
                  positionLongitude={positionLongitude}
                  apiKey={apiKey}
                />
              </Col>
              <Col span={24} xl={17} className="app__col">
                <WeatherDayList
                  positionLatitude={positionLatitude}
                  positionLongitude={positionLongitude}
                  apiKey={apiKey}
                />
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    );
  }
}
