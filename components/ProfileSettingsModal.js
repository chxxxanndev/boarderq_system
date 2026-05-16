'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Lock, User, Mail, Loader2, CheckCircle2, AlertTriangle, Camera } from 'lucide-react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 80 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function ProfileSettingsModal({ isOpen, onClose, user, onUpdate }) {
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '', currentPassword: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [rawImage, setRawImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [croppedPreview, setCroppedPreview] = useState(user?.avatar_url || null);
  const [showCropper, setShowCropper] = useState(false);

  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
      setCroppedPreview(user.avatar_url || null);
    }
  }, [user]);

  const onImageLoad = (e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setRawImage(url);
    setCrop(undefined);
    setCompletedCrop(null);
    setShowCropper(true);
    // reset input so same file can be picked again
    e.target.value = '';
  };

  const handleCropDone = useCallback(async () => {
    const image = imgRef.current;
    if (!image || !completedCrop) return;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0, 0, 200, 200
    );

    canvas.toBlob((blob) => {
      setCroppedBlob(blob);
      setCroppedPreview(URL.createObjectURL(blob));
      setShowCropper(false);
    }, 'image/jpeg', 0.9);
  }, [completedCrop]);

  const handleAvatarUpload = async () => {
    if (!croppedBlob) return;
    setAvatarLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', croppedBlob, 'avatar.jpg');
      const res = await fetch('/api/users/avatar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        onUpdate({ ...user, avatar_url: data.avatar_url });
        setMessage({ type: 'success', text: 'Avatar Updated!' });
        setCroppedBlob(null);
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Identity Updated' });
        onUpdate({ ...data.user, avatar_url: user?.avatar_url });
        setTimeout(onClose, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Update Failed' });
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-3.5 pl-12 pr-5 focus:outline-none focus:border-[#1E5EFF] text-sm font-bold text-[#0B1F3B] placeholder:text-[#9CA3AF] transition-all shadow-sm";
  const labelClasses = "block text-[10px] font-black uppercase tracking-[0.2em] text-[#6B7280] mb-2 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md" onClick={onClose} />

          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E7EB] bg-[#F8FAFC]">
              <div>
                <h3 className="font-black text-2xl tracking-tight uppercase text-[#0B1F3B]">USER <span className="text-[#1E5EFF]">PROFILE</span></h3>
                <p className="text-[#6B7280] text-[9px] font-black tracking-[0.2em] uppercase mt-1">Authentication Registry</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-[#0B1F3B]"><X size={22} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">

              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] flex items-center justify-center shadow-lg">
                    {croppedPreview
                      ? <img src={croppedPreview} alt="Avatar" className="w-full h-full object-cover" />
                      : <span className="text-white font-black text-3xl">{user?.name?.charAt(0).toUpperCase()}</span>
                    }
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">Click to change photo</p>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    
                {croppedBlob && (
                  
                  <button type="button" onClick={handleAvatarUpload} disabled={avatarLoading}
                    className="flex items-center gap-2 bg-[#1E5EFF] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50">
                    {avatarLoading ? <Loader2 size={13} className="animate-spin" /> : <Camera size={13} />}
                    {avatarLoading ? 'Uploading...' : 'Save Photo'}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {message.text && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{message.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                <label className={labelClasses}>Full Identity Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                  <input type="text" required className={inputClasses} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClasses}>Primary Contact Email</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                  <input type="email" required className={inputClasses} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-4">
                  <Lock size={14} className="text-[#1E5EFF]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3B]">Security Credentials</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClasses}>Current PIN</label>
                    <input type="password" placeholder="••••••••" className={inputClasses.replace('pl-12', 'pl-5')} onChange={e => setFormData({...formData, currentPassword: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}>New Access Code</label>
                    <input type="password" placeholder="••••••••" className={inputClasses.replace('pl-12', 'pl-5')} onChange={e => setFormData({...formData, newPassword: e.target.value})} />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full h-16 bg-[#1E5EFF] hover:bg-[#0B1F3B] text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {loading ? 'SYNCHRONIZING...' : 'COMMIT CHANGES'}
              </button>
            </form>
          </motion.div>

          {/* Cropper Modal */}
          <AnimatePresence>
            {showCropper && rawImage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-[#0B1F3B]/95 flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                  className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
                  <div className="px-8 py-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F8FAFC]">
                    <h3 className="font-black text-lg uppercase tracking-tight text-[#0B1F3B]">Crop <span className="text-[#1E5EFF]">Photo</span></h3>
                    <button type="button" onClick={() => setShowCropper(false)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
                  </div>
                  <div className="p-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-4 text-center">Drag to adjust the crop area</p>
                    <div className="flex justify-center max-h-[400px] overflow-auto rounded-2xl">
                      <ReactCrop
                        crop={crop}
                        onChange={(_, pct) => setCrop(pct)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={1}
                        circularCrop={false}
                        minWidth={50}
                      >
                        <img
                          ref={imgRef}
                          src={rawImage}
                          alt="Crop preview"
                          onLoad={onImageLoad}
                          style={{ maxHeight: '400px', maxWidth: '100%' }}
                        />
                      </ReactCrop>
                    </div>
                    <div className="flex gap-3 mt-5">
                      <button type="button" onClick={() => setShowCropper(false)}
                        className="flex-1 py-3 bg-[#F8FAFC] text-[#6B7280] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E5E7EB]">
                        Cancel
                      </button>
                      <button type="button" onClick={handleCropDone} disabled={!completedCrop}
                        className="flex-1 py-3 bg-[#1E5EFF] text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-40">
                        Use This Crop
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}