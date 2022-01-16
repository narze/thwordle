export function splitWord(word: string) {
  const alphas = word.split("")

  const out = []

  alphas.forEach((a) => {
    // if a is in a-z
    if (a.match(/[ก-ฮ]/) || a.match(/[ใเแโไาำะๆฯฤา]/)) {
      out.push(a)
    } else {
      // append to last element
      out[out.length - 1] += a
    }
  })

  return out
}
