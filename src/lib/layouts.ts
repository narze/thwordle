function groupArr(data, n) {
  var group = []
  for (var i = 0, j = 0; i < data.length; i++) {
    if (i >= n && i % n === 0) j++
    group[j] = group[j] || []
    group[j].push(data[i])
  }
  return group
}

export const layouts = {
  Kedmanee: {
    rows: [
      ["ภ", "ถ", "ุ", "ึ", "ค", "ต", "จ", "ข", "ช", "⬅"],
      ["ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล"],
      ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
      ["⇧", "ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ", "↵"],
    ],
    rowsShifted: [
      ["ภ", "ถ", "ู", "ึ", "ค", "ต", "จ", "ข", "ช", "⬅"],
      ["ไ", "ฎ", "ฑ", "ธ", "ั", "๊", "ณ", "น", "ญ", "ฐ", "ล"],
      ["ฤ", "ฆ", "ฏ", "โ", "ฌ", "็", "๋", "ษ", "ศ", "ซ", "ง"],
      ["⇧", "ผ", "ป", "ฉ", "ฮ", "ิ", "์", "ท", "ฒ", "ฬ", "ฝ", "↵"],
    ],
  },
  Manoonchai: {
    rows: [
      ["ใ", "ต", "ห", "ล", "ส", "ป", "ั", "ก", "ิ", "บ", "็", "ฬ", "⬅"],
      ["ง", "เ", "ร", "น", "ม", "อ", "า", "่", "้", "ว", "ื"],
      ["⇧", "ุ", "ไ", "ท", "ย", "จ", "ค", "ี", "ด", "ะ", "ู", "↵"],
    ],
    rowsShifted: [
      ["ฒ", "ฏ", "ซ", "ญ", "ฟ", "ฉ", "ึ", "ธ", "ฐ", "ฎ", "ฆ", "ฑ", "⬅"],
      ["ษ", "ถ", "แ", "ช", "พ", "ผ", "ำ", "ข", "โ", "ภ", "ฌ"],
      ["⇧", "ฤ", "ฝ", "ๆ", "ณ", "๊", "๋", "์", "ศ", "ฮ", " ", "↵"],
    ],
  },
  "ก-ฮ": {
    rows: groupArr(
      "กขคฆงจฉชซฌ⬅ญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮะัาิีึืุูเแโำใไฤ่้๊๋์็↵".split(""),
      11
    ),
    rowsShifted: groupArr(
      "กขคฆงจฉชซฌ⬅ญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮะัาิีึืุูเแโำใไฤ่้๊๋์็↵".split(""),
      11
    ),
  },
}
