import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

const SourceCodeCard = () => {
    const [sourceCode, setSourceCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const MODULE_ID = '8b9d9c04-0fef-4ea1-963c-e65b5020e3c1';

    useEffect(() => {
        const fetchSourceCodeText = async () => {
            try {
              const response = await fetch(`http://localhost:8000/modul/getSourceCodeText/${MODULE_ID}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': getAuthenticatedUser().token
                }
              });
      
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
      
              const data = await response.json();
              setSourceCode(data.data);
            } catch (error) {
              console.error('Error fetching source code text:', error);
              setError((error as Error).message);
            }
        };

        fetchSourceCodeText();
    }, []);

    return (
        <>
        <h4 className="text-xl font-bold  mb-1  text-gray-800">Source Code (Java)</h4>
            <div className="p-4 rounded-lg">
              <SyntaxHighlighter language="java" style={docco}>
                {sourceCode || 'Loading source code...'}
              </SyntaxHighlighter>
            </div>
        </>
    );
};

export default SourceCodeCard;
