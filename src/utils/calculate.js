// Haversine formula
export const calcDistance = (move_from, move_to) => {
  const lat1 = move_to.lat;
  const lat2 = move_from.lat;
  const lon1 = move_to.lng;
  const lon2 = move_from.lng;

  const R = 6371;
  const phi = (lat1 * Math.PI) / 180;
  const theta = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const lambda = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi) * Math.cos(theta) * Math.sin(lambda / 2) * Math.sin(lambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Math.round(R * c);

  return d;
};

export const calcNumberOfCars = (area, co_area) => {
  return Math.floor((area + (co_area || 0) * 2) / 50) + 1;
};

export const calcDistanceFee = (distance) => {
  if (distance >= 100) {
    return 10000 + 7 * distance;
  } else if (distance >= 50) {
    return 5000 + 8 * distance;
  } else {
    return 1000 + 10 * distance;
  }
};

export const calcHeavyObjectFee = (heavy_objects) => {
  return 5000 * (heavy_objects?.length || 0);
};

export const calcTotal = (offer) => {
  const distance = calcDistance(offer.move_from, offer.move_to);
  const fee =
    calcDistanceFee(distance) * calcNumberOfCars(offer.area, offer.co_area) + calcHeavyObjectFee(offer.heavy_objects);
  return { distance, fee };
};
