import React from "react";
import axios from "axios";
import { Card, Typography, Spin, Result } from "antd";

export default class WeatherTody extends React.Component {
  state = {
    data: null,
    error: null,
    isLoading: true,
  };

  componentDidMount() {
    const {positionLatitude, positionLongitude, apiKey} = this.props;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${positionLatitude}&lon=${positionLongitude}&appid=${apiKey}&lang=ru&units=metric`;
    axios
      .get(url)
      .then((response) => this.setState({ data: response.data, isLoading: false }))
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const {isLoading, data, error } = this.state;

    if (isLoading) {
      return (
        <Card>
          <Spin />
        </Card>
      );
    }

    if (error) {
      return <Result status="error" title={error.message} />;
    }

    const currentDate = new Date(data.dt * 1000).toLocaleString("ru", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });

    const currentTime = new Date(data.dt * 1000).toLocaleString("ru", {
      hour: "numeric",
      minute: "numeric",
    });

    const currentPressure = Math.round(data.main.pressure / 1.33);

    const currentSunrise = new Date(data.sys.sunrise * 1000).toLocaleString("ru", {
      hour: "numeric",
      minute: "numeric",
    });

    const currentSunset = new Date(data.sys.sunset * 1000).toLocaleString("ru", {
      hour: "numeric",
      minute: "numeric",
    });

    return (
      <Card title={`${data.name} | ${currentDate}`} bordered={false}>
        <Typography.Title>{data.main.temp}°</Typography.Title>

        <Typography.Paragraph>
          <Typography.Text>Последнее обновление:</Typography.Text>&nbsp;
          <Typography.Text strong>{currentTime}</Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>Ощущается как</Typography.Text>&nbsp;
          <Typography.Text strong>{Math.round(data.main.feels_like)}°</Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>Восход:</Typography.Text>&nbsp;
          <Typography.Text strong>{currentSunrise}</Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>Закат:</Typography.Text>&nbsp;
          <Typography.Text strong>{currentSunset}</Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>Давление:</Typography.Text>&nbsp;
          <Typography.Text strong>{currentPressure} мм рт. ст.</Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>Влажность:</Typography.Text>&nbsp;
          <Typography.Text strong>{data.main.humidity}%</Typography.Text>
        </Typography.Paragraph>
      </Card>
    );
  }
}
