import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ArrowLeft, MapPin, Phone, User, Clock, CreditCard,
    Banknote, ChevronRight, CheckCircle2, ShoppingBag, Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductImageUrl } from '../utils/image';
import { MENU_ITEMS } from '../data/menu';
import { computeCartPricing, FREE_DELIVERY_THRESHOLD, FREE_DESSERT_THRESHOLD } from '../utils/pricing';

interface CheckoutPageProps {
    onBack: () => void;
}

const INPUT_CLASS =
    'w-full bg-brand-light border-2 border-transparent focus:border-brand-orange rounded-2xl px-4 py-3 font-medium text-brand-dark placeholder:text-brand-dark/30 transition-all outline-none';

export const CheckoutPage = ({ onBack }: CheckoutPageProps) => {
    const { items, clearCart, updateQuantity } = useCart();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        instructions: '',
        paymentMethod: 'cash' as 'cash' | 'card',
        deliveryTime: 'asap' as 'asap' | 'scheduled',
        scheduledTime: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [placed, setPlaced] = useState(false);
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [placedTotal, setPlacedTotal] = useState(0);
    const pricing = computeCartPricing(items);
    const cartIds = new Set(items.map(item => item.id));
    const checkoutAddOns = MENU_ITEMS
        .filter(item =>
            !cartIds.has(item.id) &&
            (item.category === 'Dips' || item.category === 'Sides' || item.category === 'Desserts')
        )
        .slice(0, 3);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('checkout_info');
            if (saved) {
                const parsed = JSON.parse(saved);
                setForm(f => ({ ...f, ...parsed }));
            }
        } catch { /* ignore */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const set = (field: string, value: string) => {
        setForm(f => ({ ...f, [field]: value }));
        setErrors(e => { const { [field]: _, ...rest } = e; return rest; });
        try {
            const next = { ...form, [field]: value };
            localStorage.setItem('checkout_info', JSON.stringify({
                name: next.name,
                phone: next.phone,
                address: next.address,
                city: next.city,
                instructions: next.instructions
            }));
        } catch { /* ignore */ }
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.phone.trim()) errs.phone = 'Phone number is required';
        else if (!/^[\d\s\+\-]{10,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
        if (!form.address.trim()) errs.address = 'Delivery address is required';
        if (!form.city.trim()) errs.city = 'City is required';
        if (form.deliveryTime === 'scheduled' && !form.scheduledTime) errs.scheduledTime = 'Please pick a time';
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1400));
        setLoading(false);
        setPlacedTotal(pricing.total);
        setCouponCode(`SLICE${Math.floor(1000 + Math.random() * 9000)}`);
        setPlaced(true);
        clearCart();
    };

    /* ── Success screen ─────────────────────────────────────────── */
    if (placed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen bg-brand-light flex items-center justify-center px-6"
            >
                <div className="max-w-md w-full text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                        className="w-28 h-28 bg-brand-orange rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-brand-orange/40"
                    >
                        <CheckCircle2 size={56} className="text-white" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <h1 className="text-4xl font-display mb-2">ORDER PLACED!</h1>
                        <p className="text-brand-dark/60 font-medium">
                            We've received your order and our kitchen is already fired up. Estimated delivery: <span className="text-brand-orange font-bold">30–45 min</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-white rounded-3xl p-6 shadow-sm space-y-3 text-left"
                    >
                        <div className="flex justify-between text-sm">
                            <span className="text-brand-dark/50 font-bold uppercase tracking-widest">Total Paid</span>
                            <span className="font-display text-2xl">Rs. {placedTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-brand-dark/50 font-medium">Payment</span>
                            <span className="font-bold capitalize">{form.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card on Delivery'}</span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-4 text-left"
                    >
                        <p className="text-xs text-brand-dark/60 mb-1">Next Order Reward</p>
                        <p className="font-bold">Use code <span className="text-brand-orange">{couponCode}</span> for 10% off above Rs. 3,500</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={onBack}
                        className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-orange transition-all active:scale-95"
                    >
                        Back to Menu
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    /* ── Main checkout ──────────────────────────────────────────── */
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="min-h-screen bg-brand-light"
        >
            {/* Top bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-brand-dark/5 px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors"
                    >
                        <ArrowLeft size={22} />
                    </button>
                    <h1 className="text-2xl font-display">CHECKOUT</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_380px] gap-8 items-start">

                    {/* ── Left: Form ──────────────────────────────────────── */}
                    <div className="space-y-6">

                        {/* Delivery details */}
                        <Section title="Delivery Details" icon={<MapPin size={18} />}>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="field-label">Full Name</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30" />
                                        <input
                                            type="text"
                                            placeholder="Ahmed Khan"
                                            value={form.name}
                                            onChange={e => set('name', e.target.value)}
                                            className={`${INPUT_CLASS} pl-10 ${errors.name ? 'border-red-400' : ''}`}
                                        />
                                    </div>
                                    {errors.name && <FieldError msg={errors.name} />}
                                </div>
                                <div>
                                    <label className="field-label">Phone Number</label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30" />
                                        <input
                                            type="tel"
                                            placeholder="0300 1234567"
                                            value={form.phone}
                                            onChange={e => set('phone', e.target.value)}
                                            className={`${INPUT_CLASS} pl-10 ${errors.phone ? 'border-red-400' : ''}`}
                                        />
                                    </div>
                                    {errors.phone && <FieldError msg={errors.phone} />}
                                </div>
                            </div>

                            <div>
                                <label className="field-label">Delivery Address</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-4 top-4 text-brand-dark/30" />
                                    <textarea
                                        placeholder="House no., street, area..."
                                        rows={2}
                                        value={form.address}
                                        onChange={e => set('address', e.target.value)}
                                        className={`${INPUT_CLASS} pl-10 resize-none ${errors.address ? 'border-red-400' : ''}`}
                                    />
                                </div>
                                {errors.address && <FieldError msg={errors.address} />}
                            </div>

                            <div>
                                <label className="field-label">City</label>
                                <input
                                    type="text"
                                    placeholder="Lahore"
                                    value={form.city}
                                    onChange={e => set('city', e.target.value)}
                                    className={`${INPUT_CLASS} ${errors.city ? 'border-red-400' : ''}`}
                                />
                                {errors.city && <FieldError msg={errors.city} />}
                            </div>

                            <div>
                                <label className="field-label">Special Instructions <span className="text-brand-dark/30 normal-case font-normal">(optional)</span></label>
                                <textarea
                                    placeholder="Extra sauce, no onions, ring the bell..."
                                    rows={2}
                                    value={form.instructions}
                                    onChange={e => set('instructions', e.target.value)}
                                    className={`${INPUT_CLASS} resize-none`}
                                />
                            </div>
                        </Section>

                        {/* Delivery time */}
                        <Section title="Delivery Time" icon={<Clock size={18} />}>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'asap', label: 'ASAP', sub: '30–45 min' },
                                    { id: 'scheduled', label: 'Schedule', sub: 'Pick a time' },
                                ].map(opt => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => set('deliveryTime', opt.id)}
                                        className={`rounded-2xl border-2 p-4 text-left transition-all ${form.deliveryTime === opt.id
                                                ? 'border-brand-orange bg-brand-orange/5'
                                                : 'border-transparent bg-brand-light hover:bg-brand-dark/5'
                                            }`}
                                    >
                                        <div className="font-display text-lg">{opt.label}</div>
                                        <div className="text-xs text-brand-dark/50 font-medium">{opt.sub}</div>
                                    </button>
                                ))}
                            </div>
                            <AnimatePresence>
                                {form.deliveryTime === 'scheduled' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-3">
                                            <label className="field-label">Pick a time</label>
                                            <input
                                                type="time"
                                                value={form.scheduledTime}
                                                onChange={e => set('scheduledTime', e.target.value)}
                                                className={`${INPUT_CLASS} ${errors.scheduledTime ? 'border-red-400' : ''}`}
                                            />
                                            {errors.scheduledTime && <FieldError msg={errors.scheduledTime} />}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Section>

                        {/* Payment */}
                        <Section title="Payment Method" icon={<CreditCard size={18} />}>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'cash', label: 'Cash on Delivery', Icon: Banknote },
                                    { id: 'card', label: 'Card on Delivery', Icon: CreditCard },
                                ].map(({ id, label, Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => set('paymentMethod', id)}
                                        className={`rounded-2xl border-2 p-4 text-left transition-all flex items-center gap-3 ${form.paymentMethod === id
                                                ? 'border-brand-orange bg-brand-orange/5'
                                                : 'border-transparent bg-brand-light hover:bg-brand-dark/5'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-xl ${form.paymentMethod === id ? 'bg-brand-orange text-white' : 'bg-white text-brand-dark/40'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <div className="font-bold text-sm leading-tight">{label}</div>
                                    </button>
                                ))}
                            </div>
                        </Section>
                    </div>

                    {/* ── Right: Order summary ─────────────────────────────── */}
                    <div className="lg:sticky lg:top-24 space-y-4">
                        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-brand-dark/5">
                                <div className="flex items-center gap-2 mb-1">
                                    <ShoppingBag size={18} className="text-brand-orange" />
                                    <h2 className="font-display text-lg">ORDER SUMMARY</h2>
                                </div>
                                <p className="text-xs text-brand-dark/40 font-bold uppercase tracking-widest">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
                            </div>

                            <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <img
                                            src={getProductImageUrl(item.image)}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-brand-dark/40">× {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-sm whitespace-nowrap">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 border-t border-brand-dark/5 space-y-3">
                                <div className="flex justify-between text-sm text-brand-dark/60">
                                    <span>Subtotal</span>
                                    <span>Rs. {pricing.subtotal.toLocaleString()}</span>
                                </div>
                                {pricing.discounts.map((discount) => (
                                    <div key={discount.id} className="flex justify-between text-sm text-green-700">
                                        <span>{discount.label}</span>
                                        <span>- Rs. {discount.amount.toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between text-sm text-brand-dark/60">
                                    <span>Delivery Fee</span>
                                    <span>{pricing.deliveryFee === 0 ? 'FREE' : `Rs. ${pricing.deliveryFee.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between font-display text-xl pt-2 border-t border-brand-dark/5">
                                    <span>Total</span>
                                    <span>Rs. {pricing.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
                            <div className="text-xs font-bold uppercase tracking-widest text-brand-dark/50">Unlock More Value</div>
                            <div className="w-full h-2 rounded-full bg-brand-light overflow-hidden">
                                <div
                                    className="h-full bg-brand-orange transition-all"
                                    style={{ width: `${Math.min((pricing.subtotal / FREE_DESSERT_THRESHOLD) * 100, 100)}%` }}
                                />
                            </div>
                            {!pricing.freeDeliveryUnlocked && (
                                <p className="text-xs text-brand-dark/60">Add Rs. {pricing.missingForFreeDelivery.toLocaleString()} for free delivery (Rs. {FREE_DELIVERY_THRESHOLD.toLocaleString()}).</p>
                            )}
                            {!pricing.freeDessertUnlocked && (
                                <p className="text-xs text-brand-dark/60">Add Rs. {pricing.missingForFreeDessert.toLocaleString()} for free dessert.</p>
                            )}
                            {pricing.freeDessertUnlocked && !pricing.freeDessertApplied && (
                                <p className="text-xs text-brand-dark/70">You unlocked free dessert. Add one below to claim it.</p>
                            )}
                        </div>

                        {checkoutAddOns.length > 0 && (
                            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
                                <div className="text-xs font-bold uppercase tracking-widest text-brand-dark/50">Last-minute Add-ons</div>
                                {checkoutAddOns.map(addon => (
                                    <div key={addon.id} className="flex items-center gap-3">
                                        <img
                                            src={getProductImageUrl(addon.image)}
                                            alt={addon.name}
                                            className="w-12 h-12 rounded-xl object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate">{addon.name}</p>
                                            <p className="text-xs text-brand-dark/50">Rs. {addon.price.toLocaleString()}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(addon.id, 1, addon)}
                                            className="bg-brand-light hover:bg-brand-dark hover:text-white transition-colors rounded-xl px-3 py-2 text-xs font-bold flex items-center gap-1"
                                        >
                                            <Plus size={14} />
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            disabled={loading || items.length === 0}
                            className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-orange/30 transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Placing Order...
                                </span>
                            ) : (
                                <>Place Order <ChevronRight size={20} /></>
                            )}
                        </motion.button>

                        <p className="text-center text-xs text-brand-dark/40 font-medium">
                            By placing your order you agree to our terms &amp; conditions
                        </p>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

/* ── Helpers ─────────────────────────────────────────────────── */
const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-brand-dark/5">
            <span className="text-brand-orange">{icon}</span>
            <h2 className="font-display text-lg">{title}</h2>
        </div>
        {children}
    </div>
);

const FieldError = ({ msg }: { msg: string }) => (
    <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs font-bold mt-1"
    >
        {msg}
    </motion.p>
);
