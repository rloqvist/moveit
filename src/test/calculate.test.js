import { calcDistance, calcNumberOfCars, calcDistanceFee, calcHeavyObjectFee } from "utils/calculate";

it("Haversine calculation", () => {
  // Stockholm
  const move_from = {
    lat: 59.3293,
    lng: 18.0686,
  };

  // Paris
  const move_to = {
    lat: 48.8566,
    lng: 2.3522,
  };

  // Enligt google, 1.543,68, https://sv.distance.to/Stockholm/Paris
  const expected = 1544;
  const calculated = calcDistance(move_from, move_to);
  expect(calculated).toBe(expected);
});

it("Distance fee 10km", () => {
  const distance = 10;
  const expected = 1100;
  const calculated = calcDistanceFee(distance);
  expect(calculated).toBe(expected);
});

it("Distance fee 49km", () => {
  const distance = 49;
  const expected = 1490;
  const calculated = calcDistanceFee(distance);
  expect(calculated).toBe(expected);
});

it("Distance fee 50km", () => {
  const distance = 50;
  const expected = 5400;
  const calculated = calcDistanceFee(distance);
  expect(calculated).toBe(expected);
});

it("Distance fee 51km", () => {
  const distance = 51;
  const expected = 5408;
  const calculated = calcDistanceFee(distance);
  expect(calculated).toBe(expected);
});

it("Distance fee 99km", () => {
  const distance = 99;
  const expected = 5792;
  const calculated = calcDistanceFee(distance);
  expect(calculated).toBe(expected);
});

it("Distance fee 100km", () => {
  const distance = 100;
  const expected = 10700;
  const calculated = calcDistanceFee(distance);
  expect(calculated).toBe(expected);
});

it("Space fee 49m2 + 0m2", () => {
  const area = 49;
  const expected = 1;
  const calculated = calcNumberOfCars(area);
  expect(calculated).toBe(expected);
});

it("Space fee 10m2 + 25m2", () => {
  const area = 10;
  const co_area = 25;
  const expected = 2;
  const calculated = calcNumberOfCars(area, co_area);
  expect(calculated).toBe(expected);
});

it("Space fee 50m2 + 0m2", () => {
  const area = 50;
  const expected = 2;
  const calculated = calcNumberOfCars(area);
  expect(calculated).toBe(expected);
});

it("Space fee 100m2 + 0m2", () => {
  const area = 100;
  const expected = 3;
  const calculated = calcNumberOfCars(area);
  expect(calculated).toBe(expected);
});

it("Space fee 150m2 + 0m2", () => {
  const area = 150;
  const expected = 4;
  const calculated = calcNumberOfCars(area);
  expect(calculated).toBe(expected);
});

it("Heavy object fee []", () => {
  const heavy_objects = [];
  const expected = 0;
  const calculated = calcHeavyObjectFee(heavy_objects);
  expect(calculated).toBe(expected);
});

it("Heavy object fee [Kassaskåp]", () => {
  const heavy_objects = ["Kassaskåp"];
  const expected = 5000;
  const calculated = calcHeavyObjectFee(heavy_objects);
  expect(calculated).toBe(expected);
});

it("Heavy object fee [Kassaskåp, Piano]", () => {
  const heavy_objects = ["Kassaskåp", "Piano"];
  const expected = 10000;
  const calculated = calcHeavyObjectFee(heavy_objects);
  expect(calculated).toBe(expected);
});
