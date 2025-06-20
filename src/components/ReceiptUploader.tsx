'use client';
import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function ReceiptUploader() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const { data } = await Tesseract.recognize(file, 'ita');
    setText(data.text);
    setLoading(false);
    // TODO: parse e salvare via tRPC
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFile} className="file-input file-input-bordered" />
      {loading && <progress className="progress w-full" />}
      {text && <textarea className="textarea textarea-bordered w-full h-40" value={text} readOnly />}
    </div>
  );
}
