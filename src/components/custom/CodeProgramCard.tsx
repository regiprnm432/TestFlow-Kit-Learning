const CodeProgramCard = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Source Code Program</h2>
            <pre className="bg-gray-200 p-4 rounded-lg">
                <code className="language-javascript">
                    {`
                    function sum(a, b) {
                        return a + b;
                    }
                    
                    console.log(sum(5, 10)); // Output: 15
                    `}
                </code>
            </pre>
        </div>
    );
};

export default CodeProgramCard;
