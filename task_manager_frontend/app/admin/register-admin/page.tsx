'use client'
import { UserRequestDto } from "@/dto/user";
import DynamicIcon from "@/utill/DynamicIcon";
import Swal from "sweetalert2";
import { UserRegistrationForm } from "@/app/userRegistrationForm";
import { useEffect } from "react";
import { registerNewAdmin } from "@/services/adminRegistration";

interface AdminRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminRegistrationModal({ isOpen, onClose }: AdminRegistrationModalProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  async function handleUserRegister(data: UserRequestDto, reset: () => void) {
    Swal.fire({
      title: 'Registering...',
      text: 'Please wait while we process your registration',
      allowOutsideClick: false,
      background: '#fff',
      color: '#000000',
      didOpen: () => { Swal.showLoading(); }
    });
    try {
      await registerNewAdmin(data);
      reset();
      Swal.close();
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        background: '#fff',
        color: '#000000',
        confirmButtonColor: '#dc2626',
        confirmButtonText: 'Go to Login',
        timer: 2500,
        timerProgressBar: true,
        customClass: { popup: 'border border-gray-700' }
      });
      onClose();
    } catch (err: unknown) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err instanceof Error ? err.message : 'An unexpected error occurred.',
        background: '#fff',
        color: '#000000',
        confirmButtonColor: '#dc2626',
        customClass: { popup: 'border border-gray-700' }
      });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="inset-0 bg-black/50 backdrop-blur-sm fixed"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-md lg:max-w-xl bg-white rounded-2xl shadow-2xl px-6 py-8 sm:px-10 my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <DynamicIcon name="FiX" className="text-xl" />
        </button>

        {/* Header */}
        <header className="grid justify-items-center mb-6">
          <DynamicIcon name="FiUserPlus" className="text-5xl lg:text-7xl text-blue-600 mb-2" />
          <h1 className="text-center text-2xl lg:text-3xl font-semibold">Create Account</h1>
          <p className="text-center text-gray-500 text-sm mt-1">Sign up for a new account</p>
        </header>

        <UserRegistrationForm onSubmit={handleUserRegister} />
      </div>
    </div>
  );
}