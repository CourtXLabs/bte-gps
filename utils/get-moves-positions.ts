import { Coordinates } from "@/types"

interface Rectangle {
  topLeft: Coordinates
  bottomRight: Coordinates
}

interface Circle {
  center: Coordinates
  radius: number
}

interface Line {
  start: Coordinates
  end: Coordinates
}

interface CircleSegment {
  circle: Circle
  top: Coordinates
  bottom: Coordinates
}

const getIsInRectangle = ({ point, rectangle }: { point: Coordinates; rectangle: Rectangle }): boolean => {
  // Assuming lines are parallel to the axes
  const { topLeft, bottomRight } = rectangle
  return point.x >= topLeft.x && point.x <= bottomRight.x && point.y >= bottomRight.y && point.y <= topLeft.y
}

const getIsInCircle = ({ point, circle }: { point: Coordinates; circle: Circle }): boolean => {
  const { center, radius } = circle
  const dx = point.x - center.x
  const dy = point.y - center.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance <= radius
}

const getIsOnOppositeSideOfLine = ({
  pointA,
  pointB,
  line,
}: {
  pointA: Coordinates
  pointB: Coordinates
  line: Line
}): boolean => {
  const { start, end } = line
  const x1 = start.x
  const y1 = start.y
  const x2 = end.x
  const y2 = end.y

  // Compute expressions for each point relative to the line
  const expressionA = (y1 - y2) * (pointA.x - x1) + (x2 - x1) * (pointA.y - y1)
  const expressionB = (y1 - y2) * (pointB.x - x1) + (x2 - x1) * (pointB.y - y1)

  const isOnOppositeSides = expressionA * expressionB < 0

  return isOnOppositeSides
}

const getIsInCircleSegment = ({
  point,
  circleSegment,
}: {
  point: Coordinates
  circleSegment: CircleSegment
}): boolean => {
  const { circle, top, bottom } = circleSegment
  const isInCircle = getIsInCircle({ point, circle })
  const isOppositeOfSegmentLine = getIsOnOppositeSideOfLine({
    pointA: point,
    pointB: circle.center,
    line: { start: top, end: bottom },
  })
  return isInCircle && isOppositeOfSegmentLine
}

export const getIsInRight3PointArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: 47, y: -22 } // 47, -25 + 3
  const topLeftCorner = { x: 33, y: 22 } // 47 - 14, 25 - 3
  const bottomLeftCorner = { x: 33, y: -22 } // 47 - 14, -25 + 3
  const circleCenter = { x: 41.75, y: 0 } // 47 - 5.25, 0
  const radius = 23.75

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circleSegment: CircleSegment = {
    circle: { center: circleCenter, radius },
    top: topLeftCorner,
    bottom: bottomLeftCorner,
  }

  return getIsInRectangle({ point, rectangle }) || getIsInCircleSegment({ point, circleSegment })
}

export const getIsInLeft3PointArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: -33, y: -22 } // -47 + 14, -25 + 3
  const topLeftCorner = { x: -47, y: 22 } // -47, 25 - 3
  const topRightCorner = { x: -33, y: 22 } // -47 + 14, 25 - 3
  const circleCenter = { x: -41.75, y: 0 } // -47 + 5.25, 0
  const radius = 23.75

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circleSegment: CircleSegment = {
    circle: { center: circleCenter, radius },
    top: topRightCorner,
    bottom: bottomRightCorner,
  }

  return getIsInRectangle({ point, rectangle }) || getIsInCircleSegment({ point, circleSegment })
}

export const getIsRightInShortrangeArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: 47, y: -8 } // 47, -16 / 2
  const topLeftCorner = { x: 28, y: 8 } // 47 - 19, 16 / 2
  const circleCenter = { x: 28, y: 0 } // 47 - 19, 0
  const radius = 6

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circle: Circle = { center: circleCenter, radius }

  return getIsInRectangle({ point, rectangle }) && !getIsInCircle({ point, circle })
}

export const getIsLeftInShortrangeArea = (point: Coordinates): boolean => {
  const bottomRightCorner = { x: -28, y: -8 } // -47 + 19, -16 / 2
  const topLeftCorner = { x: -47, y: 8 } // -47, 16 / 2
  const circleCenter = { x: -28, y: 0 } // -47 + 19, 0
  const radius = 6

  const rectangle: Rectangle = { topLeft: topLeftCorner, bottomRight: bottomRightCorner }
  const circle: Circle = { center: circleCenter, radius }

  return getIsInRectangle({ point, rectangle }) && !getIsInCircle({ point, circle })
}
