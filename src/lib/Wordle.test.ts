import { CharState, layout, normalizeWord, splitWord, validateWord } from "./Wordle"

describe("#splitWord", () => {
  it("exists", () => {
    expect(splitWord).toBeDefined()
  })

  it("splits ไทย to ไ ท ย", () => {
    const input = "ไทย"
    const expectedOutput = ["ไ", "ท", "ย"]

    expect(splitWord(input)).toEqual(expectedOutput)
  })

  it("splits สวัสดี to ส วั ส ดี", () => {
    const input = "สวัสดี"
    const expectedOutput = ["ส", "วั", "ส", "ดี"]

    expect(splitWord(input)).toEqual(expectedOutput)
  })

  it("splits whole sentence correctly", () => {
    const input1 =
      "เป็นมนุษย์ สุดประเสริฐ เลิศคุณค่า ยังดีกว่า ฝูงสัตว์ เดรัจฉาน จงฝ่าฟัน พัฒนา".replaceAll(
        " ",
        ""
      )

    expect(splitWord(input1).length).toEqual(7 + 9 + 7 + 6 + 5 + 7 + 6 + 4)

    const input2 = "วิชาการ อย่าล้างผลาญ ฤาเข่นฆ่า บีฑาใคร ไม่ถือโทษ โกรธแช่งซัด".replaceAll(
      " ",
      ""
    )
    expect(splitWord(input2).length).toEqual(6 + 10 + 7 + 6 + 7 + 9)

    const input3 =
      "ฮึดฮัดด่า หัดอภัย เหมือนกีฬา อัชฌาศัย ปฏิบัติ ประพฤติกฎ กำหนดใจ พูดจาให้ จ๊ะ ๆ จ๋า น่าฟังเอย"
    expect(splitWord(input3).length).toEqual(6 + 5 + 8 + 6 + 4 + 8 + 7 + 6 + 2 + 1 + 2 + 7)
  })
})

describe("normalizeWord", () => {
  it("strips upper-lower characters", () => {
    const input = "สวัสดี"
    const expectedOutput = "สวสด"

    expect(normalizeWord(input)).toEqual(expectedOutput)
  })
})

describe("validateWord", () => {
  it("exists", () => {
    expect(validateWord).toBeDefined()
  })

  it("returns array of objects", () => {
    const input = "ไทย"
    const solution = "ไทย"

    const expectedOutput = [
      { correct: CharState.Correct, char: "ไ" },
      { correct: CharState.Correct, char: "ท" },
      { correct: CharState.Correct, char: "ย" },
    ]
    expect(validateWord(input, solution)).toEqual(expectedOutput)
  })

  it("validate wrong alphabets", () => {
    const input = "ไหล"
    const solution = "ไทย"

    const expectedOutput = [
      { correct: CharState.Correct, char: "ไ" },
      { correct: CharState.Wrong, char: "ห" },
      { correct: CharState.Wrong, char: "ล" },
    ]
    expect(validateWord(input, solution)).toEqual(expectedOutput)
  })

  it("validate out-of-place alphabets", () => {
    const input = "ไยล"
    const solution = "ไทย"

    const expectedOutput = [
      { correct: CharState.Correct, char: "ไ" },
      { correct: CharState.OutOfPlace, char: "ย" },
      { correct: CharState.Wrong, char: "ล" },
    ]
    expect(validateWord(input, solution)).toEqual(expectedOutput)
  })

  it("validate out-of-place alphabets and match substring with upper-lower sara", () => {
    const input = "xจxxx"
    const solution = "จังหวัด"

    const expectedOutput = [
      { correct: CharState.Wrong, char: "x" },
      { correct: CharState.OutOfPlace, char: "จ" },
      { correct: CharState.Wrong, char: "x" },
      { correct: CharState.Wrong, char: "x" },
      { correct: CharState.Wrong, char: "x" },
    ]
    expect(validateWord(input, solution)).toEqual(expectedOutput)
  })

  it("checks without upper/lower sara", () => {
    const input = "ปลาชชร"
    const solution = "ประชุมว"

    const expectedOutput = [
      { correct: CharState.Correct, char: "ป" },
      { correct: CharState.Wrong, char: "ล" },
      { correct: CharState.Wrong, char: "า" },
      { correct: CharState.Correct, char: "ชุ" },
      { correct: CharState.Wrong, char: "ช" },
      { correct: CharState.OutOfPlace, char: "ร" },
    ]
    expect(validateWord(input, solution)).toEqual(expectedOutput)
  })

  it("ignores already correct characters from matching again", () => {
    const input = "ชมนม"
    const solution = "ชุมชน"

    const expectedOutput = [
      { correct: CharState.Correct, char: "ชุ" },
      { correct: CharState.Correct, char: "ม" },
      { correct: CharState.OutOfPlace, char: "น" },
      { correct: CharState.Wrong, char: "ม" },
    ]
    expect(validateWord(input, solution)).toEqual(expectedOutput)
  })
})

describe("layout", () => {
  it("returns sets of all possible alphabets as keys", () => {
    const alphabets = "กขค"
    expect(Object.keys(layout(alphabets))).toEqual("กขค".split(""))
  })

  it("returns state of alphabet as values", () => {
    const alphabets = "กขคง"
    const validations = [
      { correct: CharState.Wrong, char: "ก" },
      { correct: CharState.OutOfPlace, char: "ข" },
      { correct: CharState.Wrong, char: "ค" },
      { correct: CharState.Correct, char: "ก" },
      { correct: CharState.Wrong, char: "ก" }, // Ignore if already at correct state
    ]

    expect(layout(alphabets, validations)).toEqual({
      ก: CharState.Correct,
      ข: CharState.OutOfPlace,
      ค: CharState.Wrong,
      ง: CharState.NotUsed,
    })
  })
})
