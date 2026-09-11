import React, { useState } from 'react';

const PROFILE_COLORS = [
  '#4169E1', // Royal Blue
  '#C11119', // Netflix Red
  '#0F6674', // Teal
  '#43A047', // Green
  '#F57C00', // Orange
  '#7B1FA2', // Purple
  '#00838F', // Cyan
  '#E65100', // Deep Orange
];

const SmileyPreview = ({ color }) => (
  <div
    className="w-24 h-24 rounded-lg mx-auto mb-6 relative overflow-hidden flex items-center justify-center"
    style={{ background: color }}
  >
    {/* Eyes */}
    <div className="absolute top-[35%] left-[27%] w-[11%] h-[11%] bg-white rounded-full" />
    <div className="absolute top-[35%] right-[27%] w-[11%] h-[11%] bg-white rounded-full" />
    {/* Smile */}
    <div
      className="absolute bottom-[28%] w-[46%] h-[22%]"
      style={{
        borderBottom: '3px solid white',
        borderLeft: '3px solid transparent',
        borderRight: '3px solid transparent',
        borderRadius: '0 0 100px 100px',
      }}
    />
  </div>
);

const AddProfileModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PROFILE_COLORS[0]);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a profile name.');
      return;
    }
    if (name.trim().length > 20) {
      setError('Name must be 20 characters or less.');
      return;
    }
    onSave({ name: name.trim(), color: selectedColor });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-[#333] rounded-md w-full max-w-md p-8 shadow-2xl">
        <h2 className="text-white text-xl font-medium mb-6 pb-4 border-b border-[#333]">
          Add Profile
        </h2>

        {/* Avatar Preview */}
        <SmileyPreview color={selectedColor} />

        {/* Name Input */}
        <div className="mb-5">
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Name"
            maxLength={20}
            className="w-full bg-[#454545] text-white placeholder-[#999] px-4 py-3 rounded text-base outline-none focus:bg-[#555] transition-colors"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Color Picker */}
        <div className="mb-6">
          <p className="text-[#999] text-sm mb-3">Choose avatar color:</p>
          <div className="flex flex-wrap gap-2">
            {PROFILE_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className="w-9 h-9 rounded-md transition-all duration-150 flex items-center justify-center"
                style={{ background: color, outline: selectedColor === color ? '2.5px solid white' : 'none', outlineOffset: '2px' }}
              >
                {selectedColor === color && (
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-white text-black font-medium py-2.5 rounded hover:bg-gray-200 transition-colors tracking-wide"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#333] text-white font-medium py-2.5 rounded hover:bg-[#444] transition-colors tracking-wide"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProfileModal;
