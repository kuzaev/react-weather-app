import React from "react";
import { Divider, Card, Typography, Row, Col } from "antd";

export default ({ daily }) => {
  console.log(daily);
  return (
    <Card title="Прогноз на 7 дней" bordered={false}>
      {daily.map((day, index) => {
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
          <div>
            <Typography.Title level={4}>{date}</Typography.Title>

            <Typography.Paragraph>
              <Typography.Text strong>{day.weather[0].description}</Typography.Text>
            </Typography.Paragraph>

            <Row gutter={16}>
              <Col span="6">
                <Typography.Paragraph>
                  <Typography.Text>Утро:</Typography.Text>&nbsp;
                  <Typography.Text strong>{Math.round(day.temp.morn)}°</Typography.Text>
                </Typography.Paragraph>
              </Col>
              <Col span="6">
                <Typography.Paragraph>
                  <Typography.Text>День:</Typography.Text>&nbsp;
                  <Typography.Text strong>{Math.round(day.temp.day)}°</Typography.Text>
                </Typography.Paragraph>
              </Col>
              <Col span="6">
                <Typography.Paragraph>
                  <Typography.Text>Вечер:</Typography.Text>&nbsp;
                  <Typography.Text strong>{Math.round(day.temp.eve)}°</Typography.Text>
                </Typography.Paragraph>
              </Col>
              <Col span="6">
                <Typography.Paragraph>
                  <Typography.Text>Ночь:</Typography.Text>&nbsp;
                  <Typography.Text strong>{Math.round(day.temp.night)}°</Typography.Text>
                </Typography.Paragraph>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Typography.Paragraph>
                  <Typography.Text>Восход:</Typography.Text>&nbsp;
                  <Typography.Text strong>{sunrise}</Typography.Text>
                </Typography.Paragraph>
              </Col>
              <Col span={6}>
                <Typography.Paragraph>
                  <Typography.Text>Закат:</Typography.Text>&nbsp;
                  <Typography.Text strong>{sunset}</Typography.Text>
                </Typography.Paragraph>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Typography.Paragraph>
                  <Typography.Text>Давление:</Typography.Text>&nbsp;
                  <Typography.Text strong>{pressure} мм рт. ст.</Typography.Text>
                </Typography.Paragraph>
              </Col>
              <Col span={6}>
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
};
