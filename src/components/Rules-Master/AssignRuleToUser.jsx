import React, { useState, useEffect } from 'react';

function AssignRuleToUser() {
  const [users, setUsers] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRule, setSelectedRule] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('/api/users');
        const rulesResponse = await fetch('/api/admin/rules');
        setUsers(await usersResponse.json());
        setRules(await rulesResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const assignment = { userId: selectedUser, ruleId: selectedRule };

    try {
      const response = await fetch('/api/admin/user-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignment),
      });

      if (response.ok) {
        setMessage('Rule assigned to user successfully.');
      } else {
        setMessage('Failed to assign rule.');
      }
    } catch (error) {
      console.error('Error assigning rule:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Assign Rule to User</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userSelect">Select User:</label>
          <select id="userSelect" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">--Select User--</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ruleSelect">Select Rule:</label>
          <select id="ruleSelect" value={selectedRule} onChange={(e) => setSelectedRule(e.target.value)}>
            <option value="">--Select Rule--</option>
            {rules.map((rule) => (
              <option key={rule.id} value={rule.id}>
                {rule.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Assign Rule</button>
      </form>
    </div>
  );
}

export default AssignRuleToUser;
