import { useState } from "react";
import Tesseract from "tesseract.js";

export default function OCRReader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleOCR = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await Tesseract.recognize(image, "ita", {
        logger: (m) => console.log(m),
      });
      setText(result.data.text);
    } catch (err) {
      setText("Errore durante la lettura dell'immagine.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-xl">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleOCR} disabled={!image || loading} className="ml-2 p-2 border rounded">
        {loading ? "\ud83d\udd0d Elaborazione..." : "\ud83d\dcf7 Avvia OCR"}
      </button>
      {text && (
        <div className="mt-4 whitespace-pre-wrap bg-gray-100 p-3 rounded">
          <strong>Testo estratto:</strong>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
