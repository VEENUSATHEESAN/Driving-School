import React, { useState } from 'react';

const initialSettings = {
  notifications: true,
  paymentGateway: 'PayPal',
};

const SystemSettings = ({ theme }) => {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggleNotifications = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  const handleChangePaymentGateway = (e) => {
    setSettings({ ...settings, paymentGateway: e.target.value });
  };

  return (
    <div className={`system-settings-container ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-bold mb-4">System Settings</h2>
      <div className="settings-item mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={handleToggleNotifications}
            className="mr-2"
          />
          Enable Notifications
        </label>
      </div>
      <div className="settings-item">
        <label className="block mb-2">Payment Gateway</label>
        <select
          value={settings.paymentGateway}
          onChange={handleChangePaymentGateway}
          className={`border px-3 py-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          <option value="PayPal">PayPal</option>
          <option value="Stripe">Stripe</option>
          <option value="Square">Square</option>
        </select>
      </div>
    </div>
  );
};

export default SystemSettings;
