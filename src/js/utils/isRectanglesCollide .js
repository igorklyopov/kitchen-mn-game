const isRectanglesCollide = (
  rectA = { position: { x: 0, y: 0 }, width: 0, height: 0 },
  rectB = { position: { x: 0, y: 0 }, width: 0, height: 0 },
) => {
  return (
    rectA.position.x + rectA.width >= rectB.position.x &&
    rectA.position.x <= rectB.position.x + rectB.width &&
    rectA.position.y <= rectB.position.y + rectB.height &&
    rectA.position.y + rectA.height >= rectB.position.y
  );
};

export { isRectanglesCollide };
