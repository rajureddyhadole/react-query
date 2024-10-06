import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query'

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'], queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((res) => res.json())
  })

  if (error || isError) return <div>there was an Error</div>;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      {isPending && <p>DATA IS BEING ADDED...</p>}
      <button onClick={() => mutate({
        userId: 1000,
        id: 1111,
        title: "this is a header written by raju reddy.",
        body: "this is a new post."
      })}>
        add post
      </button>
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