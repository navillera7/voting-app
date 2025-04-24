import { useEffect, useState } from 'react';

export default function Home() {
  const [votedCount, setVotedCount] = useState(0);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/voted-count')
      .then((res) => res.json())
      .then((data) => setVotedCount(data.count));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = `/candidates?code=${code}`;
    } else {
      setError(data.message);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>투표 현황</h1>
      <p>{votedCount} / 27 명이 투표를 완료했습니다.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          placeholder="코드를 입력하세요"
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">입장하기</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}
