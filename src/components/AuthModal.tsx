import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, LogIn, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { signInWithGoogle, signInAdminWithEmail, registerAdminWithEmail } from '../firebase';
import { User } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const user = await signInWithGoogle();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Google login error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Bạn đã đóng cửa sổ đăng nhập Google.');
      } else if (err.code === 'auth/operation-not-allowed' || err.message?.includes('operation-not-allowed')) {
        setErrorMsg('Phương thức Google Sign-In chưa được bật trong Firebase Console (Authentication > Sign-in method). Vui lòng thử đăng nhập bằng Email hoặc bật nhà cung cấp Google.');
      } else {
        setErrorMsg(err.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      let user: User;
      if (isRegisterMode) {
        user = await registerAdminWithEmail(email.trim(), password);
      } else {
        user = await signInAdminWithEmail(email.trim(), password);
      }
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Email auth error:', err);
      const code = err.code;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setErrorMsg('Email hoặc mật khẩu không chính xác.');
      } else if (code === 'auth/email-already-in-use') {
        setErrorMsg('Email này đã được đăng ký. Vui lòng chuyển sang chế độ Đăng nhập.');
      } else if (code === 'auth/weak-password') {
        setErrorMsg('Mật khẩu quá ngắn, vui lòng nhập ít nhất 6 ký tự.');
      } else if (code === 'auth/operation-not-allowed') {
        setErrorMsg('Phương thức Email/Password chưa được kích hoạt trong Firebase Console. Hãy truy cập Authentication > Sign-in method để bật.');
      } else {
        setErrorMsg(err.message || 'Xác thực thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-3 text-amber-300 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold font-serif-title">
            {isRegisterMode ? 'Đăng Ký Quản Trị Viên' : 'Đăng Nhập Quản Trị Viên'}
          </h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xs mx-auto">
            Cổng thông tin Trường PTDTBT THCS Thu Cúc
          </p>
        </div>

        {/* Notice */}
        <div className="p-6 space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Chỉ tài khoản Quản trị viên (Admin / Ban Biên Tập) mới có quyền đăng bài mới, chỉnh sửa và gỡ bỏ tin bài trên website.
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-3 shadow-xs hover:shadow transition-all disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Đăng nhập nhanh với Google</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-[11px] uppercase tracking-wider">
              Hoặc dùng Email
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Quick-fill sample credentials for immediate testing */}
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-[11px]">
            <div className="text-slate-600">
              <span className="font-semibold text-slate-800">Tài khoản Admin sẵn có:</span>
              <div className="font-mono text-slate-500 text-[10px]">admin_test@thucuc.edu.vn</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('admin_test@thucuc.edu.vn');
                setPassword('Thucuc@2026!');
                setIsRegisterMode(false);
              }}
              className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded text-[11px] transition-colors"
            >
              Điền nhanh
            </button>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@thucuc.phutho.edu.vn"
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'Đang xử lý...' : isRegisterMode ? 'Tạo tài khoản quản trị' : 'Đăng nhập hệ thống'}</span>
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg('');
              }}
              className="text-xs text-blue-700 hover:underline font-medium"
            >
              {isRegisterMode
                ? 'Đã có tài khoản? Nhấn để Đăng nhập'
                : 'Chưa có tài khoản quản trị? Tạo tài khoản mới'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 p-3 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Kết nối Firebase: <span className="font-mono text-slate-700">gen-lang-client-0028772304</span>
        </div>
      </div>
    </div>
  );
};
