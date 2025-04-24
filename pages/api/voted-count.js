import dbConnect from '@/lib/dbConnect';
import UserCode from '@/models/UserCode';

export default async function handler(req, res) {
  await dbConnect();
  const count = await UserCode.countDocuments({ voted: true });
  res.status(200).json({ count });
}
