import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Spin, Result, Typography, Row } from "antd";
import WeatherDayList from "./WeatherDayList";
import WeatherToday from "./WeatherToday";

const { Paragraph, Text } = Typography;
export default class Weather extends React.Component {
  state = {
    currentData: null,
    currentIsLoading: false,
    data: null,
    isLoading: false,
    error: null,
    positionLatitude: null,
    positionLongitude: null,
    positionError: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true, currentIsLoading: true }, () => {
      this.getLocation();
    });
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
        this.setState(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          () => {
            this.getWeather();
            console.log(position);
          }
        );
      },
      (error) => {
        this.setState(this.setState({ error }));
      }
    );
  }

  getWeather() {
    const apiKey = "0b7245384d6c369243e321ae9b3651e4";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${apiKey}&lang=ru&units=metric`;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${apiKey}&lang=ru&units=metric`
      )
      .then((response) =>
        this.setState({ currentData: response.data, currentIsLoading: false }, () => {
          console.log(this.state.currentData);
        })
      );
    axios
      .get(url)
      .then((response) =>
        this.setState({ data: response.data, isLoading: false }, () => {
          console.log(this.state.data);
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    if (this.state.error) {
      return (
        <Col span={24} xl={{offset: 6, span: 12}}>
          <Card>
            <Result status="error" title={this.state.error.message} />
          </Card>
        </Col>
      );
    }

    return (
      <Row gutter={16}>
        <Col span={24} xl={7} className="app__col">
          {this.state.currentIsLoading ? (
            <Card bordered={false}>
              <Spin />
            </Card>
          ) : (
            this.state.currentData && <WeatherToday current={this.state.currentData} />
          )}
        </Col>
        <Col span={24} xl={17} className="app__col">
          {this.state.isLoading ? (
            <Card bordered={false}>
              <Spin />
            </Card>
          ) : (
            this.state.data && <WeatherDayList daily={this.state.data.daily} />
          )}
        </Col>
      </Row>
    );
  }
}
