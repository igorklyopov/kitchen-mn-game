const checkRectangleCollision = ({ rectA, rectB }) => {
  return (
    rectA.position.x + rectA.width >= rectB.position.x &&
    rectA.position.x <= rectB.position.x + rectB.width &&
    rectA.position.y <= rectB.position.y + rectB.height &&
    rectA.position.y + rectA.height >= rectB.position.y
  );
};

export { checkRectangleCollision };
