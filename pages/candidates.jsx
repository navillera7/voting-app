const candidates = [
  { id: 'firm', name: '딱딱한 복숭아' },
  { id: 'soft', name: '물렁한 복숭아' },
  { id: 'any', name: '안가리고 먹음' },
  { id: 'nope', name: '복숭아 안먹음' }
];

const [selected, setSelected] = useState('');

const handleSubmit = async () => {
  const res = await fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, vote: selected })
  });

  const data = await res.json();
  if (data.success) router.push('/result');
  else alert(data.message || '오류 발생');
};

return (
  <div>
    <h1>복숭아 선거 🍑</h1>
    {candidates.map((c) => (
      <div key={c.id}>
        <label>
          <input
            type="radio"
            name="peach"
            value={c.id}
            checked={selected === c.id}
            onChange={() => setSelected(c.id)}
          />
          {c.name}
        </label>
      </div>
    ))}
    <button onClick={handleSubmit} disabled={!selected}>투표하기</button>
  </div>
);
