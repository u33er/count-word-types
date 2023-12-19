import React, { useState } from 'react';

interface WordTypeCounts {
  [key: string]: number;
}

const App: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [wordTypeCounts, setWordTypeCounts] = useState<WordTypeCounts>({});

  const lambdaUrl = process.env.COUNT_WORD_TYPE_LAMBDA_URL || ''

  const handleSubmit = async () => {
    try {
      const response = await fetch(lambdaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
      });

      const result = await response.json();
      setWordTypeCounts(result.wordTypeCounts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <p>Word Type Counts:</p>
      <pre>{JSON.stringify(wordTypeCounts, null, 2)}</pre>
    </div>
  );
};

export default App;

