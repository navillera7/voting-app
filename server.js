// generate-codes.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const totalCodes = 27;
const codes = [];

for (let i = 0; i < totalCodes; i++) {
  codes.push({
    code: uuidv4().slice(0, 8),  // 8자리로 줄임
    voted: false,
    votes: []
  });
}

fs.writeFileSync('codes.json', JSON.stringify(codes, null, 2));
console.log("✅ 27개의 코드가 생성되었습니다.");
