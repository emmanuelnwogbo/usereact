import { useEffect, useState } from 'react';

import './App.css';

function App() {
    interface Person {
        name: string
    }

    async function fetchNames(): Promise<Person[]> {
        try {
            const response = await fetch("/names.json");
            const data: Person[] = await response.json();
            return data;
        } catch (error) {
            return []
        }
    }

    const [names, setNames] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNames()
            .then(data => {
                setNames(data);
                setIsLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch names");
                setIsLoading(false);
            })
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <ul>
                    {names.map((person, index) => (
                        <li key={index}>{person.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;