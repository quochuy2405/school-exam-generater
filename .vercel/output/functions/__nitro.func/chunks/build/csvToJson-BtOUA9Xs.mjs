const csvToJson = (csv) => {
  var _a, _b, _c, _d;
  const lines = csv == null ? void 0 : csv.split("\r\n");
  const result = [];
  const headers = (_c = (_b = (_a = lines[0]) == null ? void 0 : _a.split(",")) == null ? void 0 : _b.filter((header) => !!(header == null ? void 0 : header.trim()))) == null ? void 0 : _c.map((item) => item == null ? void 0 : item.trim());
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = (_d = lines[i]) == null ? void 0 : _d.split(",");
    for (let j = 0; j < headers.length; j++) {
      if (currentLine[j]) {
        obj[headers[j]] = currentLine[j];
      }
    }
    result.push(obj);
  }
  return result;
};
const readLinesFromCSV = (csvData, startLineIndex) => {
  const lines = csvData.split("\n");
  const jsonData = [];
  const header = lines[0].split(",").filter((header2) => !!(header2 == null ? void 0 : header2.trim())).map((item) => item == null ? void 0 : item.trim());
  for (let i = startLineIndex + 2; i < lines.length; i += 1) {
    if (i >= lines.length) {
      break;
    }
    const lineToRead = lines[i];
    const dataLineSplit = lineToRead.split(",");
    if (!dataLineSplit[0])
      continue;
    const jsonDataLine = csvLineToJson(dataLineSplit, header);
    if (jsonDataLine !== null) {
      jsonData.push(jsonDataLine);
    }
  }
  return { header, jsonData };
};
const validates = ["TRA LOI"];
const csvLineToJson = (dataLineSplit, header) => {
  var _a, _b;
  const data = dataLineSplit;
  const entry = {};
  for (let j = 0; j < header.length; j++) {
    if (validates.includes((_a = data[j]) == null ? void 0 : _a.trim())) {
      continue;
    }
    entry[header[j]] = ((_b = data[j]) == null ? void 0 : _b.trim()) || "X";
  }
  return entry;
};
const generateContent = (student, anwers, mark) => {
  const ol = anwers.map((item) => ({
    text: `${item.question} (B\u1EA5m \u0111\u1EC3 xem \u0111\xE1p \xE1n)`,
    link: item.link,
    decoration: "underline",
    color: "#3973ca",
    margin: [0, 3]
  }));
  const content = {
    watermark: {
      text: "T\xEAn trung t\xE2m",
      color: "black",
      opacity: 0.05,
      bold: "900",
      italics: false,
      fontSize: 70
    },
    content: [
      {
        layout: "lightHorizontalLines",
        // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*"],
          body: [
            [
              {
                text: "PHI\u1EBEU D\u1EB6N D\xD2 Y\xCAU TH\u01AF\u01A0NG",
                bold: true,
                alignment: "center",
                fontSize: 22,
                color: "#3973ca"
              }
            ]
          ]
        }
      },
      {
        columns: [
          {
            width: "*",
            text: "H\u1ECD v\xE0 t\xEAn: " + student["H\u1ECD v\xE0 T\xEAn"],
            bold: true,
            alignment: "left",
            fontSize: 12,
            color: "#3973ca",
            margin: [0, 10]
          },
          {
            text: "S\u1ED1 b\xE1o danh: " + student["S\u1ED1 B\xE1o Danh"],
            bold: true,
            alignment: "left",
            fontSize: 12,
            color: "#3973ca",
            margin: [0, 10]
          },
          {
            text: "C\u01A1 s\u1EDF: NQH Q10",
            bold: true,
            alignment: "left",
            fontSize: 12,
            color: "#3973ca",
            margin: [0, 10]
          }
        ]
      },
      {
        columns: [
          {
            width: "*",
            text: "\u0110i\u1EC3m b\xE0i thi: " + mark,
            bold: true,
            alignment: "left",
            fontSize: 12,
            color: "#3973ca"
          },
          {
            text: "H\u1ECDc sinh \u0111ang h\u1ECDc t\u1EA1i NQH: C\xF3",
            bold: true,
            alignment: "left",
            fontSize: 12,
            color: "#3973ca"
          },
          {
            text: "M\xE3 \u0111\u1EC1: " + student["M\xE3 \u0111\u1EC1"],
            bold: true,
            alignment: "left",
            fontSize: 12,
            color: "#3973ca"
          }
        ]
      },
      {
        text: "Nh\u1EEFng n\u1ED9i dung con c\u1EA7n \xF4n t\u1EADp th\xEAm - \u0110\u1EC1 s\u1ED1: " + student["M\xE3 \u0111\u1EC1"],
        bold: true,
        alignment: "center",
        fontSize: 16,
        color: "black",
        margin: [0, 10]
      },
      {
        ol
      }
    ]
  };
  return content;
};

export { csvToJson as c, generateContent as g, readLinesFromCSV as r };
//# sourceMappingURL=csvToJson-BtOUA9Xs.mjs.map
