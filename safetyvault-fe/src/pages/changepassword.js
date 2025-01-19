import React, { useState } from 'react';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setMessage('Password is required!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/changepassword', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password changed successfully!');
                window.location.href = '/homepage';
            } else {
                setMessage(data.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while changing the password');
        }
    };

    return (
        <div className="m-10">
            <p className="text-2xl">Change Your Password</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">New Password</label>
                    <p>Password must contain at least one letter, one number, and one special character and must be at least 8 characters long</p>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='bg-blue-800 hover:bg-blue-700 text-white place-self-start p-4 rounded-lg'>Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ChangePassword;
