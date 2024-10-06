import React from 'react';
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'], queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
  });

  if (error) return <div>there was an Error</div>;

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <h3>title: {post.title}</h3>
          <span>body: {post.body}</span>
        </div>
      ))}
    </div>
  )
}

export default App