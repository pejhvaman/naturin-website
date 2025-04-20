"use client";

import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);
  console.log(users);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <p>There are {users.length} people.</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

export default Counter;
