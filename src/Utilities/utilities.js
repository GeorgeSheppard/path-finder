import { notification } from "antd";

export function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export function twoDToOneDCoord(coord, sizeY) {
  return coord[0] * sizeY + coord[1];
}

export const openNotification = (title, message, duration = 4.5) => {
  notification.open({
    message: title,
    description: message,
    duration,
  });
};
