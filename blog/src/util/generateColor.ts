export default function generateColor(darkness: number) {
  // Ensure the darkness value is within the range [2, 4096]
  const clampedValue = Math.min(4096, Math.max(2, darkness));

  // Use logarithmic scaling to enhance the contrast between color levels
  const logValue = Math.log(clampedValue) / Math.log(4096); // Normalize log to [0,1]

  // Scale it to RGB range [0, 255]
  const rgbValue = Math.floor(logValue * 255);

  // Convert to hex and pad to 2 digits
  const hexValue = (255 - rgbValue).toString(16).padStart(2, "0");

  // Return the grayscale color in hex format
  return `#00${hexValue}${hexValue}`;
}
