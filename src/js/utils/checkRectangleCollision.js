const checkRectangleCollision = (rectA, rectB) => {
  return (
    rectA.x + rectA.width >= rectB.x &&
    rectA.x <= rectB.x + rectB.width &&
    rectA.y <= rectB.y + rectB.height &&
    rectA.y + rectA.height >= rectB.y
  );
};

export { checkRectangleCollision };
