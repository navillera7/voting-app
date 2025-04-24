import { useState } from 'react';
import { useRouter } from 'next/router';

const candidates = [
  {
    id: 'carney',
    name: 'Mark Carney',
    party: '자유당',
    pledge: '기후 위기 대응, 중산층 지원 강화',
    image: '/images/carney.jpg'
  },
  {
    id: 'poilievre',
    name: 'Pierre Poilievre',
    party: '보수당',
    pledge: '세금 감면, 정부 지출 축소',
    image: '/images/poilievre.jpg'
  },
  {
    id: 'singh',
    name: 'Jagmeet Singh',
    party: '신민주당',
    pledge: '의료 및 주택 공공성 강화',
    image: '/images/singh.jpg'
  }
];

export default function CandidatesPage() {
  const router = useRouter();
  const { code } = router.query;

  const [votes, setVotes] = useState({ carney: 0, poilievre: 0, singh: 0 });
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const updateVote = (id, delta) => {
    if ((delta > 0 && totalVotes >= 3) || (votes[id] + delta < 0)) return;
    setVotes({ ...votes, [id]: votes[id] + delta });
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, votes })
    });

    const data = await res.json();
    if (data.success) {
      router.push('/result');
    } else {
      alert(data.message || '오류 발생');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>후보자 목록</h1>
      <p>총 3표까지 자유롭게 분배하세요. (같은 후보에게 몰표 가능)</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {candidates.map((c) => (
          <div key={c.id} style={{ border: '1px solid #ccc', padding: 10 }}>
            <img src={c.image} alt={c.name} width={150} />
            <h3>{c.name} ({c.party})</h3>
            <p>{c.pledge}</p>
            <div>
              <button onClick={() => updateVote(c.id, -1)} disabled={votes[c.id] === 0}>-</button>
              <span style={{ margin: '0 10px' }}>{votes[c.id]}표</span>
              <button onClick={() => updateVote(c.id, 1)} disabled={totalVotes >= 3}>+</button>
            </div>
          </div>
        ))}
      </div>
      <br />
      <button onClick={handleSubmit} disabled={totalVotes === 0}>투표 제출</button>
    </div>
  );
} 