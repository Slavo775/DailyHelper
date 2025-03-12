export function extractJsonFromString(
  inputString: string
): Record<string, string> | string {
  const regex = /\{(?:[^{}"\\]|\\.|"[^"]*")*\}/g
  const match = regex.exec(inputString)
  try {
    if (!match) return inputString
    JSON.parse(match[0] ?? '')
  } catch {
    return inputString
  }
  return match[0]
}
