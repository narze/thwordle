import {
  CharState,
  getShareResults,
  layout,
  normalizeWord,
  splitWord,
  validateWord,
} from "./Wordle"

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
      "เป็นมนุษย์ สุดประเสริฐ เลิศคุณค่า ยังดีกว่า ฝูงสัตว์ เดรัจฉาน จงฝ่าฟัน พัฒนา".replace(
        / /g,
        ""
      )

    expect(splitWord(input1).length).toEqual(7 + 9 + 7 + 6 + 5 + 7 + 6 + 4)

    const input2 = "วิชาการ อย่าล้างผลาญ ฤาเข่นฆ่า บีฑาใคร ไม่ถือโทษ โกรธแช่งซัด".replace(/ /g, "")
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
      { correct: CharState.OutOfPlace, char: "จั" }, // Auto add ั
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

  describe("edge cases", () => {
    it("mark only one character to be out of place", () => {
      const input = "อัศจรรย์"
      const solution = "ประเทศ"

      const expectedOutput = [
        { correct: CharState.Wrong, char: "อั" },
        { correct: CharState.OutOfPlace, char: "ศ" },
        { correct: CharState.Wrong, char: "จ" },
        { correct: CharState.OutOfPlace, char: "ร" },
        { correct: CharState.Wrong, char: "ร" },
        { correct: CharState.Wrong, char: "ย์" },
      ]
      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("auto corrects in-place character", () => {
      const input = "กรุงเทพ"
      const solution = "ประเทศ"

      const expectedOutput = [
        { correct: CharState.Wrong, char: "ก" },
        { correct: CharState.Correct, char: "ร" }, // Auto-corrected
        { correct: CharState.Wrong, char: "ง" },
        { correct: CharState.Correct, char: "เ" },
        { correct: CharState.Correct, char: "ท" },
        { correct: CharState.Wrong, char: "พ" },
      ]
      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("strips all upper-lower characters of out-of-place characters", () => {
      const input = "นักเรียน"
      const solution = "ประเทศ"

      const expectedOutput = [
        { correct: CharState.Wrong, char: "นั" },
        { correct: CharState.Wrong, char: "ก" },
        { correct: CharState.OutOfPlace, char: "เ" },
        { correct: CharState.OutOfPlace, char: "ร" }, // This one
        { correct: CharState.Wrong, char: "ย" },
        { correct: CharState.Wrong, char: "น" },
      ]
      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("mark two of the same characters to be out of place", () => {
      const input = "อัศจรรย์"
      const solution = "ปรรเทศ"

      const expectedOutput = [
        { correct: CharState.Wrong, char: "อั" },
        { correct: CharState.OutOfPlace, char: "ศ" },
        { correct: CharState.Wrong, char: "จ" },
        { correct: CharState.OutOfPlace, char: "ร" },
        { correct: CharState.OutOfPlace, char: "ร" },
        { correct: CharState.Wrong, char: "ย์" },
      ]
      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("checks correctly for 1 correct & 1 out of place characters", () => {
      const input = "สารบาญ"
      const solution = "สามารถ"

      const expectedOutput = [
        { correct: CharState.Correct, char: "ส" },
        { correct: CharState.Correct, char: "า" },
        { correct: CharState.OutOfPlace, char: "ร" },
        { correct: CharState.Wrong, char: "บ" },
        { correct: CharState.OutOfPlace, char: "า" },
        { correct: CharState.Wrong, char: "ญ" },
      ]
      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("checks the correct position first, then run another pass to check out-of-place characters", () => {
      const input = "สมมาตร"
      const solution = "สามารถ"

      const expectedOutput = [
        { correct: CharState.Correct, char: "ส" },
        { correct: CharState.Wrong, char: "ม" },
        { correct: CharState.Correct, char: "ม" },
        { correct: CharState.Correct, char: "า" },
        { correct: CharState.Wrong, char: "ต" },
        { correct: CharState.OutOfPlace, char: "ร" },
      ]

      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("checks the correct position first, then run another pass to check out-of-place characters (2)", () => {
      const input = "อาถรรพ์"
      const solution = "สามารถ"

      const expectedOutput = [
        { correct: CharState.Wrong, char: "อ" },
        { correct: CharState.Correct, char: "า" },
        { correct: CharState.OutOfPlace, char: "ถ" },
        { correct: CharState.Wrong, char: "ร" },
        { correct: CharState.Correct, char: "ร" },
        { correct: CharState.Wrong, char: "พ์" },
      ]

      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("checks the correct position first, then run another pass to check out-of-place characters (3)", () => {
      const input = "ราดหน้า"
      const solution = "สามารถ"

      const expectedOutput = [
        { correct: CharState.OutOfPlace, char: "ร" },
        { correct: CharState.Correct, char: "า" },
        { correct: CharState.Wrong, char: "ด" },
        { correct: CharState.Wrong, char: "ห" },
        { correct: CharState.Wrong, char: "น้" },
        { correct: CharState.OutOfPlace, char: "า" },
      ]

      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })

    it("checks the correct position first, then run another pass to check out-of-place characters (4)", () => {
      const input = "ภารโรง"
      const solution = "สามารถ"

      const expectedOutput = [
        { correct: CharState.Wrong, char: "ภ" },
        { correct: CharState.Correct, char: "า" },
        { correct: CharState.Wrong, char: "ร" },
        { correct: CharState.Wrong, char: "โ" },
        { correct: CharState.Correct, char: "ร" },
        { correct: CharState.Wrong, char: "ง" },
      ]

      expect(validateWord(input, solution)).toEqual(expectedOutput)
    })
  })
})

describe("layout", () => {
  it("returns sets of all possible alphabets as keys", () => {
    const alphabets = "กขค"
    expect(Object.keys(layout([alphabets])[0])).toEqual("กขค".split(""))
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

    expect(layout([alphabets], validations)[0]).toEqual({
      ก: CharState.Correct,
      ข: CharState.OutOfPlace,
      ค: CharState.Wrong,
      ง: CharState.NotUsed,
    })
  })

  it("does not mark upper-lower characters as wrong, leave it not used", () => {
    const input = "หนู"
    const solution = "จูง"
    const validation = validateWord(input, solution)

    expect(layout([input], validation)[0]).toEqual({
      ห: CharState.Wrong,
      น: CharState.Wrong,
      "ู": CharState.NotUsed,
    })
  })

  it("does not mark upper-lower characters as wrong, leave it not used (2)", () => {
    const input = "เสือดำ"
    const solution = "เหมือน"
    const validation = validateWord(input, solution)

    expect(layout([input], validation)[0]).toEqual({
      เ: CharState.Correct,
      ส: CharState.Wrong,
      "ื": CharState.NotUsed,
      อ: CharState.OutOfPlace,
      ด: CharState.Wrong,
      ำ: CharState.Wrong,
    })
  })
})

describe("#getShareResults", () => {
  it("receives sets of attempts, then returns sharable text with emojis", () => {
    const input = [
      [
        { correct: CharState.Wrong, char: "ก" },
        { correct: CharState.OutOfPlace, char: "ข" },
        { correct: CharState.Wrong, char: "ค" },
        { correct: CharState.Correct, char: "ก" },
        { correct: CharState.Wrong, char: "ก" },
      ],
      [
        { correct: CharState.Correct, char: "ก" },
        { correct: CharState.Correct, char: "ข" },
        { correct: CharState.Correct, char: "ค" },
        { correct: CharState.Correct, char: "ก" },
        { correct: CharState.Correct, char: "ก" },
      ],
    ]
    const expectedOutput = ["⬜🟨⬜🟩⬜", "🟩🟩🟩🟩🟩"]

    expect(getShareResults).toBeDefined()
    expect(getShareResults(input)).toEqual(expectedOutput)
  })
})
