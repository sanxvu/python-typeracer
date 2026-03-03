export function calculateWPM(charsTyped, timeInSeconds) {
  const words = charsTyped / 5;
  return Math.round(words / (timeInSeconds / 60));
}

export function calculateAccuracy(typed, target) {
  let correct = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correct++;
  }

  return Math.round((correct / target.length) * 100);
}
