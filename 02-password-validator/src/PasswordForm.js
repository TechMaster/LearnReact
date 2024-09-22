import React, { Component } from 'react';
class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: '',
      passwordValid: false,
    };
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handlePasswordBlur = () => {
    const { password } = this.state;
    if (password.length < 8) {
      this.setState({ passwordError: 'Password is less than 8 characters' });
    } else {
      this.setState({ passwordError: '' });
    }
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      this.setState({ passwordValid: true, confirmPasswordError: '' });
    } else {
      this.setState({
        passwordValid: false,
        confirmPasswordError: 'Confirm password is different than password',
      });
    }
  };

  render() {
    const {
      password,
      confirmPassword,
      passwordError,
      confirmPasswordError,
      passwordValid,
    } = this.state;

    return (
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <form onSubmit={this.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={this.handlePasswordChange}
              onBlur={this.handlePasswordBlur}
              className="w-full p-2 border rounded"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              className="w-full p-2 border rounded"
            />
            {passwordValid && (
              <p className="text-green-500 text-sm">Password is valid</p>
            )}
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{confirmPasswordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PasswordForm;