const possibleOccupations = [
  'plumber',
  'dancer',
  'developer',
  'artist'
]

export const getRandomOccupation = () => {
  const randomIndex = Math.floor(Math.random() * 4);

  return possibleOccupations[randomIndex]
}