import React from "react";
import axios from "axios";
import { Divider, Card, Typography, Row, Col, Result, Spin } from "antd";

export default class WeatherDayList extends React.Component {
  state = {
    data: null,
    error: null,
    isLoading: true,
  };

  componentDidMount() {
    const { positionLatitude, positionLongitude, apiKey } = this.props;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${positionLatitude}&lon=${positionLongitude}&appid=${apiKey}&lang=ru&units=metric`;
    axios
      .get(url)
      .then((response) => this.setState({ data: response.data.daily, isLoading: false }))
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, data, error } = this.state;

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

    return (
      <Card title="Прогноз на 7 дней" bordered={false}>
        {data.map((day) => {
          const sunrise = new Date(day.sunrise * 1000).toLocaleString("ru", {
            hour: "numeric",
            minute: "numeric",
          });

          const sunset = new Date(day.sunset * 1000).toLocaleString("ru", {
            hour: "numeric",
            minute: "numeric",
          });

          const date = new Date(day.dt * 1000).toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          });

          const pressure = Math.round(day.pressure / 1.33);

          return (
            <div key={day.dt}>
              <Typography.Title level={4}>{date}</Typography.Title>

              <Typography.Paragraph>
                <Typography.Text strong>{day.weather[0].description}</Typography.Text>
              </Typography.Paragraph>

              <Row gutter={16}>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>Утро:</Typography.Text>&nbsp;
                    <Typography.Text strong>{Math.round(day.temp.morn)}°</Typography.Text>
                  </Typography.Paragraph>
                </Col>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>День:</Typography.Text>&nbsp;
                    <Typography.Text strong>{Math.round(day.temp.day)}°</Typography.Text>
                  </Typography.Paragraph>
                </Col>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>Вечер:</Typography.Text>&nbsp;
                    <Typography.Text strong>{Math.round(day.temp.eve)}°</Typography.Text>
                  </Typography.Paragraph>
                </Col>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>Ночь:</Typography.Text>&nbsp;
                    <Typography.Text strong>{Math.round(day.temp.night)}°</Typography.Text>
                  </Typography.Paragraph>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>Восход:</Typography.Text>&nbsp;
                    <Typography.Text strong>{sunrise}</Typography.Text>
                  </Typography.Paragraph>
                </Col>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>Закат:</Typography.Text>&nbsp;
                    <Typography.Text strong>{sunset}</Typography.Text>
                  </Typography.Paragraph>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>Давление:</Typography.Text>&nbsp;
                    <Typography.Text strong>{pressure} мм рт. ст.</Typography.Text>
                  </Typography.Paragraph>
                </Col>
                <Col span={24} xl={6}>
                  <Typography.Paragraph>
                    <Typography.Text>Влажность:</Typography.Text>&nbsp;
                    <Typography.Text strong>{day.humidity}%</Typography.Text>
                  </Typography.Paragraph>
                </Col>
              </Row>

              <Divider></Divider>
            </div>
          );
        })}
      </Card>
    );
  }
}
