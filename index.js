/**
 * @param {string} [template=""]
 * @returns {(...any) => string}
 */
export const interject =
  (template = "") =>
  (...substitute) => {
    const subs = typeof substitute[0] === "object" ? substitute[0] : substitute

    return template.replace(/\\?\{([\w -\/.]*)\}/g, (match, item) => {
      if (match[0] === "\\") {
        return match.slice(1)
      }

      return typeof subs[item] === "undefined" ? match : subs[item]
    })
  }
