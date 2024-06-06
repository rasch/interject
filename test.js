import test from "tape"
import { interject } from "./index.js"

test("simple use case for sanity check", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Come on, seriously. {0} {1}. {0}. {1}.")("Chunky", "Bacon"),

    // expected
    "Come on, seriously. Chunky Bacon. Chunky. Bacon."
  )
})

test("populate placeholders using an array for substitutes", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Come on, seriously. {0} {1}. {0}. {1}.")(["Chunky", "Bacon"]),

    // expected
    "Come on, seriously. Chunky Bacon. Chunky. Bacon."
  )
})

test("populate placeholders using an object for substitutes", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Come on, seriously. {adj} {noun}. {adj}. {noun}.")({
      adj: "Chunky",
      noun: "Bacon",
    }),

    // expected
    "Come on, seriously. Chunky Bacon. Chunky. Bacon."
  )
})

test("populate placeholders using object with spaces in keys", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Come on, seriously. {an adj} {noun}. {an adj}. {noun}.")({
      "an adj": "Chunky",
      noun: "Bacon",
    }),

    // expected
    "Come on, seriously. Chunky Bacon. Chunky. Bacon."
  )
})

test("populate placeholders given sparse parameters", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("{0} and his {1}! {2} surrounded by {3}!")(
      "an elf",
      "pet ham",
      "a giraffe"
    ),

    // expected
    "an elf and his pet ham! a giraffe surrounded by {3}!"
  )
})

test("populate placeholders when object is missing key", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("{elf} and his {pet}! {animal} surrounded by {weeezards}!")({
      elf: "an elf",
      pet: "pet ham",
      animal: "a giraffe",
    }),

    // expected
    "an elf and his pet ham! a giraffe surrounded by {weeezards}!"
  )
})

test("populate placeholders unless escaped with \\", t => {
  t.plan(1)
  t.equal(
    // actual
    interject('\\{0} is "{0}"')("hello world"),

    // expected
    '{0} is "hello world"'
  )
})

test("populate object placeholders unless escaped with \\", t => {
  t.plan(1)
  t.equal(
    // actual
    interject('\\{status} is "{status}"')({ status: "asleep" }),

    // expected
    '{status} is "asleep"'
  )
})

test("swap placeholers", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("{0} {1}")("{1}", "{0}"),

    // expected
    "{1} {0}"
  )
})

test("pass javascript expression as parameter", t => {
  t.plan(1)
  t.equal(
    // actual
    interject(
      "The answer to the ultimate question of life, " +
        "the universe, and everything is {0}."
    )(7 * 6),

    // expected
    "The answer to the ultimate question of life, " +
      "the universe, and everything is 42."
  )
})

test("pass a function with a return value as a parameter", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("The answer is {0}.")(
      (function (n) {
        return n
      })(42)
    ),

    // expected
    "The answer is 42."
  )
})

test("get money", t => {
  t.plan(1)
  t.equal(
    // actual
    // eslint-disable-next-line no-template-curly-in-string
    interject("The total is ${0} including tax.")(
      (32.99 + 32.99 * 0.06).toFixed(2)
    ),

    // expected
    "The total is $34.97 including tax."
  )
})

test("do not populate placeholders when no parameters given", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("{0}.{1}.{2}")(),

    // expected
    "{0}.{1}.{2}"
  )
})

test("do nothing when no placeholders are present", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("I'm Batman")("Sure you are Bruce!"),

    // expected
    "I'm Batman"
  )
})

test("do not populate placeholders if undefined", t => {
  t.plan(1)
  t.equal(
    // actual
    // eslint-disable-next-line no-undefined
    interject("{0}.{1}.{2}")(undefined, undefined, undefined),

    // expected
    "{0}.{1}.{2}"
  )
})

test("format date using a function that returns an object", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("{year}-{month}-{day}")(
      (function () {
        const d = new Date(1969, 6, 20)

        return {
          year: d.getFullYear(),
          month: `0${d.getMonth() + 1}`.slice(-2),
          day: d.getDate(),
        }
      })()
    ),

    // expected
    "1969-07-20"
  )
})

test("pass numbers into placeholders to ensure that 0 works", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("{0} {1} {2}")(0, 1, 2),

    // expected
    "0 1 2"
  )
})

test("pass an empty string to remove a placeholder", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("this is a {prefix}placeholder")({ prefix: "" }),

    // expected
    "this is a placeholder"
  )
})

test("use booleans to populate placeholders", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("This is a {0} or {1} question.")(true, false),

    // expected
    "This is a true or false question."
  )
})

test("use Infinity and NaN to populate placeholders", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("The numbers range from {0} to {1} unless it is a {2}.")(
      -Infinity,
      Infinity,
      NaN
    ),

    // expected
    "The numbers range from -Infinity to Infinity unless it is a NaN."
  )
})

test("populate placeholders when string has a single quote", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("{0} in the {1}!")("We're", "book"),

    // expected
    "We're in the book!"
  )
})

test("populate placeholders when string has double quotes", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("I said {0}!")('"Chunky Bacon"'),

    // expected
    'I said "Chunky Bacon"!'
  )
})

test("return empty string when no parameters given", t => {
  t.plan(1)
  t.equal(
    // actual
    interject()(),

    // expected
    ""
  )
})

test("process only inner placeholders in nested placeholders", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Goodbye, {Xx{0}x{1}xX} World!")("Hello", "World"),

    // expected
    "Goodbye, {XxHelloxWorldxX} World!"
  )
})

test("handle keys with dash in object", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Hello, {my-noun}.")({ "my-noun": "world" }),

    // expected
    "Hello, world."
  )
})

test("handle keys with slash", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Hello, {bold}world{/bold}.")({
      bold: "\x1b[1m",
      "/bold": "\x1b[0m",
    }),

    // expected
    "Hello, \x1b[1mworld\x1b[0m."
  )
})

test("handle keys with period", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Hello, {bold.md}world{bold.md}.")({ "bold.md": "**" }),

    // expected
    "Hello, **world**."
  )
})

test("do nothing with empty curly braces", t => {
  t.plan(1)
  t.equal(
    // actual
    interject("Empty curly braces, {}, work in python but not here.")("empty"),

    // expected
    "Empty curly braces, {}, work in python but not here."
  )
})
