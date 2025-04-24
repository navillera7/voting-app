const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const TOTAL_CODES = 27;
const codes = [];

for (let i = 0; i < TOTAL_CODES; i++) {
  codes.push({
    code: uuidv4().slice(0, 8),  // 8자리 랜덤 코드
    voted: false,
    votes: []
  });
}

fs.writeFileSync('codes.json', JSON.stringify(codes, null, 2));
console.log('✅ codes.json 파일이 생성되었습니다.');
