import { useRef, useState } from 'react';

const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100MB por modelo

type GlbUploaderProps = {
  onModelLoaded: (url: string, fileName: string) => void;
};

export function GlbUploader({ onModelLoaded }: GlbUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    setError(null);

    if (!file.name.toLowerCase().endsWith('.glb')) {
      setError('Formato não suportado. Escolha um arquivo .glb.');
    } else if (file.size > MAX_SIZE_BYTES) {
      setError('O arquivo é maior que 100MB.');
    } else {
      onModelLoaded(URL.createObjectURL(file), file.name);
    }

    // Permite selecionar o mesmo arquivo de novo.
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <>
      <button
        type="button"
        className="capture-tile"
        onClick={() => inputRef.current?.click()}
      >
        <CubeIcon />
        <span className="tile-title">Abrir modelo .glb</span>
        <span className="tile-hint">Visualize um modelo 3D que você já tem</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".glb,model/gltf-binary"
        hidden
        onChange={(e) => handleFile(e.target.files)}
      />
      {error && (
        <p className="status-line status-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

function CubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 2 L19 6.5 L19 15.5 L11 20 L3 15.5 L3 6.5 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 11 L11 2 M11 11 L19 15.5 M11 11 L3 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}