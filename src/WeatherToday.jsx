import React from "react";
import { Card, Typography} from "antd";

export default ({ current }) => {
  const currentDate = new Date(current.dt * 1000).toLocaleString("ru", {
    month: "long",
    day: "numeric",
    weekday: "long"
  });

  const currentTime = new Date(current.dt * 1000).toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  const currentPressure = Math.round(current.main.pressure / 1.33);

  const currentSunrise = new Date(current.sys.sunrise * 1000).toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  const currentSunset = new Date(current.sys.sunset * 1000).toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Card title={`${current.name} | ${currentDate}`} bordered={false}>
      <Typography.Title>{current.main.temp}°</Typography.Title>

      <Typography.Paragraph>
        <Typography.Text>Последнее обновление:</Typography.Text>&nbsp;
        <Typography.Text strong>{currentTime}</Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text>Ощущается как</Typography.Text>&nbsp;
        <Typography.Text strong>{Math.round(current.main.feels_like)}°</Typography.Text>
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
        <Typography.Text strong>{current.main.humidity}%</Typography.Text>
      </Typography.Paragraph>

    </Card>
  );
};
