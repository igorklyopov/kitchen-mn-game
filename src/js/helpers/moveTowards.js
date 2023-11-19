function moveTowards(object, destinationPosition, speed) {
  let distanceToTravelX = destinationPosition.x - object.position.x;
  let distanceToTravelY = destinationPosition.y - object.position.y;

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    // If we're close enough, just move directly to the destination
    object.position.x = destinationPosition.x;
    object.position.y = destinationPosition.y;
  } else {
    // Otherwise, move by the specified speed in the direction of the destination
    const normalizedX = distanceToTravelX / distance;
    const normalizedY = distanceToTravelY / distance;

    object.position.x += normalizedX * speed;
    object.position.y += normalizedY * speed;

    // Recalculate remaining distance after the move
    distanceToTravelX = destinationPosition.x - object.position.x;
    distanceToTravelY = destinationPosition.y - object.position.y;
    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
}

export { moveTowards };
