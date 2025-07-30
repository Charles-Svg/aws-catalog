import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownContent({ fichier }:{ fichier: string }) {
  const [contenu, setContenu] = useState('');

  useEffect(() => {
    fetch(`/data/${fichier}.md`)
      .then((res) => res.text())
      .then(setContenu);
  }, [fichier]);

  return <ReactMarkdown>{contenu}</ReactMarkdown>;
}

export default MarkdownContent;