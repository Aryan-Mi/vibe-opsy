import '../styles/results.css';

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string;
}

export function ImagePreview({ imageUrl, fileName }: ImagePreviewProps) {
  return (
    <div className="image-preview-container">
      <div className="image-preview-wrapper">
        <img 
          src={imageUrl} 
          alt="Uploaded skin lesion" 
          className="preview-image"
        />
      </div>
      <div className="image-label">
        FILE: {fileName.toUpperCase()}
      </div>
    </div>
  );
}
