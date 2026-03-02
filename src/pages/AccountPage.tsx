import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, User, ShoppingBag, LogOut, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

type SavedCheckoutInfo = {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
};

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { customerUser, customerLoading, logoutCustomer, totalItems, totalPrice } = useCart();
  const [checkoutInfo, setCheckoutInfo] = useState<SavedCheckoutInfo | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('checkout_info');
      if (!raw) return;
      const parsed = JSON.parse(raw) as SavedCheckoutInfo;
      setCheckoutInfo(parsed);
    } catch {
      // ignore local parse errors
    }
  }, []);

  if (!customerLoading && !customerUser) {
    return (
      <div className="min-h-screen bg-brand-light px-6 py-24">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm text-center">
          <h1 className="text-3xl font-display mb-3">ACCOUNT</h1>
          <p className="text-brand-dark/60 mb-6">Please login or register from the cart to open your account page.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-brand-dark text-white px-6 py-3 rounded-2xl font-bold hover:bg-brand-orange transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-brand-dark/5 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-4xl font-display">MY ACCOUNT</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="font-display text-xl">Profile</h2>
            <div className="flex items-center gap-3 text-brand-dark/70">
              <User size={18} className="text-brand-orange" />
              <span>{checkoutInfo?.name || 'Customer'}</span>
            </div>
            <div className="flex items-center gap-3 text-brand-dark/70">
              <Mail size={18} className="text-brand-orange" />
              <span>{customerUser?.email || '...'}</span>
            </div>
            <div className="pt-2">
              <button
                onClick={async () => {
                  await logoutCustomer();
                  navigate('/');
                }}
                className="bg-brand-dark text-white px-4 py-2 rounded-xl font-medium hover:bg-brand-orange transition-colors inline-flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="font-display text-xl">Cart Snapshot</h2>
            <div className="flex items-center gap-3 text-brand-dark/70">
              <ShoppingBag size={18} className="text-brand-orange" />
              <span>{totalItems} {totalItems === 1 ? 'item' : 'items'} in cart</span>
            </div>
            <div className="text-3xl font-display text-brand-orange">Rs. {totalPrice.toLocaleString()}</div>
            <button
              onClick={() => navigate('/')}
              className="bg-brand-light px-4 py-2 rounded-xl font-medium hover:bg-brand-dark hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
          <h2 className="font-display text-xl">Saved Delivery Info</h2>
          {checkoutInfo ? (
            <>
              <div className="flex items-center gap-3 text-brand-dark/70">
                <MapPin size={18} className="text-brand-orange" />
                <span>{checkoutInfo.address || '-'}{checkoutInfo.city ? `, ${checkoutInfo.city}` : ''}</span>
              </div>
              <div className="flex items-center gap-3 text-brand-dark/70">
                <Phone size={18} className="text-brand-orange" />
                <span>{checkoutInfo.phone || '-'}</span>
              </div>
            </>
          ) : (
            <p className="text-brand-dark/60">No saved checkout info yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
