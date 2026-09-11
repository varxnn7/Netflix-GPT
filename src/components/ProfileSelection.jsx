import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGO } from '../utils/constants';
import { addProfile, removeProfile, setActiveProfile } from '../utils/profilesSlice';
import AddProfileModal from './AddProfileModal';

// Smiley face SVG (Netflix-style)
const SmileyFace = ({ color }) => (
  <div
    className="w-full h-full flex items-center justify-center rounded-lg relative overflow-hidden"
    style={{ background: color }}
  >
    {/* Eyes */}
    <div className="absolute top-[35%] left-[27%] w-[11%] h-[11%] bg-white rounded-full" />
    <div className="absolute top-[35%] right-[27%] w-[11%] h-[11%] bg-white rounded-full" />
    {/* Smile */}
    <div
      className="absolute bottom-[28%] w-[46%] h-[22%]"
      style={{
        borderBottom: '4px solid white',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderRadius: '0 0 100px 100px',
      }}
    />
  </div>
);

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

const KIDS_GRADIENT = 'linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%)';

const ProfileCard = ({ profile, onClick, onDelete, isManaging }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
      <div className="relative w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] rounded-lg overflow-hidden border-[3px] border-transparent group-hover:border-white transition-all duration-200 shadow-lg">
        {profile.isKids ? (
          <div
            className="w-full h-full flex items-center justify-center text-3xl font-black tracking-tight"
            style={{ background: KIDS_GRADIENT }}
          >
            <span className="text-white" style={{ fontFamily: 'Arial Black, sans-serif', fontSize: '2.5rem' }}>
              kids
            </span>
          </div>
        ) : (
          <SmileyFace color={profile.color} />
        )}

        {/* Delete button in manage mode */}
        {isManaging && !profile.isKids && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(profile.id); }}
            className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors z-10"
          >
            ✕
          </button>
        )}
      </div>

      <span className="text-[#808080] group-hover:text-white mt-3 text-sm sm:text-base transition-colors text-center max-w-[155px] truncate">
        {profile.name}
      </span>

      {profile.isLocked && (
        <div className="mt-1 text-[#808080] group-hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

const AddProfileCard = ({ onClick }) => (
  <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
    <div className="w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] rounded-lg bg-[#232323] border-[3px] border-transparent group-hover:border-white transition-all duration-200 flex items-center justify-center shadow-lg">
      <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14 text-[#808080] group-hover:text-white transition-colors">
        <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <span className="text-[#808080] group-hover:text-white mt-3 text-sm sm:text-base transition-colors">
      Add Profile
    </span>
  </div>
);

const ProfileSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profiles = useSelector((store) => store.profiles.profiles);
  const [isManaging, setIsManaging] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const kidsProfile = { id: 'kids', name: 'Children', isKids: true };
  const allProfiles = [...profiles, kidsProfile];

  const handleSelectProfile = (profile) => {
    if (isManaging) return;
    dispatch(setActiveProfile(profile));
    navigate('/browse');
  };

  const handleDeleteProfile = (profileId) => {
    dispatch(removeProfile(profileId));
  };

  const handleDoneManaging = () => setIsManaging(false);

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">
      {/* Header with Netflix Logo */}
      <header className="px-8 py-5 flex items-center">
        <img
          src={LOGO}
          alt="Netflix"
          className="w-28 sm:w-36 cursor-pointer"
          onClick={() => navigate('/browse')}
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <h1 className="text-white text-3xl sm:text-5xl font-medium mb-10 sm:mb-12">
          {isManaging ? 'Manage Profiles:' : "Who's watching?"}
        </h1>

        {/* Profile Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 sm:mb-12 max-w-4xl">
          {allProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onClick={() => handleSelectProfile(profile)}
              onDelete={handleDeleteProfile}
              isManaging={isManaging}
            />
          ))}

          {/* Add Profile button (only shown when not at max) */}
          {profiles.length < 4 && !isManaging && (
            <AddProfileCard onClick={() => setShowAddModal(true)} />
          )}
        </div>

        {/* Manage / Done Button */}
        {!isManaging ? (
          <button
            onClick={() => setIsManaging(true)}
            className="mt-2 px-8 py-2 border border-[#808080] text-[#808080] hover:border-white hover:text-white text-sm sm:text-base tracking-widest uppercase font-medium transition-all duration-200"
          >
            Manage Profiles
          </button>
        ) : (
          <button
            onClick={handleDoneManaging}
            className="mt-2 px-10 py-2 bg-white text-black text-sm sm:text-base tracking-widest uppercase font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Done
          </button>
        )}
      </main>

      {/* Add Profile Modal */}
      {showAddModal && (
        <AddProfileModal
          onClose={() => setShowAddModal(false)}
          onSave={(profileData) => {
            dispatch(addProfile({
              id: Date.now().toString(),
              ...profileData,
            }));
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfileSelection;
