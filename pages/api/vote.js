import dbConnect from '@/lib/dbConnect';
import UserCode from '@/models/UserCode';

const { code, vote } = req.body;

if (!code || !vote) {
  return res.status(400).json({ success: false, message: '코드 또는 선택된 후보가 없습니다.' });
}

const user = await UserCode.findOne({ code });

if (!user || user.voted) {
  return res.status(400).json({ success: false, message: '이미 투표했거나 유효하지 않은 코드입니다.' });
}

user.votes = vote;  // 여기서 Map → String으로 변경됨
user.voted = true;
await user.save();
